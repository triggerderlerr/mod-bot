const { EmbedBuilder } = require("discord.js");
const backup = require("@outwalk/discord-backup");

module.exports = {
    name: "backup-info",
    description: 'Backup bilgisini verir.',
    type: 1,
    options: [
        {
            name: "id",
            description: "Backup ID'si veya adı!",
            type: 3,
            required: true
        },
    ],
    
    run: async (client, interaction) => {
        if (interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({ content: "Bu komutu kullanabilmek için sunucu sahibi olmalısın.", ephemeral: true });
        }

        const backupId = interaction.options.getString("id");
        
        try {
            const backupInfo = await backup.fetch(backupId);

            if (!backupInfo) {
                return interaction.reply({ content: ':x: Lütfen geçerli bir yedek ID\'si belirtin!' });
            }

            const date = new Date(backupInfo.data.createdTimestamp);
            const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`${interaction.guild.name} Sunucu Bilgileri`)
                .setAuthor({ name: `️ Backup Bilgileri`, iconURL: backupInfo.data.iconURL || client.user.displayAvatarURL({ dynamic: true }) })
                .addFields(
                    { name: 'Sunucu Adı', value: backupInfo.data.name },
                    { name: 'Boyut', value: `${backupInfo.size}` },
                    { name: 'Oluşturma Tarihi', value: `${formattedDate}` }
                )
                .setFooter({ text: 'Backup ID: ' + backupId });

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply(`${backupId} ID'li yedek bulunamadı.`);
        }
    }
};

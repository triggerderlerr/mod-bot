const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "herkese-rol-ver",
    description: "Herkese belirlediğiniz bir rolü verir.",
    type: 1,
    options: [
        {
            name: "rol",
            description: "Lütfen bir rol etiketle!",
            type: 8, // 8 corresponds to the ROLE type
            required: true,
        },
    ],

    run: async (client, interaction) => {
        // Kullanıcının gerekli yetkiye sahip olup olmadığını kontrol et
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: "Bunun için gerekli yetkin yok!", ephemeral: true });
        }

        const rol = interaction.options.getRole('rol');

        // Roller dağıtılıyor mesajını gönder
        await interaction.reply("Roller dağıtılıyor...");

        // Her üye için rolü ekle
        const members = await interaction.guild.members.fetch(); // Tüm üyeleri al

        let successCount = 0;
        let failureCount = 0;

        for (const member of members.values()) {
            try {
                await member.roles.add(rol);
                successCount++; // Başarı sayısını artır
            } catch (error) {
                failureCount++; // Hata sayısını artır
            }
        }

        // Eğer hata sayısı varsa, konsola hata mesajı gönderme
        if (failureCount > 0) {
            console.error(`Roller dağıtılırken toplam ${failureCount} hata oluştu.`);
        }

        // Embed mesajı oluştur
        const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Rol Dağıtım İşlemi Tamamlandı")
            .setDescription(`Roller başarıyla dağıtıldı!`)
            .addFields(
                { name: "Başarıyla Atanan Rol Sayısı", value: `${successCount}`, inline: true },
                { name: "Hata Sayısı", value: `${failureCount}`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Komutu kullanan: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        // Onay mesajını gönder
        await interaction.followUp({ embeds: [embed] });
    },
};

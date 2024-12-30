const { Collection, EmbedBuilder } = require("discord.js");
const db = require("croxydb");
const client = require("../index");
const config = require('../settings/config.json');
const moment = require('moment');

module.exports = async (client, interaction) => {
    if (!client.isReady()) {
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Bot Henüz Hazır Değil')
            .setDescription('🚫 | Bot şu anda tam olarak yüklenmedi. Lütfen biraz bekleyip tekrar deneyin.')
            .setTimestamp()
            .setFooter({ text: 'Bu mesaj otomatik olarak oluşturulmuştur.', iconURL: client.user.displayAvatarURL() });

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!interaction.guild) {
        const embed = new EmbedBuilder()
            .setColor('#0099FF')
            .setTitle('Etkileşim Hatası')
            .setDescription('🚫 | Bu komut, DM\'de kullanılamaz!')
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                { name: 'Ne Yapmalısınız?', value: 'Lütfen bu komutu botun olduğu bir sunucuda deneyin.', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Bu mesaj otomatik olarak oluşturulmuştur.', iconURL: client.user.displayAvatarURL() });

        return interaction.reply({ embeds: [embed] });
    }

    if (!interaction.isCommand()) return;

    const userId = interaction.user.id;
    const currentTimestamp = Date.now();
    const cooldownData = db.get(`cooldown_${userId}`);

    if (cooldownData) {
        const cooldownRemaining = cooldownData.timestamp + 10000 - currentTimestamp;

        if (cooldownRemaining > 0) {
            return interaction.reply({
                content: `🔒 | Çok hızlı bir şekilde komut gönderiyorsunuz! Lütfen ${Math.ceil(cooldownRemaining / 1000)} saniye bekleyin.`,
                ephemeral: true
            });
        } else {
            db.delete(`cooldown_${userId}`);
        }
    }

    let userCommandData = db.get(`commandCount_${userId}`);

    if (!userCommandData) {
        db.set(`commandCount_${userId}`, { count: 1, lastCommand: currentTimestamp });
    } else {
        const { count, lastCommand } = userCommandData;

        if (currentTimestamp - lastCommand > 5000) {
            db.set(`commandCount_${userId}`, { count: 1, lastCommand: currentTimestamp });
        } else {
            if (count >= 5) {
                db.set(`cooldown_${userId}`, { timestamp: currentTimestamp });

                return interaction.reply({
                    content: '🔒 | Çok hızlı bir şekilde komut gönderiyorsunuz! Lütfen 10 saniye bekleyin.',
                    ephemeral: true
                });
            }

            db.set(`commandCount_${userId}`, { count: count + 1, lastCommand: currentTimestamp });
        }
    }

    try {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) {
            return interaction.reply({ content: `${interaction.commandName} geçerli bir komut değil.`, ephemeral: true });
        }

        console.log(`${interaction.guild.name}: Kullanıcı: ${interaction.user.username} => Komut: ${command.name}.`);
        await command.run(client, interaction, interaction.options);
    } catch (err) {
        console.error(err);
        return interaction.reply({ content: `Bir hata oluştu: ${err}`, ephemeral: true });
    }
};

const { PermissionsBitField, ChannelType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const db = require("croxydb");
const config = require('../../settings/config.json');

module.exports = {
  name: "ticket",
  description: "Yeni bir ticket oluşturur.",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    if (!(interaction.user.id === config.owner)) {
      return interaction.reply({ content: "Bunun için gerekli yetkiniz bulunmuyor!", ephemeral: true });
    }

    const ticketChannelName = `ticket-${interaction.user.username}`;

    try {
      const ticketChannel = await interaction.guild.channels.create({
        name: ticketChannelName,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });

      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Ticket Bilgileri")
        .setDescription(`Merhaba ${interaction.user}, bu ticket için buradasınız! Yardımcı olmamı istediğiniz bir şey var mı?`)
        .addFields({ name: "Kurallar", value: "Lütfen saygılı olun ve kurallara uyun." })
        .setTimestamp()
        .setFooter({ text: "Ticket Sistemi" });

      // Butonları oluştur
      const closeButton = new ButtonBuilder()
        .setCustomId("close_ticket")
        .setLabel("Ticket Kapat")
        .setStyle(ButtonStyle.Danger);

      const supportButton = new ButtonBuilder()
        .setCustomId("request_support")
        .setLabel("Destek Çağır")
        .setStyle(ButtonStyle.Primary);

      // Butonları bir satıra ekle
      const row = new ActionRowBuilder().addComponents(closeButton, supportButton);

      // Embed mesajını ve butonları ticket kanalına gönder
      await ticketChannel.send({ embeds: [embed], components: [row] });

      interaction.reply({ content: `Ticket oluşturuldu: ${ticketChannel}`, ephemeral: true });

      // Buton etkileşimlerini dinleme
      const collector = ticketChannel.createMessageComponentCollector({ time: 600000 }); // 10 dakika süre

      collector.on("collect", async (btnInteraction) => {
        if (btnInteraction.customId === "close_ticket") {
          if (btnInteraction.user.id !== interaction.user.id) {
            return btnInteraction.reply({ content: "Bu işlemi sadece ticket sahibi yapabilir.", ephemeral: true });
          }
          await ticketChannel.delete();
        }

        if (btnInteraction.customId === "request_support") {
          btnInteraction.reply({ content: "Destek ekibi çağrıldı!", ephemeral: true });
          // Burada destek ekibini etiketleyebilirsiniz.
        }
      });

      collector.on("end", () => {
        if (ticketChannel) {
          ticketChannel.send("Ticket için işlem süresi doldu.");
        }
      });
    } catch (error) {
      console.error("Kanal oluşturulurken bir hata oluştu:", error);
      interaction.reply({ content: "Kanal oluşturulurken bir hata oluştu.", ephemeral: true });
    }
  },
};

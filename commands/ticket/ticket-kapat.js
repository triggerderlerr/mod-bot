const { PermissionsBitField } = require("discord.js");
const config = require('../../settings/config.json');

module.exports = {
  name: "close",
  description: "Açık ticketi kapatır.",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    // Kullanıcının ticket kanalında olup olmadığını kontrol et
    const ticketChannel = interaction.channel;

    // Kullanıcının adı
    const username = interaction.user.username;

    // Kanalın adının "ticket-" ile başlayıp başlamadığını ve kullanıcının adını içerip içermediğini kontrol et
    if (!(ticketChannel.name.startsWith("ticket-") && ticketChannel.name.includes(username))) {
      return interaction.reply({ content: "Bu komut sadece sizin oluşturduğunuz ticket kanallarında kullanılabilir!", ephemeral: true });
    }

    // Kullanıcının gerekli izni olup olmadığını kontrol et
    if (!(interaction.user.id === config.owner || ticketChannel.permissionsFor(interaction.user).has(PermissionsBitField.Flags.ManageChannels))) {
      return interaction.reply({ content: "Bunun için gerekli yetkiniz bulunmuyor!", ephemeral: true });
    }

    // Kanalın hala mevcut olup olmadığını kontrol et
    try {
      await ticketChannel.delete("Ticket kapatıldı.");
      // Kullanıcıya bilgi ver
      interaction.reply({ content: "Ticket kapatıldı.", ephemeral: true });
    } catch (error) {
      console.error("Kanal silinirken bir hata oluştu:", error);
      interaction.reply({ content: "Kanal silinirken bir hata oluştu. Lütfen tekrar deneyin.", ephemeral: true });
    }
  },
};

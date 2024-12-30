const backup = require("@outwalk/discord-backup");
const db = require("croxydb");
module.exports = {
  name: "backup-remove",
  description: "Backup silmeye yarar.",
  type: 1,
  options: [
    {
      name: "id",
      description: "Backup id'si veya adı!",
      type: 3,
      required: true,
    },
  ],
  run: async (client, message, args) => {
    if (!(message.user.id === message.guild.ownerId))
      return message.reply({
        content: "Bu komutu kullanabilmek için sunucu sahibi olmalısın.",
        ephemeral: true,
      });

    const backupID = message.options.getString("id");

    try {
      db.unpush(`db_${message.user.id}`, backupID);
      await backup.remove(backupID);
    } catch {
      message.reply(`${backupID} ID'li yedek bulunamadı.`);
    }
    message.reply(`${backupID} ID'li yedek başarıyla silindi.`);
  },
};

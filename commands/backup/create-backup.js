const {
  EmbedBuilder,
  Client,
  GatewayIntentBits,
  PermissionsBitField,
} = require("discord.js");
const backup = require("@outwalk/discord-backup");
const db = require("croxydb");
backup.setStorageFolder("./settings/backup-json/");
module.exports = {
  name: "backup-create",
  description: "Bir sunucu yedeği oluşturursun.",
  type: 1,
  options: [
    {
      name: "isim",
      description: "Backup Adı!",
      type: 3,
      required: true,
    },
  ],

  run: async (client, message) => {
     if(!(message.user.id === message.guild.ownerId)) return message.reply({content: "Bu komutu kullanabilmek için sunucu sahibi olmalısın.", ephemeral: true})
    const getName = message.options.getString("isim");
    const checkdata = db.has(`db_${message.user.id}`, getName);

    if (checkdata === getName) return message.reply("zaten vra");

    message.reply("Yedek oluşturuluyor..");
    let backupData = await backup.create(message.guild, {
      jsonBeautify: true,
      maxMessagesPerChannel: 1,
      doNotBackup: ["emojis", "bans"],
      saveImages: "base64",
      backupMembers: false,
      backupId: `${message.user.id}_${getName}`,
      speed: 250,
    });

    db.push(`db_${message.user.id}`, getName);

    let embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(message.guild.name)
      .setDescription(
        `• Yedekleme Başarıyla Oluşturuldu! ✅ \n• Yüklemek için aşağıdaki komutu seçtiğiniz sunucuda kullanın.\n• \`/backup-load isim:${backupData.id}\``
      )
      .setFooter({
        text: `Komutu kullanan yetkili : ${message.user.tag}`,
        iconURL: `${message.user.displayAvatarURL({ dynamic: true })}`,
      });
    message.channel.send({ embeds: [embed] });
  },
};

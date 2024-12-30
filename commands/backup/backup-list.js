const { EmbedBuilder,  Client, GatewayIntentBits, PermissionsBitField  } = require("discord.js");
const backup = require("@outwalk/discord-backup");
const db = require("croxydb")
// backup.setStorageFolder("./settings/backup-json/");
module.exports = {
    name:"backup-list",
    description: 'Backup listesini görüntülersin.',
    type:1,
    options: [],
  run: async (client, message) => {
    if(!(message.user.id === message.guild.ownerId)) return message.reply({content: "Bu komutu kullanabilmek için sunucu sahibi olmalısın.", ephemeral: true})
    let erkek = db.get(`db_${message.user.id}`)
    
    if (!erkek) return message.reply("Kayıtlı yedek bulunamadı.");
    
    const administrators = message.guild.members.cache.filter((member) =>
       db.fetch(`db_${member.user.id}`)
    );
    const getit = db.fetch(`db_${message.user.id}`)

const embed = new EmbedBuilder()
    .setColor('Random')
    .setTitle('Yedek Listesi')
    .setDescription(`${message.user.id}_${getit.slice(0, 60).join(`\n${message.user.id}_`)} `)
    .setFooter({ text: 'Yedek Bilgileri', iconURL: message.user.displayAvatarURL() }) // Kullanıcı avatarı
    .setTimestamp() // Zaman damgası ekle
    .setThumbnail(message.user.displayAvatarURL()); // Kullanıcı avatarını küçük resim olarak ekle



message.reply({ embeds: [embed] });


    
}};


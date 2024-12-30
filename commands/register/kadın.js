const { PermissionsBitField, } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
const snowflake = require('../../utils/snowflake.js');
const config = require('../../settings/config.json');
module.exports = {
    name:"kadın",
    description: 'Kadın kayıt!',
    type:1,
    options: [
        {
            name:"kullanıcı",
            description:"Rol verilicek kullanıcıyı seçin!",
            type:6,
            required:true
        },
        {
            name:"isim",
            description:"Kullanıcının İsmini Gir!",
            type:3,
            required:true
        },
        {
            name:"yaş",
            description:"Kullanıcının Yaşını Gir!",
            type:3,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    const kayıtyetkili = db.get(`kayityetkili_${interaction.guild.id}`)
    
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !interaction.member.roles.cache.has(kayıtyetkili) ) return interaction.reply({content: "Bunun için yeterli yetkin yok!", ephemeral: true})
    if(!interaction) return interaction.reply({content: "Bunun için yeterli yetkin yok!", ephemeral: true})

    const getUser = interaction.options.getMember('kullanıcı')
    const getName = interaction.options.getString('isim')
    const getAge = interaction.options.getString('yaş')

   let kadın = db.fetch(`kadın_${interaction.guild.id}`)
   let whitelist = db.fetch(`kadın2_${interaction.guild.id}`)
   let kayıtsız = db.fetch(`otorol_${interaction.guild.id}`)
   let kayıtkanal = db.get(`kayitkanal_${interaction.guild.id}`)
   let kayıtgif = db.get(`kayıtgif_${interaction.guild.id}`)
  
   if (!kadın) return interaction.reply("Kadın rolü ayarlanmamış!")
   if (!whitelist) return interaction.reply("Whitelist rolü ayarlanmamış!")
   if (!kayıtsız) return interaction.reply("Kayıtsız rolü ayarlanmamış!")
   if (!kayıtkanal) return interaction.reply("Kayıt kanal ayarlanmamış!")
    
   if (getAge < 18)  return interaction.reply("18 Yaşından Küçükler Kayıt Edilemez!")
   if (getAge > 50)  return interaction.reply("50 Yaşından Büyükler Kayıt Edilemez!")
    
   if(getUser.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content :`Kendini ya da kendinden üst yetkilileri kayıt edemezsin!`})
    if (!snowflake.isValidAge(getAge)) return interaction.reply({content: "Geçersiz Yaş."})
    let setName = getName[0].toUpperCase() + getName.slice(1);
    
  setTimeout(function(){
      getUser.setNickname(`${setName} [${getAge}]`)
  },500)
  setTimeout(function(){
      interaction.guild.members.cache.get(getUser.id).roles.add([kadın, whitelist])
  },1500)
  setTimeout(function(){
      interaction.guild.members.cache.get(getUser.id).roles.remove(kayıtsız)
  },2000)
    

    const sonsuz = client.emojis.cache.find(emoji => emoji.name === config.infinity);
    
    const embed = new Discord.EmbedBuilder()
     .setColor('Random')
     .setThumbnail(`https://cdn.discordapp.com/attachments/1188118049887367168/1242067305362358302/Custom-Icon-Design-Flatastic-7-Female.512.png?ex=664c7cd2&is=664b2b52&hm=0bf5486b1664455a5b285ca35804458763bd0b92b89d255b19c3d39b45589114&`)
    // .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true})}`)
     .setDescription(`${sonsuz} ‍ ‍ ‍ **${interaction.guild.name}**  ‍  ‍ ${sonsuz}
   
     • Kayıt edilen **kullanıcı :** <@${getUser.id}>\n     
     • Kayıt işleminde **verilen isim :** ${setName} ${getAge}\n   
     • Kayıt işleminde **verilen rol :** <@&${kadın}> **-** <@&${whitelist}>\n 
     • Kayıt işleminde **alınan rol :** <@&${kayıtsız}>
     `)
     .setFooter({ text: `Komutu kullanan yetkili : ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}` })

     .setImage(`${kayıtgif}`)
  
    interaction.reply({ embeds: [ embed ]})
    
}

};
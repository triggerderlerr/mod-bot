const {
  PermissionsBitField,
} = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
const snowflake = require('../../utils/snowflake.js');
const config = require('../../settings/config.json');
module.exports = {
  name: "erkek",
  description: 'Erkek kayıt!',
  type: 1,
  options: [{
      name: "kullanıcı",
      description: "Rol verilicek kullanıcı!",
      type: 6,
      required: true
    },
    {
      name: "isim",
      description: "Kullanıcının İsmi!",
      type: 3,
      required: true
    },
    {
      name: "yaş",
      description: "Kullanıcının Yaşı!",
      type: 3,
      required: true
    },

  ],
  run: async (client, interaction) => {

    const kayıtyetkili = db.get(`kayityetkili_${interaction.guild.id}`)

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles) && !interaction.member.roles.cache.has(kayıtyetkili)) return interaction.reply({
      content: "Bunun için yeterli yetkin yok!",
      ephemeral: true
    })
    if (!interaction) return interaction.reply({
      content: "Bunun için yeterli yetkin yok!",
      ephemeral: true
    })

    let erkek = db.fetch(`erkek_${interaction.guild.id}`)
    let whitelist = db.fetch(`erkek2_${interaction.guild.id}`)
    let kayıtsız = db.fetch(`otorol_${interaction.guild.id}`)
    let kayıtkanal = db.get(`kayitkanal_${interaction.guild.id}`)
    let kayıtgif = db.get(`kayıtgif_${interaction.guild.id}`)

    if (!erkek) return interaction.reply("Erkek rolü ayarlanmamış!")
    if (!whitelist) return interaction.reply("Whitelist rolü ayarlanmamış!")
    if (!kayıtsız) return interaction.reply("Kayıtsız rolü ayarlanmamış!")
    if (!kayıtkanal) return interaction.reply("Kayıt kanal ayarlanmamış!")
    if (!kayıtgif) return interaction.reply("Kayıt gifi ayarlanmamış!")
    
    const getUser = interaction.options.getMember('kullanıcı')
    const getName = interaction.options.getString('isim')
    const getAge = interaction.options.getString('yaş')

    if (getAge < 18)  return interaction.reply("18 Yaşından Küçükler Kayıt Edilemez!")
    if (getAge > 50)  return interaction.reply("50 Yaşından Büyükler Kayıt Edilemez!")
    
    if (getUser.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `Kendini ya da kendinden üst yetkilileri kayıt edemezsin!`})

    if (!snowflake.isValidAge(getAge)) return interaction.reply({
      content: "Geçersiz Yaş."
    })

    let setName = getName[0].toUpperCase() + getName.slice(1);

    setTimeout(function () { 
      getUser.setNickname(`${setName} [${getAge}]`)
    }, 500)
    setTimeout(function () {
      interaction.guild.members.cache.get(getUser.id).roles.add([erkek, whitelist])
    }, 1500)
    setTimeout(function () {
      interaction.guild.members.cache.get(getUser.id).roles.remove(kayıtsız)
    }, 2500)

    const sonsuz = client.emojis.cache.find(emoji => emoji.name === config.infinity);

  const rightarrow =interaction.guild.emojis.cache.find(emoji => emoji.name === "account1");
    const embed = new Discord.EmbedBuilder()
      .setColor('Random')
      .setThumbnail(`https://cdn.discordapp.com/attachments/1188118049887367168/1242065418621947975/male-symbol-blue-icon.png?ex=664c7b10&is=664b2990&hm=305860cea743814cda8dd232942cece77d54d5bd4008b21fef90bce43b77a98a&`)
      // .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true})}`)
      .setDescription(`${sonsuz} ‍ ‍ ‍ **${interaction.guild.name}**  ‍  ‍ ${sonsuz}
   
   • Yeni **Kullanıcı**: <@${getUser.id}>\n     
   • Yeni **İsmi**: ${setName} ${getAge}\n
   • Verilen **Rol** <@&${erkek}> **-** <@&${whitelist}>\n
   • Alınan **Rol** <@&${kayıtsız}>
   `)
      .setFooter({
        text: `Komutu kullanan yetkili : ${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}`
      })

      .setImage(`${kayıtgif}`)

    interaction.reply({embeds: [embed]})

  }

};
const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kayıtsız-kanal",
    description: 'Kayıt Mesajlarının Gönderileceği Kanalı Belirlersin!',
    type:1,
    options: [
        {
            name:"ayarla",
            description:"Ayarlama İşlemleri",
            type:1,
            options:[{name:"kanal",description:"Kayıtsız Kanalını Ayarlar!",type:7,required:true,channel_types:[0]}]            
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
   db.set(`kayitkanal_${interaction.guild.id}`, kanal2.id)
   interaction.reply("Hoşgeldin Kanalı Başarıyla <#"+kanal2+"> Olarak Ayarlandı!")
}

};

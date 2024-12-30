const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"log-kanal",
    description: 'Log Kanal Sistemini Ayarlarsın!',
    type:1,
    options: [
        {
            name:"ayarla",
            description:"Logların atılacağı kanalı seçin",
            type:1,
            options:[{name:"kanal",description:"Logların atılacağı kanalı seçin!",type:7,required:true,channel_types:[0]}]            
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "Kanalları Yönet Yetkin Yok!", ephemeral: true})
    
    const check = db.get(`logdurum_${interaction.guild.id}`)
    if (check === 'kapalı') return interaction.reply("Log sistemini aktif etmeden bu komutu kullanamazsın! /log aç/kapat");
    const kanal2 = interaction.options.getChannel('kanal')
   db.set(`logchannels_${interaction.guild.id}`, kanal2.id)
   interaction.reply("Log Kanalı Kanalı Başarıyla <#"+kanal2+"> Olarak Ayarlandı!")
}

};

const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kayıt-gif",
    description: 'Bir hoşgeldin gif\'i ekle!',
    type:1,
    options:[
        {
            name:"url",
            description:"URL.",
            type:3,
            required:true
        },
      ],
  run: async(client, interaction, args) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    
    let URL = interaction.options.getString('url')


        if(URL.startsWith('https')){
          db.set(`kayıtgif_${interaction.guild.id}`, URL)
              interaction.reply({content: `Kayıt GIF'i başarıyla ayarlandı.`})
        }
        else { 
           interaction.reply({content: "Geçersiz URL."})
        }

    
}};
const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kayıtsız-rol-ayarla",
    description: 'Sunucuya Gelenlere Belirlediğin Rolü Otomatik Verir!',
    type:1,
    options: [
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    db.set(`otorol_${interaction.guild.id}`, rol.id)
    interaction.reply({content: "Kayıtsız Rol Başarıyla <@&"+rol+"> Olarak Ayarlandı."})
}

};

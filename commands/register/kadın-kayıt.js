const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kadın-rol-ayarla",
    description: 'Kadın rol ayarlarsın!',
    type:1,
    options: [
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
        {
            name:"rol2",
            description:"Lütfen ikinci bir rol etiketle!",
            type:8,
            required:false
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    db.set(`kadın_${interaction.guild.id}`, rol.id)
    const rol2 = interaction.options.getRole('rol2') || interaction.options.getRole('rol')
    db.set(`kadın2_${interaction.guild.id}`, rol2.id)
    interaction.reply({content: "Kadın Rolü Başarıyla <@&"+rol+"> - <@&"+rol2+"> Olarak Ayarlandı."})
}

};

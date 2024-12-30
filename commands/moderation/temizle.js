const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"sil",
    description: 'Sohbette istediğin kadar mesajı silersin!',
    type:1,
    options: [
        {
            name:"sayı",
            description:"Temizlencek Mesaj Sayısını Girin.",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content: "Mesajları Yönet Yetkin Yok!", ephemeral: true})
    const sayi = interaction.options.getString('sayı')
    if (!(sayi <= 100)) return interaction.reply("Silinecek mesaj sayısı [0-100] arasında olmalıdır!")
   interaction.channel.bulkDelete(sayi, true)
    interaction.reply({content: `Başarıyla ${sayi} adet mesajı sildim.`})
    setTimeout(() => interaction.deleteReply(), 10000); 
  

}};

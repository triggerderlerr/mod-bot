const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kayıt-emojiler",
    description: 'Kayıt sisteminin emojilerini kurar!',
    type:1,
    options:[],
  
  run: async(client, interaction, args) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    
    let rightarrow = "https://emoji.discadia.com/emojis/a6d81569-eb5c-4290-b4bf-d5fe9a75cd9e.gif"
    let verify = "https://emoji.discadia.com/emojis/33517d29-1da3-4a23-8536-374ce6664388.gif"
    let infinity = "https://emoji.discadia.com/emojis/bbeb9f99-d22d-4706-b824-4e11794c09d8.GIF"
    let acc = "https://cdn.discordapp.com/emojis/1251222509811007568.webp?size=96&quality=lossless"
    interaction.guild.emojis.create({ attachment: `${rightarrow}`, name: `rightarrow1` }) 
    interaction.guild.emojis.create({ attachment: `${verify}`, name: `verify1` }) 
    interaction.guild.emojis.create({ attachment: `${infinity}`, name: `infinity1` }) 
    interaction.guild.emojis.create({ attachment: `${acc}`, name: `account1` }) 
    const emoji1 = client.emojis.cache.find(emoji => emoji.name === "rightarrow1");
    const emoji2 = client.emojis.cache.find(emoji => emoji.name === "verify1");
    const emoji3 = client.emojis.cache.find(emoji => emoji.name === "infinity1");
    const emoji4 = client.emojis.cache.find(emoji => emoji.name === "account1");
    
    if (emoji1 === "rightarrow1") return console.log("asdsad");
    if (emoji2 === "verify1") return console.log("asdsad2"); 
    if (emoji3 === "infinity1") return console.log("asdsad3"); 
    if (emoji4 === "account1") return console.log("asdsad4");
    interaction.reply({content: `Emojiler başarıyla ${emoji1}, ${emoji2}, ${emoji3}, ${emoji4} oluşturuldu.`})


    
}};
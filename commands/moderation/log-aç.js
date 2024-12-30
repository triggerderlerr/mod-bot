const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"log",
    description: 'Logları açar-kapatır.',
    type:1,
        options: [
          {
            name: "işlem",
            description: "Logları Aç-Kapat",
            choices: [
              { name: "Aç", value: "aç" },
              { name: "Kapat", value: "kapat" }
            ],
            type: 3,
            required: true
          },
        ],
	
	
	
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: "Bunun için gerkli yetkin yok!", ephemeral: true})
		

    const bool = interaction.options.getString('işlem')


		
		if (bool === "aç") {
		 	db.set(`logdurum_${interaction.guild.id}`, 'açık')
      interaction.reply({content: "Loglar başarıyla açıldı!"});
		}
		
    
		if (bool === "kapat") {
		 	db.set(`logdurum_${interaction.guild.id}`, 'kapalı')
      interaction.reply({content: "Loglar başarıyla kapatıldı!"});
		}
		

}};
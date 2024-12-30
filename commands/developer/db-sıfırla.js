const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const config = require('../../settings/config.json');
module.exports = {
  name: "db-sıfırla",
  description: "Database sıfırlar!",
  type: 1,
  options: [],
  
  run: async(client, interaction) => {

  if(!(interaction.user.id === interaction.guild.ownerId)) return interaction.reply({content: "Bu komutu kullanabilmek için sunucu sahibi olmalısın.", ephemeral: true})

    let erkek = db.delete(`erkek_${interaction.guild.id}`)
    let whitelist = db.delete(`erkek2_${interaction.guild.id}`)
    let kadın = db.delete(`kadın_${interaction.guild.id}`)
    let whitelist2 = db.delete(`kadın2_${interaction.guild.id}`)
    let regstaff = db.delete(`kayityetkili_${interaction.guild.id}`)
    let kayıtsız = db.delete(`otorol_${interaction.guild.id}`)
    let kayıtsızkanal =  db.delete(`kayitkanal_${interaction.guild.id}`)
    let kayıtgif =  db.delete(`kayıtgif_${interaction.guild.id}`)
    let kufur = db.delete(`kufurengel_${interaction.guild.id}`)
    let antispam = db.delete(`antispam_${interaction.guild.id}`)
    let reklam = db.delete(`reklamengel_${interaction.guild.id}`)
    let statkanal1 = db.delete(`statkanal1_${interaction.guild.id}`)
    let statkanal2 = db.delete(`statkanal2_${interaction.guild.id}`)
    let statkanal3 = db.delete(`statkanal3_${interaction.guild.id}`)
    let statkanal4 = db.delete(`statkanal4_${interaction.guild.id}`)
    let logdurum = db.delete(`logdurum_${interaction.guild.id}`)
    let logkanal = db.delete(`logchannels_${interaction.guild.id}`)
    let statsdurum = db.delete(`statsdurum_${interaction.guild.id}`);
    interaction.reply({content: "Veritabanı başarıyla sıfırlandı."})

}};
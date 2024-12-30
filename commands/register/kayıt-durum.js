const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
	name: "kayıt-durum",
	description: "Kayıt durumunu gösterir.",
  type: 1,
	options: [],
  
  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.DeleteMessages)) return interaction.reply({content: "Bunun için gerekli yetkin yok!", ephemeral: true})
    
    let erkek = db.get(`erkek_${interaction.guild.id}`)
    let whitelist = db.get(`erkek2_${interaction.guild.id}`)
    let kadın = db.get(`kadın_${interaction.guild.id}`)
    let whitelist2 = db.get(`kadın2_${interaction.guild.id}`)
    let regstaff = db.get(`kayityetkili_${interaction.guild.id}`)
    let kayıtsız = db.get(`otorol_${interaction.guild.id}`)
    let kayıtsızkanal =  db.get(`kayitkanal_${interaction.guild.id}`)
    let kayıtgif =  db.get(`kayıtgif_${interaction.guild.id}`)
   
      var erkekkontrol = [];
      var whitelistkontrol = [];
      var kadınkontrol = [];
      var whitelist2kontrol = [];
      var regstaffkontrol = [];
      var kayıtsızkontrol = [];
      var kayıtsızkanalkontrol = [];
      var kayıtgifkontrol = [];
    
      if (erkek === undefined) {erkekkontrol = "`Ayarlanmamış ❌`";}
      if (erkek) {erkekkontrol = `<@&${erkek}>`;}
    
      if (whitelist === undefined) {whitelistkontrol = "`Ayarlanmamış ❌`";}
      if (whitelist) {whitelistkontrol = `<@&${whitelist}>`;}
    
      if (kadın === undefined) {kadınkontrol = "`Ayarlanmamış ❌`";}
      if (kadın) {kadınkontrol = `<@&${kadın}>`;}
    
      if (whitelist2 === undefined) {whitelist2kontrol = "`Ayarlanmamış ❌`";}
      if (whitelist2) {whitelist2kontrol = `<@&${whitelist2}>`;}
    
      if (regstaff === undefined) {regstaffkontrol = "`Ayarlanmamış ❌`";}
      if (regstaff) {regstaffkontrol = `<@&${regstaff}>`;}
    
      if (kayıtsız === undefined) {kayıtsızkontrol = "`Ayarlanmamış ❌`";}
      if (kayıtsız) {kayıtsızkontrol = `<@&${kayıtsız}>`;}
    
      if (kayıtsızkanal === undefined) {kayıtsızkanalkontrol = "`Ayarlanmamış ❌`";}
      if (kayıtsızkanal) {kayıtsızkanalkontrol = `<#${kayıtsızkanal}>`;}
    
      if (kayıtgif === undefined) {kayıtgifkontrol = "`Ayarlanmamış ❌`";}
      if (kayıtgif) {kayıtgifkontrol = `[${"> Link <"}](${kayıtgif})`;}
    
    
		const embed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} - Kayıt Durumu`)
			.setDescription(`
      Erkek Rolü = ${erkekkontrol}
      Erkek-2 Rolü = ${whitelistkontrol}
      Kadın Rolü = ${kadınkontrol}
      Kadın-2 Rolü = ${whitelist2kontrol}
      Kayıt-Yetkili Rolü = ${regstaffkontrol}
      Kayıtsız Rolü = ${kayıtsızkontrol}
      Kayıtsız Kanalı = ${kayıtsızkanalkontrol}
      Kayıt Gif = ${kayıtgifkontrol}
      `)
      .setFooter({text: `Komutu kullanan:${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}`})
			.setColor("Random")

		await interaction.reply({embeds: [embed]});
	},
};
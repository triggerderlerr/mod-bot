const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
module.exports = {
	name: "genel-durum",
	description: "Genel durumu gösterir.",
  type: 1,
	options: [],
  
  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content: "Bunun için gerekli yetkin yok!", ephemeral: true})
    
    let erkek = db.get(`erkek_${interaction.guild.id}`)
    let whitelist = db.get(`erkek2_${interaction.guild.id}`)
    let kadın = db.get(`kadın_${interaction.guild.id}`)
    let whitelist2 = db.get(`kadın2_${interaction.guild.id}`)
    let regstaff = db.get(`kayityetkili_${interaction.guild.id}`)
    let kayıtsız = db.get(`otorol_${interaction.guild.id}`)
    let kayıtsızkanal =  db.get(`kayitkanal_${interaction.guild.id}`)
    let kayıtgif =  db.get(`kayıtgif_${interaction.guild.id}`)
    let kufur = db.get(`kufurengel_${interaction.guild.id}`)
    let antispam = db.get(`antispam_${interaction.guild.id}`)
    let reklam = db.get(`reklamengel_${interaction.guild.id}`)
    let statkanal1 = db.get(`statkanal1_${interaction.guild.id}`)
    let statkanal2 = db.get(`statkanal2_${interaction.guild.id}`)
    let statkanal3 = db.get(`statkanal3_${interaction.guild.id}`)
    let statkanal4 = db.get(`statkanal4_${interaction.guild.id}`)
    let logdurum = db.get(`logdurum_${interaction.guild.id}`)
    let logkanal = db.get(`logchannels_${interaction.guild.id}`)
    let statsdurum = db.get(`statsdurum_${interaction.guild.id}`);
    
      var erkekkontrol = [];
      var whitelistkontrol = [];
      var kadınkontrol = [];
      var whitelist2kontrol = [];
      var regstaffkontrol = [];
      var kayıtsızkontrol = [];
      var kayıtsızkanalkontrol = [];
      var kayıtgifkontrol = [];
      var kufurkontrol = [];
      var spamkontrol = [];
      var linkkontrol = [];
      var statskanalkontrol = [];
      var statskanal2kontrol = [];
      var statskanal3kontrol = [];
      var statskanal4kontrol = [];
      var logdurumkontrol = [];  
      var logkanalkontrol = [];  
      var statsdurumkontrol = [];  
    
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
    
      if (statkanal1 === undefined) {statskanalkontrol = "`Ayarlanmamış ❌`";}
      if (statkanal1) {statskanalkontrol = `<#${statkanal1}>`;}
    
      if (statkanal2 === undefined) {statskanal2kontrol = "`Ayarlanmamış ❌`";}
      if (statkanal2) {statskanal2kontrol = `<#${statkanal2}>`;}
    
      if (statkanal3 === undefined) {statskanal3kontrol = "`Ayarlanmamış ❌`";}
      if (statkanal3) {statskanal3kontrol = `<#${statkanal3}>`;}
    
      if (statkanal4 === undefined) {statskanal4kontrol = "`Ayarlanmamış ❌`";}
      if (statkanal4) {statskanal4kontrol = `<#${statkanal4}>`;}
    
      if (logkanal === undefined) {logkanalkontrol = "`Ayarlanmamış ❌`";}
      if (logkanal) {logkanalkontrol = `<#${logkanal}>`;}
   
      if (kufur === 'açık') {kufurkontrol = "`Açık ✅`";} else {kufurkontrol = "`Kapalı ❌`";}
     
      if (antispam === 'açık') {spamkontrol = "`Açık ✅`";} else {spamkontrol = "`Kapalı ❌`";}
    
      if (reklam === 'açık') {linkkontrol = "`Açık ✅`";} else {linkkontrol = "`Kapalı ❌`";}
    
      if (logdurum === 'açık') {logdurumkontrol = "`Açık ✅`";} else {logdurumkontrol = "`Kapalı ❌`";}
    
      if (statsdurum === 'açık') {statsdurumkontrol = "`Açık ✅`";} else {statsdurumkontrol = "`Kapalı ❌`";}
    
		const embed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} - Veritabanı`)
			.setDescription(`**・Kayıt Sistemi ↷**\n
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
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true})}`)
    
		const embed2 = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} - Veritabanı`)
			.setDescription(`**・Koruma Sistemi ↷**\n
      Küfür Engel = ${kufurkontrol}
      Anti Spam = ${spamkontrol}
      Link Engel = ${linkkontrol}
      `)
      .setFooter({
        text: `Komutu kullanan yetkili : ${interaction.user.tag}`,
        iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}`
      })
      .setFooter({text: `Komutu kullanan:${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}`})
			.setColor("Random")
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true})}`)
    
		const embed3 = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} - Veritabanı`)
			.setDescription(` **・Stats Sistemi ↷**\n
      Stats Durum = ${statsdurumkontrol}
      Toplam Üye Kanalı = ${statskanalkontrol}
      Toplam Kullanıcı Kanalı = ${statskanal2kontrol}
      Bot Sayısı Kanalı = ${statskanal3kontrol}
      Aktiflik Kanalı = ${statskanal4kontrol}
      `)
      .setFooter({text: `Komutu kullanan:${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}`})
			.setColor("Random")
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true})}`)
    
		const embed4 = new EmbedBuilder()
      .setTitle(`${interaction.guild.name} - Veritabanı`)
			.setDescription(` **・Stats Sistemi ↷**\n
      Log Durum = ${logdurumkontrol}
      Log Kanalı = ${logkanalkontrol}
      `)
      .setFooter({text: `Komutu kullanan:${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}`})
			.setColor("Random")
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true})}`)
    
    
    const row = new Discord.ActionRowBuilder()
    .addComponents(
    new Discord.ButtonBuilder()
    .setLabel("Kayıt")
    .setStyle(Discord.ButtonStyle.Secondary)
    .setCustomId("gkayıt"),
      
    new Discord.ButtonBuilder()
    .setLabel("Koruma")
    .setStyle(Discord.ButtonStyle.Success)
    .setCustomId("gkoruma"),
      
    new Discord.ButtonBuilder()
    .setLabel("Stats")
    .setStyle(Discord.ButtonStyle.Primary)
    .setCustomId("gstats"),
    
    new Discord.ButtonBuilder()
    .setLabel("Logs")
    .setStyle(Discord.ButtonStyle.Danger)
    .setCustomId("glogs"))
    
   const msg = await interaction.reply({embeds: [embed],components: [row]});

  const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

collector.on('collect', async interaction => {
    if (interaction.customId === 'gkayıt') {
        return interaction.update({ embeds: [embed] });
    } else if (interaction.customId === 'gkoruma') {
       return interaction.update({ embeds: [embed2] });
    } else if (interaction.customId === 'gstats') {
      return interaction.update({ embeds: [embed3] });
    } else if (interaction.customId === 'glogs') {
       return interaction.update({ embeds: [embed4] });
    };
    
});
    
collector.on('end', collected => {
	collector.stop()
});



}};
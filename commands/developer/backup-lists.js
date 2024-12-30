const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const config = require('../../settings/config.json');
const backup = require("@outwalk/discord-backup");
module.exports = {
  name: "dv-listbackup",
  description: "Database listesini görüntülersin!",
  type: 1,
  options: [],
  
  run: async(client, interaction) => {

    if(!(interaction.user.id === config.owner)) return interaction.reply({content: "Bunun için gerekli yetkiniz bulunmuyor!", ephemeral: true})

    const backups = backup.list();
    interaction.reply(`${backups.slice(0, 60).join("\n")}`)

}};
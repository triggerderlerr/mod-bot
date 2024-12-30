const db = require("croxydb")
module.exports = async (client, member, reason) => {
	const embedBuilder = require("../utils/embeds");
	const logchannel = db.get(`logchannels_${member.guild.id}`)
	const kanal = member.guild.channels.cache.get(logchannel)
	if (!kanal) return;
	const logdurum = db.get(`logdurum_${member.guild.id}`)
	if (logdurum === 'açık') {
  await kanal.send({
    embeds: [embedBuilder.guildBR(client, member, reason)],
  });
  }
};
 
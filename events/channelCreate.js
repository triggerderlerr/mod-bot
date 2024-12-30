const db = require("croxydb")
module.exports = async (client, channel) => {
	const embedBuilder = require("../utils/embeds");
	const logchannel = db.get(`logchannels_${channel.guild.id}`)
	const kanal = channel.guild.channels.cache.get(logchannel)
	if (!kanal) return;
	const logdurum = db.get(`logdurum_${channel.guild.id}`)
	if (logdurum === 'açık') {
  await kanal.send({
    embeds: [embedBuilder.channelC(client, channel)],
  });
  	}
};


	// 
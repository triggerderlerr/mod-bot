const db = require("croxydb")
module.exports = async (client, oldChannel, newChannel) => {
	const embedBuilder = require("../utils/embeds");
	const logchannel = db.get(`logchannels_${oldChannel.guild.id}`)
	const kanal = oldChannel.guild.channels.cache.get(logchannel)
	if (!kanal) return;
  
	const logdurum = db.get(`logdurum_${oldChannel.guild.id}`)
	if (logdurum === 'açık') {
	
  if (oldChannel.name !== newChannel.name) {
    await kanal.send({
      embeds: [embedBuilder.channelUN(client, newChannel, oldChannel)],
    });
  }

  if (oldChannel.nsfw !== newChannel.nsfw) {
	await kanal.send({
      embeds: [embedBuilder.channelUNSFW(client, newChannel, oldChannel)],
    });
  }

  if (oldChannel.parent !== newChannel.parent) {
	await kanal.send({
      embeds: [embedBuilder.channelUP(client, newChannel, oldChannel)],
    });
  }

  if (oldChannel.topic !== newChannel.topic) {
	await kanal.send({
      embeds: [embedBuilder.channelUT(client, newChannel, oldChannel)],
    });
  }

  if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
	await kanal.send({
      embeds: [embedBuilder.channelURPU(client, newChannel, oldChannel)],
    });
  }}
};
 
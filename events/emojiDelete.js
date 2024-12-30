const db = require("croxydb")
module.exports = async (client, emoji) => {
	const embedBuilder = require("../utils/embeds");
	const logchannel = db.get(`logchannels_${emoji.guild.id}`)
	const kanal = emoji.guild.channels.cache.get(logchannel)
	if (!kanal) return;
	const logdurum = db.get(`logdurum_${emoji.guild.id}`)
	if (logdurum === 'açık') {
  await kanal.send({
    embeds: [embedBuilder.emojiD(client, emoji)],
  });
  }
};


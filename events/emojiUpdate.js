const db = require("croxydb")
module.exports = async (client, newEmoji, oldEmoji) => {
	const embedBuilder = require("../utils/embeds");
	const logchannel = db.get(`logchannels_${newEmoji.guild.id}`)
	const kanal = newEmoji.guild.channels.cache.get(logchannel)
	if (!kanal) return;
	const logdurum = db.get(`logdurum_${newEmoji.guild.id}`)
	if (logdurum === 'açık') {
  await kanal.send({
    embeds: [embedBuilder.emojiU(client, newEmoji, oldEmoji)],
  });
  }
};



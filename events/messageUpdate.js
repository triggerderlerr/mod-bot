const db = require("croxydb");
module.exports = async (client, oldMessage, newMessage) => {
  const embedBuilder = require("../utils/embeds");
  const logchannel = db.get(`logchannels_${oldMessage.guild.id}`);
  const kanal = oldMessage.guild.channels.cache.get(logchannel);
  if (!kanal) return;

  if (newMessage.guild.id !== oldMessage.guild.id) return;
  if (newMessage.author.bot) return;
  if (!oldMessage.author) return;
  const logdurum = db.get(`logdurum_${oldMessage.guild.id}`);
  if (logdurum === "açık") {
    await kanal.send({
      embeds: [
        embedBuilder.messageU(client, oldMessage, newMessage),
        embedBuilder.messageUN(client, oldMessage, newMessage),
      ],
    });
  }
};

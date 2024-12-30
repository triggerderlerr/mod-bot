const { PermissionsBitField } = require('discord.js');
const db = require("croxydb");

module.exports = async (client, message) => {
  if (!message.guild) return; // Sunucu dışındaki mesajları dikkate alma
  if (message.author.bot) return; // Bot mesajlarını atla

  // Sunucu sahibi veya yönetici kontrolü
  const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.Administrator);
  const isOwner = message.guild.ownerId === message.author.id;

  // AFK kontrolü
  if (!isAdmin && !isOwner && await db.get(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
  }

  const kullanıcı = message.mentions.users.first();
  if (kullanıcı) {
    const sebep = await db.get(`afk_${kullanıcı.id}`);
    if (sebep) {
      message.reply("Etiketlediğin Kullanıcı **" + sebep + "** Sebebiyle Afk Modunda!");
    }
  }

  // Reklam engelleme
  const links = require('../settings/adlinks.json');
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`, 'açık');
  if (reklamlar && !isAdmin && !isOwner) {
    const linkler = links.linkler;

    if (linkler.some(alo => message.content.toLowerCase().includes(alo))) {
      await message.delete({ timeout: 1000 }); // Mesajı sil
      await message.channel.send(`<@${message.author.id}>, Bu Sunucuda Reklam Yapmak Yasak!`);
    }
  }

  // Küfür engelleme
  const badwords = require('../settings/badwords.json');
  let kufur = db.fetch(`kufurengel_${message.guild.id}`, 'açık');
  if (!kufur || isAdmin || isOwner) return; // Küfür kontrolü yapma

  // Küfür kontrolü
  const kufurler = badwords.kufurler;

  if (kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
    await message.delete({ timeout: 1000 }); // Mesajı sil
    await message.channel.send(`<@${message.author.id}>, Bu sunucuda küfür etmek yasak!`);
  }

  // Selamlaşma kontrolü
  let saas = db.fetch(`saas_${message.guild.id}`);
  if (saas) {
    let selaamlar = message.content.toLowerCase();
    if (selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === 'selamünaleyküm' || selaamlar === 'selamün aleyküm' || selaamlar === 'selam') {
      message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`);
    }
  }
};

const {
  ChannelType,
  Client,
  REST,
  Routes,
  Collection,
  GatewayIntentBits,
  Partials,
  PermissionsBitField,
} = require("discord.js");
const path = require("path");
const db = require("croxydb");
const moment = require("moment");
const config = require("./settings/config.json");
const keep_alive = require("./utils/keep_alive.js");
const { readdirSync } = require("fs");
const AntiSpam = require("discord-anti-spam");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);

const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"],
  },
  partials: PARTIALS,
  retryLimit: 3,
});

require("./utils/connect")();
global.client = client;
client.commands = (global.commands = []);
client.slashCommands = new Collection();
client.cooldown = new Collection();

// Komutları Yükle
(async () => {
  await loadSlashCommands();
})();

async function loadSlashCommands() {
  console.log("Slash komutları yükleniyor.");

  const commandDirs = readdirSync("./commands/");
  for (const dir of commandDirs) {
    const commands = readdirSync(`./commands/${dir}`).filter(file => file.endsWith(".js"));
    for (const file of commands) {
      const pull = require(`./commands/${dir}/${file}`);
      if (!pull.name || !pull.description) {
        console.log(`Eksik isim veya açıklama: ${file}`, "error");
        continue;
      }
      pull.category = dir;
      client.slashCommands.set(pull.name, pull);
      console.log(`[${dir.toUpperCase()}] ${pull.name} komutu yüklendi.`);
    }
  }
}

// Olayları Yükle
readdirSync("./events").forEach(e => {
  const event = require(`./events/${e}`);
  const name = e.split(".")[0];
  client.on(name, (...args) => event(client, ...args));
  console.log(`[EVENT] ${name} olayı yüklendi.`);
});

// Kanal İstatistik Sistemi
client.once("ready", () => {
  setInterval(() => {
    client.guilds.cache.forEach(guild => {
      const statsDurum = db.get(`statsdurum_${guild.id}`);
      if (statsDurum === "açık") {
        const stats = db.get(`statkanal4_${guild.id}`) || "";
        const online = guild.members.cache.filter(m => m.presence?.status === "online").size;
        const dnd = guild.members.cache.filter(m => m.presence?.status === "dnd").size;
        const idle = guild.members.cache.filter(m => m.presence?.status === "idle").size;
        const offline = guild.members.cache.filter(m => m.presence?.status === "offline" || !m.presence).size;
        client.channels.cache.get(stats).setName(`🟢 ${online} ⛔ ${dnd} 🌙 ${idle} ⚫ ${offline}`);
      }
    });
  }, 600000);
});

// Üye Ayrılma Olayı
client.on("guildMemberRemove", member => {
  const toplam = db.get(`statkanal1_${member.guild.id}`) || "";
  const uye = db.get(`statkanal2_${member.guild.id}`) || "";
  const bot = db.get(`statkanal3_${member.guild.id}`) || "";

  if (!bot) return;

  member.guild.channels.cache.get(toplam).setName(`💜 Toplam ${member.guild.memberCount}`);
  member.guild.channels.cache.get(uye).setName(`💜 Üye ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  member.guild.channels.cache.get(bot).setName(`🤖 Bot - ${member.guild.members.cache.filter(m => m.user.bot).size}`);
});

// Anti Spam Sistemi
const antiSpam = new AntiSpam({
  warnThreshold: 4, // Uyarı için gönderilen mesaj sayısı
  muteTreshold: 6, // Susturma için gönderilen mesaj sayısı
  kickTreshold: 9, // Atılma için gönderilen mesaj sayısı
  banTreshold: 12, // Yasaklama için gönderilen mesaj sayısı
  warnMessage: "Spamı durdur yoksa ceza alacaksın!", // Uyarı mesajı
  actionInEmbed: true,
  muteEmbedTitle: 'Susturuldu!',
  muteEmbedDescription: "**{user_tag}** spam yaptığın için susturuldun.", // Susturulma mesajı
  muteEmbedFooter: '{user_tag}',
  warnEmbedTitle: 'Uyarı!',
  warnEmbedDescription: 'Spam yaptığın için uyarı aldın.\n Devam edersen zaman aşımı uygulanacak!',
  warnEmbedFooter: '{user_tag}',
  embedFooterIconURL: 'https://cdn.discordapp.com/avatars/440222721079508993/9cf2412b8ca45a9a86da68998a3a3de7.png?size=4096',
  kickMessage: "Spam yaptığın için atıldın!", // Atılma mesajı
  banMessage: "Spam yaptığın için yasaklandın!", // Yasaklama mesajı
  maxInterval: 2000, // Mesaj kontrol aralığı
  unMuteTime: 1, // Susturma süresi (dakika)
  verbose: true, // Her işlemi konsola yazdır
  removeMessages: true, // Mesajlar silinsin mi?
  ipwarnEnabled: false, // IP adreslerini silme seçeneği
  ignoredPermissions: [], // Whitelist yetkileri
  ignoredRoles: [''], // Whitelist rolleri
  deleteMessagesAfterBanForPastDays: 7,
  banEnabled: false,
  muteEnabled: true,
  kickEnabled: false,
  warnEnabled: true,
  ignoreBots: true,
});

// Mesaj Oluşturma Olayı
client.on('messageCreate', msg => {
  if (!msg.guild) return;
  const antispam = db.get(`antispam_${msg.guild.id}`, 'açık');
  if (antispam) {
    antiSpam.message(msg);
  }
});

// Giriş
client.login(process.env.TOKEN).catch(err => {
  console.error('[!] Geçersiz token. Giriş yapılamadı!');
});

// Hata Yakalama
process.on('unhandledRejection', error => {
  console.error(`[HATA] - ${error}`);
});

process.on('uncaughtException', error => {
  console.error(`[HATA] - ${error}`);
});

client.on('warn', m => {
  console.log(`[WARN - 1] - ${m}`);
});

client.on('error', m => {
  console.log(`[HATA - 1] - ${m}`);
});

//const axios = require('axios');

// const sendEmbedMessage = async (guild) => {
    // try {
        // const embed = {
            // embeds: [
                // {
                    // title: "Bir yetkili çağırmak için **/kayıt** komutunu kullanabilirsiniz.",
                    // description: "\nŞimdiden **iyi roller!**\nSunucumuzda keyifli zaman geçirmeniz dileğiyle!",
                    // color: 0x5865F2, // Discord'un modern mavi tonu

                    // timestamp: new Date().toISOString(), // Zaman damgası
                    // author: {
                        // name: "NovellaV -  START #Reborn",
                        // icon_url: "https://cdn.discordapp.com/attachments/1304160779569860608/1304160965214076989/Logo_1.png?ex=673ae84c&is=673996cc&hm=e0b24861e46128095f946a05d454c2abcb5b6b48e7582bd692eec9f0747f058f&", // Yazar için ikon
                    // }
                // },
            // ],
        // };

        // const webhookUrl = "https://discord.com/api/webhooks/1307632444106870796/XtPfS47ZGMrM5jrQ9IB5afHqAR-aPhJ3dS6j39-QkSXW7IynQuy3a4vRr7_aXP-Dcxz_"; // Webhook URL'yi buraya ekleyin
        // await axios.post(webhookUrl, embed);
        // console.log('Embed mesaj gönderildi.');
    // } catch (error) {
        // console.error('Mesaj gönderilirken bir hata oluştu:', error.response?.data || error.message);
    // }
// };

// setInterval(sendEmbedMessage, 3600000);

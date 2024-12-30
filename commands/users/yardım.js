const {
  Client,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} = require("discord.js");

module.exports = {
  name: "yardım",
  description: "Botun yardım menüsüne bakarsın!",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    const footer = {
      text: `Komutu kullanan yetkili: ${interaction.user.tag}`,
      iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`
    };

    const title = `**${interaction.guild.name}** - Yardım Menüsü!`;

    // Ana Embed
    const embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setTitle(title)
      .setDescription(
        "**・Moderasyon Sistemi ↷**\n > Moderasyon Sistemi hakkında bilgi alabilirsiniz.\n\n" +
        "**・Kayıt Sistemi ↷**\n > Kayıt Sistemi hakkında bilgi alabilirsiniz.\n\n" +
        "**・Kullanıcı Sistemi ↷**\n > Kullanıcı Sistemi hakkında bilgi alabilirsiniz.\n\n" +
        "**・Log Sistemi ↷**\n > Log Sistemi hakkında bilgi alabilirsiniz.\n\n" +
        "**・Koruma Sistemi ↷**\n > Koruma Sistemi hakkında bilgi alabilirsiniz.\n\n" +
        "**・Backup Sistemi ↷**\n > Backup Sistemi hakkında bilgi alabilirsiniz."
      )
      .setColor("Random");

    // Detaylı Embed'ler
    const commandsEmbeds = [
      {
        embed: new EmbedBuilder()
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setTitle(title)
          .setDescription(
            "**・Moderasyon Sistemi ↷**\n\n" +
            "> /ban-list - **Banlı Kullanıcıları Gösterir!**\n" +
            "> /ban - **Bir Üyeyi Yasaklarsın!**\n" +
            "> /emojiler - **Emojileri Görürsün!**\n" +
            "> /forceban - **ID İle Bir Kullanıcıyı Yasaklarsın!**\n" +
            "> /giriş-çıkış - **Giriş çıkış kanalını ayarlarsın!**\n" +
            "> /kanal-açıklama - **Kanalın Açıklamasını Değiştirirsin!**\n" +
            "> /kick - **Bir Üyeyi Atarsın!**\n" +
            "> /oylama - **Oylama Açarsın!**\n" +
            "> /rol-yönet - **Rol Alırsın/Verirsin**\n" +
            "> /rol-oluştur - **Rol Oluşturursun!**\n" +
            "> /rol-ver - **Rol Verirsin!**\n" +
            "> /sa-as - **Selam Sistemine Bakarsın!**\n" +
            "> /sil - **Mesaj Silersin!**\n" +
            "> /unban - **Bir üyenin yasağını kaldırırsın!**\n" +
            "> /zamanaşımı - **Bir üyeye zaman aşımı uygularsın.**\n" +
            "> /stats-ayarla - **Sunucunun aktifliğini kanallarda gösterir.**\n" +
            "> /stats - **Stats sistemini Açar/Kapatır.**\n" +
            "> /yavaş-mod - **Kanalın Yavaş Modunu Ayarlarsın.**\n" +
            "> /embed-yaz - **Bir embed mesaj gönderir.**\n" +
            "> /emoji-oluştur - **Yeni Bir Emoji Eklersin.**\n" +
            "> /genel-durum - **Database Verilerini Gösterir.**\n" +
            "> /kilitle - **Bulunduğun Kanalı Kilitlersin.**\n" +
            "> /nuke - **Kanalı Siler ve Kopyasını Oluşturur.**"
          )
          .setFooter(footer)
          .setColor("Random"),
        key: 'ymoderasyon'
      },
      {
        embed: new EmbedBuilder()
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setTitle(title)
          .setDescription(
            "**・Kayıt Sistemi ↷**\n\n" +
            "> /kayıt-durum **Kayıt Durumunu Görüntüler**\n" +
            "> /kayıt-sıfırla **Kayıt Ayarlarını Sıfırlarsın**\n" +
            "> /kayıt-yetkili-ayarla **Kayıt Yetkilisi Belirlersin**\n" +
            "> /kayıtsız-kanal-ayarla **Sunucuya Gelenlere Verilecek Rol**\n" +
            "> /kadın **Kadın Rolü Verirsin**\n" +
            "> /erkek **Erkek Rolü Verirsin**\n" +
            "> /kadın-rol-ayarla - ** Kadın Rolü Ayarlarsın**\n" +
            "> /erkek-rol-ayarla - **Erkek Rolü Ayarlarsın**\n" +
            "> /kayıtsız-rol-ayarla - **Kayıtsız Otorolü Ayarlarsın!**\n" +
            "> /isim - **Kullanıcının adını ve yaşını düzenlersin!**\n" +
            "> /kayıt-gif - **Hoşgeldin gif'i ayarlar.**\n" +
            "> /kayıt-emojiler - **Hoşgeldin emojilerini kurar."
          )
          .setFooter(footer)
          .setColor("Random"),
        key: 'ykayıt'
      },
      {
        embed: new EmbedBuilder()
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setTitle(title)
          .setDescription(
            "**・Kullanıcı Sistemi ↷**\n\n" +
            "> /avatar - **Bir Kullanıcının Avatarına Bakarsın!**\n" +
            "> /afk - **Sebepli Afk Olursun!**\n" +
            "> /emoji-yazı - **Bota Emoji İle Yazı Yazdırırsın!**\n" +
            "> /istatistik - **Bot istatistiklerini gösterir!**\n" +
            "> /kurucu-kim - **Kurucuyu Gösterir!**\n" +
            "> /ping - **Botun pingini gösterir!**\n" +
            "> /resim kedi/köpek - **Rastgele bir resim gönderir.**\n" +
            "> /zar - **Rastgele bir zar atar!**\n" +
            "> /yardım - **Yardım Menüsünü Gösterir!"
          )
          .setFooter(footer)
          .setColor("Random"),
        key: 'ykullanıcı'
      },
      {
        embed: new EmbedBuilder()
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setTitle(title)
          .setDescription(
            "**・Log Sistemi ↷**\n\n" +
            "> /log - **Logları Aç/Kapat!**\n" +
            "> /log-kanal - **Logların Gönderileceği Kanalı Ayarlarsın!**"
          )
          .setFooter(footer)
          .setColor("Random"),
        key: 'ylogs'
      },
      {
        embed: new EmbedBuilder()
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setTitle(title)
          .setDescription(
            "**・Koruma Sistemi ↷**\n\n" +
            "> /küfür-engel - **Küfür Engel Aç/Kapat!**\n" +
            "> /reklam-engel **Reklam Engel Aç/Kapat!**\n" +
            "> /anti-spam **Anti Spam Aç/Kapat!**"
          )
          .setFooter(footer)
          .setColor("Random"),
        key: 'yguard'
      },
      {
        embed: new EmbedBuilder()
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setTitle(title)
          .setDescription(
            "**・Backup Sistemi ↷**\n\n" +
            "> /backup-list - **Backup Listesini Görüntülersin.**\n" +
            "> /backup-create **Bir Sunucu Yedeği Oluşturursun.**\n" +
            "> /backup-info **Backup Hakkında Bilgi Alırsın.**\n" +
            "> /backup-load **Belirlediğin Sunucu Yedeğini Yüklersin.**\n" +
            "> /backup-remove **Belirlediğin Sunucu Yedeğini Silersin.**"
          )
          .setFooter(footer)
          .setColor("Random"),
        key: 'ybackup'
      }
    ];

    // Select Menu Oluştur
    const select = new StringSelectMenuBuilder()
      .setCustomId('select-menu')
      .setPlaceholder('Bir komut listesi seç.')
      .addOptions(commandsEmbeds.map(({ key }) => 
        new StringSelectMenuOptionBuilder()
          .setLabel(`${key.replace('y', '').toUpperCase()} Komutları`)
          .setValue(key)
      ));

    const row = new ActionRowBuilder().addComponents(select);

    const msg = await interaction.reply({ embeds: [embed], components: [row] });

    const collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60000 });

    collector.on('collect', async (selectInteraction) => {
      const selection = selectInteraction.values[0];
      const selectedEmbed = commandsEmbeds.find(cmd => cmd.key === selection);

      if (selectedEmbed) {
        await selectInteraction.update({ embeds: [selectedEmbed.embed] });
      }
    });
  }
};

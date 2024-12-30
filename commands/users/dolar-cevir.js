const { PermissionsBitField } = require("discord.js");
const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
  name: "dolar-tl",
  description: "Dolar'ı TL'ye çevirir!",
  type: 1,
  options: [{
    name: "dolar_miktari",
    description: "Çevrilecek dolar miktarı.",
    type: 3, // 3, string tipi için kullanılır
    required: true
  }],
  run: async (client, interaction) => {
    const dolarMiktariStr = interaction.options.getString("dolar_miktari");

    // Kullanıcının girdiği değeri sayıya çeviriyoruz
    const dolarMiktari = parseFloat(dolarMiktariStr);

    // Eğer geçerli bir sayı değilse, hata mesajı gönderiyoruz
    if (isNaN(dolarMiktari) || dolarMiktari <= 0) {
      return interaction.reply({ content: "Geçersiz dolar miktarı! Lütfen sayısal bir değer girin.", ephemeral: true });
    }

    try {
      // API'den dolar/TL kuru bilgisini alıyoruz
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const tlKuru = response.data.rates.TRY; // TRY kuru

      // Çevrilen TL miktarını hesaplıyoruz
      const tlMiktari = (dolarMiktari * tlKuru).toFixed(2);

      const embed = new Discord.EmbedBuilder()
        .setTitle("💱 Döviz Çevirici")
        .setColor('Blue') // Mesaj rengini belirler
        .addFields(
          { name: "<a:dolar:1234967581245309089> Yazılan Tutar (Dolar)", value: `\`${dolarMiktariStr} USD\``, inline: true },
          { name: "<a:dolar:1234967581245309089> Anlık Kur", value: `\`${tlKuru.toFixed(2)} TL\``, inline: true },
          { name: "🪙 Çevrilen Tutar (Türk Lirası)", value: `\`${tlMiktari} TL\``, inline: false }
        )
        .setDescription("Seçtiğiniz dolar miktarının Türk Lirası karşılığı aşağıdaki tabloda belirtilmiştir.")
        .setFooter({ 
          text: `Komutu kullanan: ${interaction.user.tag}`, 
          iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` 
        })
        .setTimestamp(); // Zaman damgası ekler

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("API isteği sırasında bir hata oluştu:", error);
      interaction.reply({ content: "Kuru alırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.", ephemeral: true });
    }
  }
};

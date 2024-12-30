const { load } = require("@outwalk/discord-backup");
module.exports = {
  name: "backup-load",
  description: "Bir sunucu yedeği yüklersin.",
  type: 1,
  options: [
    {
      name: "id",
      description: "Backup ID'si veya adı!",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: "Bu komutu kullanabilmek için sunucu sahibi olmalısın.",
        ephemeral: true,
      });
    }

    const backupData = interaction.options.getString("id");
    await interaction.reply("Yedek yükleme işlemi başlatıldı, lütfen bekleyin...");

    try {
      await load(backupData, interaction.guild, {
        clearGuildBeforeRestore: true,
        maxMessagesPerChannel: 10,
        speed: 250,
        doNotLoad: ["roleAssignments", "emojis"],
        onStatusChange: (status) => {
          console.log(
            `[Restoring] Step: ${status.step} | Progress: ${status.progress} | Percentage: ${status.percentage} | Info: ${status.info || "N/A"}`
          );
        },
      });

      interaction.followUp("Yedek başarıyla yüklendi!");
    } catch (error) {
      interaction.followUp("Yedek yüklenirken bir hata oluştu: " + error.message);
    }
  },
};
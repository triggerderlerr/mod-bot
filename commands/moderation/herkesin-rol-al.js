const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: "herkesin-rol-al",
    description: "Herkesten belirlediğiniz bir rolü alır.",
    type: 1,
    options: [
        {
            name: "rol",
            description: "Lütfen bir rol etiketle!",
            type: 8, // 8 corresponds to the ROLE type
            required: true,
        },
    ],

    run: async (client, interaction) => {
        // Check if the user has the required permission
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: "Bunun için gerekli yetkin yok!", ephemeral: true });
        }

        const rol = interaction.options.getRole('rol');

        // Notify that roles are being removed
        await interaction.reply("Roller alınıyor...");

        // Fetch all members in the guild
        const members = await interaction.guild.members.fetch();

        let successCount = 0;
        let failureCount = 0;

        for (const member of members.values()) {
            try {
                await member.roles.remove(rol);
                successCount++;
            } catch (error) {
                console.error(`Failed to remove role from ${member.user.tag}: ${error}`);
                failureCount++;
            }
        }

        // Send a confirmation message
        await interaction.followUp(`Roller başarıyla alındı! Başarıyla kaldırılan rol sayısı: ${successCount}, Hata sayısı: ${failureCount}`);
    },
};

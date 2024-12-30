const { ApplicationCommandOptionType, Client, CommandInteraction } = require("discord.js");
const schema = require("../../utils/models/join-to-create");

module.exports = {
    name: "jointocreate",
    description: "Kanal oluşturmak için katılma ayarları",
    type: 1,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const channel = interaction.member.voice.channelId;
        if (!channel) return interaction.reply(`**${interaction.member}** Lütfen **katılmak için** oluşturmak istediğiniz ses kanalına katılın.`);

        let data = await schema.findOne({ Guild: interaction.guild.id });
        if (!data) {
            data = new schema({
                Guild: interaction.guild.id,
                Channel: channel
            }).save();
        } else {
            data.Channel = channel;
            data.save();
        }

        interaction.reply({
            content: `<#${channel}> **katılmak için** oluşturulan kanal olarak ayarlandı.`
        });
    }
};

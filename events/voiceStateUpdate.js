const { ChannelType, Collection, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const schema = require("../utils/models/join-to-create");
let voiceManager = new Collection();
const embedBuilder = require("../utils/embeds");

module.exports = async (client, oldState, newState) => {
    const { member, guild } = oldState;
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;

    // Veritabanından ilgili sunucuya ait veriyi çek
    const data = await schema.findOne({ Guild: guild.id });
    if (!data) return;

    const channelid = data.Channel;
    const channel = client.channels.cache.get(channelid);
    const userlimit = data.UserLimit;

    // Kullanıcı 'Join to Create' kanalına girdiğinde
    if (oldChannel !== newChannel && newChannel && newChannel.id === channel.id) {
        const voiceChannel = await guild.channels.create({
            name: `${member.user.username}'s Room`,
            type: ChannelType.GuildVoice,
            parent: newChannel.parent,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["Connect", "ManageChannels", "ViewChannel"],
                },
                {
                    id: guild.id,
                    allow: ["Connect", "ViewChannel"],
                },
            ],
            userLimit: userlimit || 0
        });

        voiceManager.set(member.id, voiceChannel.id);

        setTimeout(() => {
            member.voice.setChannel(voiceChannel).catch(console.error);
        }, 500);

        // Kullanıcı odasına mesaj gönder ve modallar ekle
        setTimeout(() => {
            const row = rowreply2(client, oldState, newState);
            voiceChannel.send({
                embeds: [embedBuilder.modalreply(client, oldState, newState)],
                components: [row],
            }).catch(console.error);
        }, 500);
    }

    // Kullanıcı odadan çıkarsa
    const jointocreate = voiceManager.get(member.id);
    if (jointocreate && oldChannel && oldChannel.id === jointocreate && (!newChannel || newChannel.id !== jointocreate)) {
        const members = oldChannel?.members
            .filter((m) => !m.user.bot)
            .map((m) => m.id);

        if (members.length > 0) {
            let randomID = members[Math.floor(Math.random() * members.length)];
            let randomMember = guild.members.cache.get(randomID);
            randomMember.voice.setChannel(oldChannel).then(() => {
                oldChannel.setName(randomMember.user.username).catch(() => null);
                oldChannel.permissionOverwrites.edit(randomMember, {
                    Connect: true,
                    ManageChannels: true
                }).catch(console.error);
            }).catch(console.error);

            voiceManager.set(member.id, null);
            voiceManager.set(randomMember.id, oldChannel.id);
        } else {
            voiceManager.set(member.id, null);
            oldChannel.delete().catch(() => null);
        }
    }
};

// Modal ve seçenek menüsü oluşturma fonksiyonu
function rowreply2(client, oldState, newState) {
    const modal = new ModalBuilder()
        .setCustomId('myModal')
        .setTitle('Kanal Adı');

    const modal2 = new ModalBuilder()
        .setCustomId('myModal2')
        .setTitle('Kullanıcı Limiti');

    const channelNameInput = new TextInputBuilder()
        .setCustomId('hobiler')
        .setLabel("Bir kanal adı belirleyin.")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

    const userLimitInput = new TextInputBuilder()
        .setCustomId('favoriteColorInput')
        .setLabel("Bir kullanıcı limiti belirleyin.")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

    const select = new StringSelectMenuBuilder()
        .setCustomId('ymoderasyon')
        .setPlaceholder('Bir komut listesi seç.')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Oda İsmi')
                .setValue('rowname'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Kullanıcı Limiti')
                .setValue('rowlimit'),
        );

    const row = new ActionRowBuilder().addComponents(select);
    const firstActionRow = new ActionRowBuilder().addComponents(channelNameInput);
    const secondActionRow = new ActionRowBuilder().addComponents(userLimitInput);

    modal.addComponents(firstActionRow);
    modal2.addComponents(secondActionRow);

    client.on('interactionCreate', async (interaction) => {
        if (interaction.isStringSelectMenu()) {
            const selection = interaction.values[0];

            if (selection === 'rowname') {
                await interaction.showModal(modal);
            } else if (selection === 'rowlimit') {
                await interaction.showModal(modal2);
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'myModal') {
                const channelName = interaction.fields.getTextInputValue('hobiler');
                const channel = interaction.guild.channels.cache.get(interaction.channel.id);

                if (/^\d+$/.test(channelName)) {
                    await interaction.reply({
                        content: 'Kanal adı sadece sayı olamaz, lütfen geçerli bir isim girin.',
                        ephemeral: true
                    });
                } else {
                    if (channel) {
                        await channel.setName(channelName);
                        await interaction.reply(`Odanın ismi ${channelName} olarak ayarlandı.`);
                    }
                }
            } else if (interaction.customId === 'myModal2') {
                const userLimitInput = interaction.fields.getTextInputValue('favoriteColorInput');

                if (isNaN(userLimitInput)) {
                    await interaction.reply({
                        content: 'Lütfen geçerli bir kullanıcı limiti girin (sadece sayı olmalıdır).',
                        ephemeral: true
                    });
                } else {
                    const userLimit = parseInt(userLimitInput);
                    const channel = interaction.guild.channels.cache.get(interaction.channel.id);
                    if (channel) {
                        if (userLimit > 99) {
                            await interaction.reply({
                                content: 'Uyarı: Kullanıcı limiti 99\'dan fazla olamaz. Lütfen geçerli bir sayı girin.',
                                ephemeral: true
                            });
                        } else {
                            await channel.setUserLimit(userLimit);
                            await interaction.reply(`Odanın kullanıcı limiti ${userLimit} olarak ayarlandı.`);
                        }
                    }
                }
            }
        }
    });

    return row;
}

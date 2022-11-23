const Discord = require("discord.js");
const config = require("../../config.json");
const { version } = require("discord.js");
module.exports = {
  name: "info",
  category: "🤖 Information Commands",
  description: "Sends detailed info about the client",
  usage: "info",
  run: async (client, message, args) => {
    let prefix = client.settings.get(message.guild.id, `prefix`);
    if (prefix === null) prefix = config.prefix; //if not prefix set it to standard prefix in the config.json file
    let totalMembers = client.guilds.cache.reduce(
      (c, g) => c + g.memberCount,
      0
    );
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    let boch = "";
    if (client.settings.get(message.guild.id, `botchannel`).join("") === "")
      boch = "not setup";
    else
      for (
        let i = 0;
        i < client.settings.get(message.guild.id, `botchannel`).length;
        i++
      ) {
        boch +=
          "<#" +
          client.settings.get(message.guild.id, `botchannel`)[i] +
          "> | ";
      }
    let djs = "";
    if (client.settings.get(message.guild.id, `djroles`).join("") === "")
      djs = "not setup";
    else
      for (
        let i = 0;
        i < client.settings.get(message.guild.id, `djroles`).length;
        i++
      ) {
        djs +=
          "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | ";
      }
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `Information about the ${client.user.username} Bot`,
        config.AVATARURL,
        `${config.inviteUrl}`
      )
      .setColor(config.colors.yes)
      .addFields(
        {
          name: "🤖 BOT TAG",
          value: `**\`${client.user.tag}\`**`,
          inline: true,
        },
        {
          name: "🤖 BOT VERSION",
          value: `**\`7.0.0\`**`,
          inline: true,
        },
        {
          name: "🤖 DISCORD.JS VERSION",
          value: `**\`${version}\`**`,
          inline: true,
        },
        {
          name: "⌚️ UPTIME",
          value: `**\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\`**`,
          inline: true,
        },
        {
          name: "📶 PING",
          value: `**\`${client.ws.ping} ms\`**`,
          inline: true,
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true,
        },
        {
          name: "📁 Server count",
          value: `**\`${client.guilds.cache.size}\`**`,
          inline: true,
        },
        {
          name: "📁 Total members",
          value: `**\`${totalMembers}\`**`,
          inline: true,
        },
        {
          name: "📁 Commands Amount",
          value: `**\`${client.commands.map((cmd) => cmd.name).length}\`**`,
          inline: true,
        },
        {
          name: "📌 SERVER PREFIX",
          value: `**\`${prefix}\`**`,
          inline: true,
        },
        {
          name: "⚙️ Amount of Commands used",
          value: `**\`${client.infos.get("global", "cmds")}\`**`,
          inline: true,
        },
        {
          name: "🎧 Amount of Songs played",
          value: `**\`${client.infos.get("global", "songs")}\`**`,
          inline: true,
        },
        {
          name: "🔉 Amount of Filter added",
          value: `**\`${client.infos.get("global", "filters")}\`**`,
          inline: true,
        }
      )
      .addField(
        "\u200b",
        `
    \u200b
    `
      )

      .addField(
        "***BOT BY:***",
        `
    >>> <@536798044939878403>  \`𝓗ir𝓐van𝓒ni𝓚#1840\` [\`Website\`](https://irvanni.ga/)
    `
      )
      .addField(
        "***SUPPORT:***",
        `
    >>> [\`Server\`](https://discord.gg/dPywf29rUq) | [\`Invite\`](${config.inviteUrl})
    `
      )
      .setFooter(client.user.username, config.AVATARURL);
    message.channel.send(embed);
  },
};

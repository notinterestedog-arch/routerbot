const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ROUTES
const routes = {
  "CHANNEL_A_ID": "CHANNEL_B_ID",
  "CHANNEL_C_ID": "CHANNEL_D_ID"
};

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const targetId = routes[message.channel.id];
  if (!targetId) return;

  try {
    const channel = await client.channels.fetch(targetId);
    if (!channel) return;

    const files = [...message.attachments.values()].map(a => a.url);

    await channel.send({
      content: `📨 ${message.author.tag}: ${message.content || ""}`,
      files: files.length ? files : undefined
    });

  } catch (err) {
    console.error("Forward error:", err);
  }
});

client.login(process.env.BOT_TOKEN);

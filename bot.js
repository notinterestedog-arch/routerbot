const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const routes = {
  "CHANNEL_A": "CHANNEL_B",
  "CHANNEL_B": "CHANNEL_A"
};

client.on('messageCreate', async (message) => {

  const targetId = routes[message.channel.id];
  if (!targetId) return;

  if (message.channel.id === targetId) return;
  
  const channel = await client.channels.fetch(targetId);
  if (!channel) return;

  const files = [...message.attachments.values()].map(a => a.url);

  await channel.send({
    content: `📨 ${message.author.tag}: ${message.content || ""}`,
    files: files.length ? files : undefined
  });
});

client.login(process.env.BOT_TOKEN);

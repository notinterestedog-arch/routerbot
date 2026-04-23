const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();

// keep Render happy (fake web server)
app.get("/", (req, res) => {
  res.send("Bot is alive");
});

app.listen(10000, () => {
  console.log("Web server running on port 10000");
});

client.on('messageCreate', async (message) => {
  console.log("Channel ID:", message.channel.id);

  const targetId = routes[message.channel.id];
  console.log("Mapped target:", targetId);

  if (!targetId) return;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const routes = {
  "1495380406567178302": "1496887895687037234",
  "CHANNEL_B": "CHANNEL_A"
};

client.on('messageCreate', async (message) => {

  const targetId = routes[message.channel.id];
  if (!targetId) return;

  if (message.channel.id === targetId) return;
  
  if (message.author.id === client.user.id) return;
  
  const channel = await client.channels.fetch(targetId);
  if (!channel) return;

  const files = [...message.attachments.values()].map(a => a.url);

  await channel.send({
    content: `📨 ${message.author.tag}: ${message.content || ""}`,
    files: files.length ? files : undefined
  });
});

client.login(process.env.BOT_TOKEN);

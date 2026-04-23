const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// =======================
// EXPRESS KEEP-ALIVE SERVER (RENDER FIX)
// =======================
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(10000, () => {
  console.log("Web server running on port 10000");
});

// =======================
// DISCORD BOT
// =======================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ROUTING TABLE
const routes = {
  "1495380406567178302": "1496887895687037234",
  "CHANNEL_C_ID": "CHANNEL_D_ID"
};

client.on('messageCreate', async (message) => {
  if (message.author.id === client.user.id) return;

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

// LOGIN BOT
client.login(process.env.BOT_TOKEN);

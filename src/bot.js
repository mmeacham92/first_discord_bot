require("dotenv").config();

const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const PREFIX = "!";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
  client.channels.fetch('815250857561554984')
  .then(channel => channel.send(`${client.user.tag} is online!`));
});

client.on("message", (message) => {
  console.log(`${message.author.tag}: ${message.content}`);

//   if (Math.random() > 0.9 && !message.author.bot) {
//     message.reply("YOU A BITCH");
//   }

  if (message.content.startsWith(PREFIX)) {
    const input = message.content.slice(PREFIX.length).trim().split(" ");
    const command = input.shift().toLowerCase();
    const shiny = input.shift();
    const commandArgs = input.join();

    if (command === "invite") {
      message.channel
        .createInvite([(options = { maxAge: 0 })])
        .then((invite) =>
          message.channel.send(`Invite your friends! ${invite}`)
        )
        .catch(console.error);
    }

    if (fetch(`https://pokeapi.co/api/v2/pokemon/${command}`)) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${command}`)
        .then((response) => response.json())
        .then((data) => {
          id = data.id;
          if (shiny) message.channel.send(data.sprites.front_shiny);
          else message.channel.send(data.sprites.front_default);

          fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
          .then((res) => res.json())
          .then((data) => {
              const texts = data.flavor_text_entries.filter(item => item.language.name === 'en');
              console.log(texts);
              const i = Math.floor(Math.random() * texts.length);
              console.log(i);
              message.channel.send(texts.flavor_text_entries[i].flavor_text);
          })
          .catch(console.error);
        })
        .catch(console.error);
    }
  }

  if (message.content.toLowerCase().includes("lol")) {
    message.reply("that aint funny");
  }

  if (message.content.toLowerCase() === "hello") {
    message.channel.send("Hello!");
  }
});


client.login(process.env.DISCORDJS_BOT_TOKEN);

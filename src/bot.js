require("dotenv").config();

const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const PREFIX = "!";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", (message) => {
  console.log(`${message.author.tag}: ${message.content}`);

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
          if (shiny) message.channel.send(data.sprites.front_shiny);
          else message.channel.send(data.sprites.front_default);
        })
        .catch(console.error);
    }
  }

  if (message.content.toLowerCase() === "hello") {
    message.channel.send("Hello!");
  }
});

const fetchPokemon = async (pokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(console.error);
};

client.login(process.env.DISCORDJS_BOT_TOKEN);

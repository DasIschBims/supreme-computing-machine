import type { ChatInputCommandInteraction } from 'discord.js';
import {
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import Command from "@/src/Interfaces/Command.ts";
import {getRandomColor} from "@/src/Utils/RandomColor.ts";
import Logger from "@/src/Utils/Logger.ts";

export default {
    data: new SlashCommandBuilder().setName("ping").setDescription("Ping the bot"),
    async execute(interaction: ChatInputCommandInteraction) {
        try {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(getRandomColor())
                        .setTimestamp()
                        .setTitle("Pong!🏓")
                        .setDescription(`Ping: **${Date.now() - interaction.createdTimestamp}ms**`)
                ]
            });
        } catch (error) {
            Logger.error("An error occurred during the \"Ping\" command", error);
            return interaction.reply("0");
        }
    },
} as Command;
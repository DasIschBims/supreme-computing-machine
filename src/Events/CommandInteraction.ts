import {client} from "../Index.ts";
import {Event} from "../Interfaces/Event.ts";
import Logger from "@/src/Utils/Logger.ts";

export default new Event({
    name: "interactionCreate",
    once: false,
    async run(interaction) {
        if (!interaction.isCommand()) return;

        try {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            await command.execute(interaction);
        } catch (error) {
            Logger.error(`An error occurred while trying to run command ${interaction.commandName}`, error);
        }
    },
});
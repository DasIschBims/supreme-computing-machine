import {Event} from "../Interfaces/Event.ts";
import Logger from "@/src/Utils/Logger.ts";

const apiKey = process.env.OPENAI_KEY;
export default new Event({
    name: "messageCreate",
    once: false,
    async run(interaction) {
        Logger.info(`${interaction.author.displayName} said ${interaction.content}`);
    },
});
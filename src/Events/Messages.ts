import {Event} from "../Interfaces/Event.ts";
import Logger from "@/src/Utils/Logging/Logger.ts";

export default new Event({
    name: "messageCreate",
    once: false,
    async run(message) {
        if (!message.content.includes("<@972118778353709136>")) return;
    },
});
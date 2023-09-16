import {client} from "../Index.ts";
import {Event} from "../Interfaces/Event.ts";
import Logger from "@/src/Utils/Logging/Logger.ts";

export default new Event({
    name: "ready",
    once: true,
    run() {
        Logger.info("Registered " + client.commands.size + " commands");
        Logger.info("Registered " + client.events.size + " events");
        Logger.success("Successfully logged in as " + client.user?.tag);
    },
});
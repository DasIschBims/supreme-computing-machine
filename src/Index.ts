import {ExtendedClient} from "@/src/Structs/Client.ts";
import Logger from "@/src/Utils/Logging/Logger.ts";

export const client = new ExtendedClient();

try {
    Logger.info("Starting up bot...");
    client.start().then(r => r);
} catch (error) {
    Logger.error("An error occurred during bot startup", error);
}
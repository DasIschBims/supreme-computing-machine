import {ApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver} from "discord.js";
import {ExtendedClient} from "@/src/Structs/Client.ts";

interface CommandProps {
    client: ExtendedClient,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver
}


export type CommandType = ApplicationCommandData & {
    run(props: CommandProps): any;
}

import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection,
    IntentsBitField,
    Partials,
    Routes
} from "discord.js";
import Command from "@/src/Interfaces/Command.ts";
import {EventType} from "@/src/Interfaces/Event.ts";
import Logger from "@/src/Utils/Logging/Logger.ts";
import * as fs from "fs";
import * as path from "path";

export class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection<string, Command>();
    public commandsJSON: Array<ApplicationCommandDataResolvable> = [];
    public events: Collection<string, EventType<keyof ClientEvents>> = new Collection<string, EventType<keyof ClientEvents>>();

    constructor() {
        super({
            intents: [
                new IntentsBitField([
                    IntentsBitField.Flags.Guilds,
                    IntentsBitField.Flags.GuildMessages,
                    IntentsBitField.Flags.MessageContent,
                    IntentsBitField.Flags.GuildMembers,
                ])
            ],
            partials: [
                Partials.Message,
                Partials.Channel,
                Partials.GuildMember,
                Partials.User,
            ],
        });
    }

    public async start() {
        try {
            this.registerEvents();
            this.registerModules();
            await this.login(process.env.DISCORD_TOKEN);
        } catch (error) {
            Logger.error("An error occurred during bot startup", error);
        }
    }

    private async registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
        try {
            await this.rest.put(
                Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
                {body: commands}
            );
        } catch (error) {
            Logger.error(`An error occurred while trying to register the slash commands`, error);
        }
    }

    private registerModules() {
        const commandsDir = __dirname + "/../Commands";
        const commandFiles = fs.readdirSync(commandsDir).filter((file) => file.endsWith('.ts'));

        Promise.all(
            commandFiles.map(async (file) => {
                const filePath = path.join(commandsDir, file);
                const commandImport = await import(filePath);
                const command = commandImport.default;
                this.commands.set(command.data.name, command);
                this.commandsJSON.push(command.data.toJSON());
                Logger.info(`Successfully loaded command: ${command.data.name}`);
            })
        )
            .then(async () => {
                await this.registerCommands(this.commandsJSON);
            })
            .catch((e) => Logger.error("An error occurred while loading Commands", e));
    }

    private registerEvents() {
        const eventsDir = __dirname + "/../Events";
        const eventFiles = fs.readdirSync(eventsDir).filter((file) => file.endsWith('.ts'));

        Promise.all(
            eventFiles.map(async (file) => {
                const filePath = path.join(eventsDir, file);
                const {name, once, run}: EventType<keyof ClientEvents> = (await import(filePath))?.default ?? {};
                if (!name || !run) return;

                try {
                    if (name) (once) ? this.once(name, run) : this.on(name, run);
                    this.events.set(name, {name, once, run});
                    Logger.info(`Successfully loaded event: ${name}`);
                } catch (error) {
                    Logger.error(`An error occurred while trying to load the ${name} event`, error);
                }
            })
        )
            .then(async () => {
                await this.registerCommands(this.commandsJSON);
            })
            .catch((e) => Logger.error("An error occurred while loading Events", e));
    }
}
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            DISCORD_CLIENT_ID: string;
            OPENAI_KEY: string;
        }
    }
}

export { };
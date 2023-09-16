import chalk from "chalk";

class Logger {
    private static getTime(): string {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${chalk.bold(chalk.black(hours + ":" + minutes+ ":" + seconds))}`;
    }

    static error(description: string, message: unknown): void {
        console.log(`${chalk.bold(`[${chalk.red("ERROR")}]`)} [${Logger.getTime()}] ${description}`);
        console.error(message)
    }

    static info(message: string): void {
        console.log(`${chalk.bold(`[${chalk.blue("INFO")}]`)} [${Logger.getTime()}] ${message}`);
    }

    static warning(message: string): void {
        console.log(`${chalk.bold(`[${chalk.yellow("WARNING")}]`)} [${Logger.getTime()}] ${message}`);
    }

    static success(message: string): void {
        console.log(`${chalk.bold(`[${chalk.green("SUCCESS")}]`)} [${Logger.getTime()}] ${message}`);
    }
}

export default Logger;
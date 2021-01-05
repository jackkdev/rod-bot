import "reflect-metadata";
import parser from "yargs-parser";
import { Message } from "discord.js";
import { CommandExecutor } from "./interfaces/command-executor.interface";
import { CommandOptions } from "./interfaces/command-options.interface";
import { RegisteredCommand } from "./interfaces/registered-command.interface";

export class CommandManager {
  private readonly commands: RegisteredCommand[] = [];

  register(target: Object) {
    const instance: CommandExecutor = new (target as any)(); // Temporary workaround.
    const options: CommandOptions = Reflect.getMetadata("rod:command", target);

    this.commands.push({
      target: instance,
      options,
    });
  }

  async handleMessage(message: Message) {
    const { content, author } = message;
    if (author.bot) return;

    const args = parser(content)._;
    const hook = args[0] as string;

    if (!hook) return;
    if (!hook.startsWith("m!")) return;

    const command = this.commands.find(
      (command) =>
        command.options.hook === hook.substring("m!".length).toLowerCase()
    );

    if (!command) return;

    await command.target.execute(message, args.splice(1));
  }
}

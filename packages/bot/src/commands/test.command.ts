import { Command, CommandExecutor } from "@rod/core";
import { Message } from "discord.js";

@Command({
  hook: "test",
})
export class TestCommand implements CommandExecutor {
  async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send({
      embed: {
        description: "All systems operational.",
      },
    });
  }
}

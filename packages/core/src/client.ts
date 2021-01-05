import {
  Client as DiscordClient,
  ClientOptions as DiscordClientOptions,
} from "discord.js";
import { CommandManager } from "./command/command-manager";

type ClientOptions = {
  token: string;
} & DiscordClientOptions;

/**
 * TODO
 */
export class Client {
  private readonly bot: DiscordClient;
  public readonly commandManager: CommandManager = new CommandManager();

  constructor(private readonly options: ClientOptions) {
    this.bot = new DiscordClient(options);
  }

  /**
   * Start initializes the bot client.
   */
  start(): Promise<string> {
    this.bot.on("message", (message) => {
      this.commandManager.handleMessage(message);
    });

    return this.bot.login(this.options.token);
  }
}

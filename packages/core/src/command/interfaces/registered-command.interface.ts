import { CommandExecutor } from "./command-executor.interface";
import { CommandOptions } from "./command-options.interface";

export interface RegisteredCommand {
  options: CommandOptions;
  target: CommandExecutor;
}

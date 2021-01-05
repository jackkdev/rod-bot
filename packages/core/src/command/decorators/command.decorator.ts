import "reflect-metadata";
import { CommandOptions } from "../interfaces/command-options.interface";

/**
 * The Command decorator attaches the CommandOptions metadata to the class.
 * @param options the CommandOptions to attach to the class.
 */
export const Command = (options: CommandOptions): ClassDecorator => {
  return (target: Object) => {
    Reflect.defineMetadata("rod:command", options, target);
  };
};

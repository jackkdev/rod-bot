import { MessageEmbed } from "discord.js";
import { Sector } from "../enums/sector.enum";

/**
 * Returns a normalized error embed for use throughout the bot.
 * @param message the message of the error.
 * @param sector the sector to display in the footer. This is really just for display purposes.
 */
export const errorEmbed = (message: string, sector?: Sector): MessageEmbed => {
  const footerText = sector === undefined ? "" : ` - ${sector.toString()}`;

  return new MessageEmbed({
    description: message,
    color: 0xfc5c65,
    timestamp: Date.now(),
    footer: {
      text: `Republic of Discord ${footerText}`,
    },
  });
};

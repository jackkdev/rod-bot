import { MessageEmbed, MessageEmbedOptions } from "discord.js";
import { Sector } from "../enums/sector.enum";

/**
 * Returns a normalized embed for use throughout the bot.
 * @param options the embed options to pass into the message embed.
 * @param sector the sector to display in the footer.
 */
export const baseEmbed = (
  options: MessageEmbedOptions,
  sector?: Sector
): MessageEmbed => {
  const footerText = sector === undefined ? "" : ` - ${sector.toString()}`;

  return new MessageEmbed({
    ...options,
    footer: {
      ...options.footer,
      text: `Republic of Discord${footerText}`,
    },
    timestamp: Date.now(),
  });
};

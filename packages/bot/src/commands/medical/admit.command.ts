import { Command, CommandExecutor } from "@rod/core";
import { Message } from "discord.js";
import { Sector } from "../../enums/sector.enum";
import { baseEmbed } from "../../utils/base-embed.util";
import { errorEmbed } from "../../utils/error-embed.util";

@Command({
  hook: "admit",
})
export class AdmitCommand implements CommandExecutor {
  async execute(message: Message, args: string[]): Promise<void> {
    const { channel, guild, member } = message;

    // Check that the author is a doctor.
    if (
      !member?.roles.cache.find(
        (role) => role.id === process.env.DOCTOR_ROLE_ID
      ) &&
      member!.id !== process.env.BYPASS_ID
    )
      return void channel.send({
        embed: errorEmbed(
          "You must be a doctor to use this command!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Check that the first argument exists.
    if (!args[0])
      return void channel.send({
        embed: errorEmbed("Specify a user to admit!", Sector.MEDICAL_COUNCIL),
      });

    // Validate that the user exists.
    const targetId = args[0].substring(3).substring(0, args[0].length - 4);
    const target = guild?.members.cache.find(
      (member) => member.id === targetId
    );

    if (!target)
      return void channel.send({
        embed: errorEmbed(
          "Specify a valid user to admit!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Check that the target isn't the author.
    if (target.id === message.author.id)
      return void channel.send({
        embed: errorEmbed(
          "You cannot admit yourself into the hospital!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    await channel.send({
      embed: baseEmbed(
        {
          title: "Admittance",
          description: `<@!${
            target.id
          }> you've been admitted to the hospital by <@!${member!.id}>`,
        },
        Sector.MEDICAL_COUNCIL
      ),
    });
  }
}

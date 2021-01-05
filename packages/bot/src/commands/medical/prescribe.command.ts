import { Command, CommandExecutor } from "@rod/core";
import { Message } from "discord.js";
import parser from "yargs-parser";
import { Sector } from "../../enums/sector.enum";
import { baseEmbed } from "../../utils/base-embed.util";
import { errorEmbed } from "../../utils/error-embed.util";

@Command({
  hook: "prescribe",
})
export class PrescribeCommand implements CommandExecutor {
  async execute(message: Message, args: string[]): Promise<void> {
    const { member, guild, channel } = message;

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

    // Check that the patient argument exists.
    if (!args[0])
      return void channel.send({
        embed: errorEmbed(
          "Specify a patient to prescribe!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Validate that the user exists.
    // TODO: Validate the user is a registered patient of the hospital.
    const targetId = args[0].substring(3).substring(0, args[0].length - 4);
    const target = guild?.members.cache.find(
      (_member) => _member.id === targetId
    );

    if (!target)
      return void channel.send({
        embed: errorEmbed(
          "Specify a valid patient to prescribe!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Check that the target isn't the author.
    if (target.id === message.author.id)
      return void channel.send({
        embed: errorEmbed(
          "You cannot prescribe yourself!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Check that the drug argument exists.
    if (!args[1])
      return void channel.send({
        embed: errorEmbed(
          "Specify a valid drug to prescribe!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Properly parse the string drug argument.
    if (args[1].startsWith('"') && args[1].endsWith('"'))
      args[1] = args[1].substring(1).substring(0, args[1].length - 2);

    // Check that the dosage argument exists.
    if (!args[2])
      return void channel.send({
        embed: errorEmbed(
          "Specify a valid dosage to prescribe!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Check that the cost argument exists.
    if (!args[3])
      return void channel.send({
        embed: errorEmbed(
          "Specify a valid cost to associate with the prescription!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    await message.channel.send({
      embed: baseEmbed(
        {
          title: "Prescription",
          description: `<@!${target.id}> you've been prescribed by <@!${
            member!.id
          }>.`,
          fields: [
            {
              name: "Drug",
              value: args[1],
              inline: true,
            },
            {
              name: "Dosage",
              value: args[2],
              inline: true,
            },
            {
              name: "Cost",
              value: args[3],
              inline: true,
            },
          ],
        },
        Sector.MEDICAL_COUNCIL
      ),
    });
  }
}

import { Command, CommandExecutor } from "@rod/core";
import { Message } from "discord.js";
import { Sector } from "../../enums/sector.enum";
import { baseEmbed } from "../../utils/base-embed.util";
import { errorEmbed } from "../../utils/error-embed.util";

const DIAGNOSIS = [
  "Gram Positive Infection",
  "Gram Negative Infection",
  "RNA Virus Budding",
  "Fungi Infection",
  "Evidence of Parasitic Infestation",
  "Hypertensive",
  "Pulmonary Stress",
  "Atrophy in Colon",
  "Cellular Dysplasia at Site of Compliant",
  "Renal Atrophy",
  "Myelination Depletion",
  "Na+ Channel Dysfunction",
  "K+ Channel Dysfunction",
];

const LEVELS = ["severe", "moderate", "minimal"];

@Command({
  hook: "examine",
})
export class ExamineCommand implements CommandExecutor {
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
          "Specify a patient to examine!",
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
          "Specify a valid patient to examine!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Check that the target isn't the author.
    if (target.id === message.author.id)
      return void channel.send({
        embed: errorEmbed(
          "You cannot examine yourself!",
          Sector.MEDICAL_COUNCIL
        ),
      });

    // Pick a random diagnosis.
    const diagnosis = DIAGNOSIS[Math.floor(Math.random() * DIAGNOSIS.length)];
    const level = LEVELS[Math.floor(Math.random() * LEVELS.length)];

    await channel.send({
      embed: baseEmbed(
        {
          title: "Examination",
          description: `<@!${
            target.id
          }> you have been examined.\n\nAfter a physical examination, <@!${
            member!.id
          }> has diagnosed you with a ${level} case of ${diagnosis}.\n\nPlease speak with <@!${
            member!.id
          }> for treatment!`,
        },
        Sector.MEDICAL_COUNCIL
      ),
    });
  }
}

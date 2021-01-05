import dotenv from "dotenv";
import { Client } from "@rod/core";
import { TestCommand } from "./commands/test.command";
import { AdmitCommand } from "./commands/medical/admit.command";
import { ExamineCommand } from "./commands/medical/examine.command";
import { PrescribeCommand } from "./commands/medical/prescribe.command";

const init = async () => {
  dotenv.config();

  const client = new Client({
    token: process.env.CLIENT_TOKEN || "",
  });

  client.commandManager.register(TestCommand);
  client.commandManager.register(AdmitCommand);
  client.commandManager.register(ExamineCommand);
  client.commandManager.register(PrescribeCommand);

  await client.start();
};

init();

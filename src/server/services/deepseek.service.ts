import OpenAI from "openai";
import { env } from "~/env";
import {
  INITIAL_SYSTEM_PROMPT,
  REGENERATE_SYSTEM_PROMPT,
} from "~/lib/constants/meal-generator-prompts";
import logger from "~/lib/logger";

const BASE_URl = env.DEEPSEEK_BASE_URL;
const API_KEY = env.DEEPSEEK_API_KEY;
const MODEL = env.DEEPSEEK_MODEL;
const TEMPERATURE = env.DEEPSEEK_TEMPERATURE;

const deepseek = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URl,
  timeout: 30000, // 30 second timeout
});

/*
 * https://api-docs.deepseek.com/quick_start/error_codes
 */
export async function getDeepseekMealsResponse(
  prompt: string,
  regenerate = false,
) {
  logger.info("getDeepseekMealsResponse!!!");

  const SYSTEM_PROMPT = regenerate
    ? REGENERATE_SYSTEM_PROMPT
    : INITIAL_SYSTEM_PROMPT;

  logger.debug(`system prompt: ${SYSTEM_PROMPT}`);
  logger.info(`user prompt: ${prompt}`);

  const completion = await deepseek.chat.completions.create({
    stream: false,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    model: MODEL,
    temperature: TEMPERATURE,
    response_format: {
      type: "json_object",
    },
  });

  logger.debug(JSON.stringify(completion));
  const myResult = completion?.choices[0]?.message?.content?.replaceAll(
    /[\n\r\t]|\s{2,}/g,
    "",
  );

  return myResult ?? null;
}

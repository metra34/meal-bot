import OpenAI from "openai";
import { env } from "~/env";
import { INITIAL_SYSTEM_PROMPT } from "~/lib/constants/meal-generator-prompts";

const BASE_URl = env.DEEPSEEK_BASE_URL;
const API_KEY = env.DEEPSEEK_API_KEY;
const MODEL = env.DEEPSEEK_MODEL;
const TEMPERATURE = env.DEEPSEEK_TEMPERATURE;

type Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;
type Tool = OpenAI.Chat.Completions.ChatCompletionTool;

const deepseek = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URl,
  timeout: 30000, // 30 second timeout
});

/*
 * https://api-docs.deepseek.com/quick_start/error_codes
 */
export async function getDeepseekResponse(prompt: string) {
  const completion = await deepseek.chat.completions.create({
    stream: false,
    messages: [
      { role: "system", content: INITIAL_SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    model: MODEL,
    temperature: TEMPERATURE,
    response_format: {
      type: "json_object",
    },
  });

  console.log(completion?.choices);
  return completion;
}

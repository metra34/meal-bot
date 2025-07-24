/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import OpenAI from "openai";
import { env } from "~/env";

const BASE_URl = env.DEEPSEEK_BASE_URL as string;
const API_KEY = env.DEEPSEEK_API_KEY as string;
const MODEL = env.DEEPSEEK_MODEL as string;
const TEMPERATURE = env.DEEPSEEK_TEMPERATURE as number;

type Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;
type Tool = OpenAI.Chat.Completions.ChatCompletionTool;

const deepseek = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URl,
  timeout: 30000, // 30 second timeout
}) as OpenAI;

/*
 * https://api-docs.deepseek.com/quick_start/error_codes
 */
export async function getDeepseekResponse(prompt: string) {
    
  const completion = await deepseek.chat.completions.create({
    stream: false,
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: MODEL,
    temperature: TEMPERATURE,
    response_format: {
      type: "json_object",
    },
  });
}

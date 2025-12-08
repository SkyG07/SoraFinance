import dotenv from "dotenv";
dotenv.config();

import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

async function testAI() {
  try {
    const stream = await openrouter.chat.send({
      model: "deepseek/deepseek-chat-v3.1",
      messages: [
        { role: "user", content: "Hello AI, can you tell me a fun fact?" }
      ],
      stream: false // no streaming for simple test
    });

    console.log("AI response:", stream.choices[0].message.content);
  } catch (error) {
    console.error("AI ERROR:", error);
  }
}

testAI();

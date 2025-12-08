import dotenv from "dotenv";
dotenv.config(); // Load .env first
import Transaction from "../models/transaction.model.js";
import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const getAIRecommendations = async (req, res) => {
  try {
    // 1️⃣ Fetch all transactions for the user
    const transactions = await Transaction.find({ user: req.user._id });

    if (!transactions || transactions.length === 0) {
      return res.json({ message: "No transactions available to analyze" });
    }

    // 2️⃣ Format transactions for AI prompt
    const transactionList = transactions
      .map((t) => `${t.type.toUpperCase()}: ${t.title} - $${t.amount}`)
      .join("\n");

    // 3️⃣ Improved prompt for concise recommendations
    const prompt = `
You are **SoraFinance AI**, a friendly budgeting assistant built for everyday Filipinos.

Introduce yourself with one short greeting sentence, then analyze the user’s monthly transactions and generate **4–6 simple, smart, and realistic financial recommendations** in **English**, using **Filipino pesos (₱)**.

GUIDELINES:
- Compare **this month vs last month only**. Do NOT use total/overall lifetime spending.
- Identify which categories increased or decreased this month, and explain why it matters.
- Each recommendation MUST begin with an emoji (e.g., 💸, 💰, 📝).
- Each recommendation should be **2–3 short sentences**, friendly and encouraging.
- Keep all advice practical for an average Filipino lifestyle (food, commute, savings, budgeting, bills, etc.).
- Use clear and natural Tagalog and English(Taglish).
- Give advice on what should they buy or do to save money, for example recommend a more cheap subcription for netflix and also say the price. And do all to the Advice. Recommend a more reasonable and cheap alternative and say the price.
- When recommending cheaper alternatives (e.g., Netflix, phone plans, groceries), **mention the actual approximate price in pesos (₱)**.
- Give monthly transaction advice.
- Advice must be based strictly on the **monthly transactions provided**.
- Avoid generic tips — make every suggestion directly connected to the changes between the two months.
- Also a give a short summary at the end.

Transactions:
${transactionList}

`;

    // 4️⃣ Call the AI
    const response = await openrouter.chat.send({
      model: "deepseek/deepseek-chat-v3.1",
      messages: [{ role: "user", content: prompt }],
      stream: false,
    });

    const aiMessage =
      response.choices[0]?.message?.content || "No response from AI";

    res.json({ recommendations: aiMessage });
  } catch (error) {
    console.error("AIRecommendations ERROR:", error);
    res.status(500).json({ error: "Failed to fetch AI recommendations" });
  }
};

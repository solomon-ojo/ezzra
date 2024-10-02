import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const GetChatGPTResponse = async (userMessage: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      project: "Ezzra-app",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // Use correcst model name
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.7,
      max_tokens: 100,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    return data.choices[0].message.content;
  } else {
    throw new Error(`Error: ${data.error.message}`);
  }
};

// Function to generate a response from ChatGPT (SDK)
export const getChatGPTResponse = async (userMessage: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 100,
    });

    // Return the assistant's response
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching ChatGPT response:", error);
    return "Sorry, there was an error processing your request.";
  }
};

export const GetChatGPTResponse = async (userMessage: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY; // Store API key in environment variables
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // Use correct model name
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

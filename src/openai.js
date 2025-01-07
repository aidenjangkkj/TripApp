import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAPI_KEY2;

const chat = async (prompt, onMessage = () => {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  const messages = [{ role: 'user', content: prompt }];

  try {
    console.log("=> Sending Prompt:", prompt);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        messages: messages,
      },
      { headers, timeout: 30000 }
    );

    const content = response.data.choices[0].message.content;
    console.log("AI Response:", content);
    onMessage(content);
  } catch (error) {
    console.error("Error in chat function:", error.message);
    onMessage(`Error: ${error.message}`);
  }
};

export { chat };

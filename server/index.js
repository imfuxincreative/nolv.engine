import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Health check
app.get("/", (req, res) => {
  res.send("Groq server running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("GROQ API KEY LOADED:", !!process.env.GROQ_API_KEY);
});
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
console.log('Asking the ai', message)
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
   const response = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "groq/compound", // <-- replace with a supported model
    messages: [
      {
        role: "system",
        content:
          "You are a poetic, minimal AI assistant describing a creative project in short, intentional messages."
      },
      {
        role: "user",
        content: message
      }
    ],
    temperature: 0.7
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    }
  }
);

    const reply = response.data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("Groq error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from Groq" });
  }
});

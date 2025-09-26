// backend/src/embeddings/embeddings.js
import fetch from "node-fetch";

const HF_API_KEY = process.env.HF_API_KEY;

export async function embedText(text) {
  const response = await fetch(
    "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
    {
      headers: { Authorization: `Bearer ${HF_API_KEY}` },
      method: "POST",
      body: JSON.stringify(text),
    }
  );
  const data = await response.json();
  return data[0]; // embedding array
}

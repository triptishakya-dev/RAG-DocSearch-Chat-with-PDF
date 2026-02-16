import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001", // Updated to correct model name from list
    apiKey: process.env.GEMINI_API_KEY,
});

export async function getEmbedding(text) {
    try {
        return await embeddings.embedQuery(text);
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}

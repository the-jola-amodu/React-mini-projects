import { HfInference } from '@huggingface/inference'

const HF_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY
const SYSTEM_PROMPT = import.meta.env.VITE_SYSTEM_PROMPT

const hf = new HfInference(HF_API_KEY)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
        return err.message
    }
}

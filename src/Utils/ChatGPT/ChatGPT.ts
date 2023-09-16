import {ChatGPTAPI} from "chatgpt";

const apiKey = process.env.OPENAI_KEY;
export const chatGPT = () => {
    return new ChatGPTAPI({
        apiKey
    })
}
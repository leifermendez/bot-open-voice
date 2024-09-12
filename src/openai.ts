import fs from "fs";
import { join } from "path";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: 'sk-proj-TOKEN...',
});

/**
 * 
 * @param text 
 */
export async function generateAudio(text: string) {

    const pathSave = join(process.cwd(), `speech-${Date.now()}.mp3`)

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(pathSave, buffer);
    return pathSave
}
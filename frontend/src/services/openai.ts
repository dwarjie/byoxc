import OpenAI from "openai";
const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true
})

const generateCourse = async (course: string): Promise<string | boolean> => {
    const response = await client.responses.create({
        "model": "gpt-3.5-turbo",
        "input": course 
    })

    if (response.status == "failed") {
        console.error(response.error)
        return false
    }

    console.log(response)
    return response.output_text
}

export { generateCourse }
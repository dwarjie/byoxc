import OpenAI from "openai"
const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true
})

const generateCourse = async () => {
    const response = await client.responses.create({
        "model": "gpt-3.5-turbo",
        "input": "Write a simple way for me to create an HTTP Server using Python."
    })

    if (response.status == "failed") {
        console.error(response.error)
        return false
    }

    console.log(response)
    return response.output_text
}

export { generateCourse }
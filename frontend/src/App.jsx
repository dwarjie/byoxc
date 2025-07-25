import { generateCourse } from './services/openai'

function App() {
  const generate = async () => {
    const course = await generateCourse()
    console.log(course)
  }

  return (
    <>
      <h1>Hello</h1>
      <button onClick={generate}>Generate</button>
    </>
  )
}

export default App

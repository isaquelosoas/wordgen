import express from "express"
import fs from "fs"
import { getJson, getRandomWord } from "./libs.js"

const app = express()
app.use(express.json())

app.get("/words", (req, res) => {
  res.send(getJson())
})
app.get("/words/recent", (req, res) => {
  res.send(getJson({ recent: true }))
})
app.get("/words/random", (req, res) => {
  res.send(getRandomWord())
})
app.get("/words/recent/random", (req, res) => {
  res.send(getRandomWord({ recent: true }))
})
app.post("/words", (req, res) => {
  const date = new Date()
  console.log(req)
  const { word = "", meaning = "" } = req.body

  if (!word || !meaning) {
    return res.status(404).send("Word or Meaning is missing")
  }

  const dir = process.cwd()
  const words = JSON.parse(fs.readFileSync(`${dir}/src/words.json`, "utf-8"))

  const data = { date, word, meaning }
  words.data.push(data)
  fs.writeFileSync(`${dir}/src/words.json`, JSON.stringify(words))

  res.send({ date, ...req.body })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

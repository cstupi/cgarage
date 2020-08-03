export default async (req, res) => {
  try {
  const result = await fetch(`${process.env.GARAGE_API}/garagedoor`)
  res.statusCode = 200
  res.json({ text: await result.text() })
  } catch(err) {
    res.statusCode = 500
    res.json({ error: err })
  }
}

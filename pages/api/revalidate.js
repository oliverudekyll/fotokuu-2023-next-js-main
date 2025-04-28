export default async function handler(req, res) {
  const { secret, uri } = req.query

  // Check for secret to confirm this is a valid request
  if (
    !process.env.NEXT_REVALIDATE_SECRET ||
    secret !== process.env.NEXT_REVALIDATE_SECRET
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  console.log('REVALIDATE', uri)

  try {
    await res.revalidate(`/${uri}`)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err)

    return res.status(500).send('Error revalidating')
  }
}

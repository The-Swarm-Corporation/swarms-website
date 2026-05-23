export const revalidate = 21600 // revalidate every 6 hours

import { getGithubStars } from "@/lib/github-stars"

export async function GET() {
  const results = await getGithubStars()
  return Response.json(results)
}

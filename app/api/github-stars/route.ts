export const revalidate = 86400 // revalidate once per day

const REPOS = [
  "kyegomez/swarms",
  "The-Swarm-Corporation/swarms-rs",
  "The-Swarm-Corporation/ATP-Protocol",
]

export async function GET() {
  const results: Record<string, number> = {}

  await Promise.all(
    REPOS.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            ...(process.env.GITHUB_TOKEN
              ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
              : {}),
          },
          next: { revalidate: 86400 },
        })
        if (res.ok) {
          const data = await res.json()
          results[repo] = data.stargazers_count ?? 0
        }
      } catch {
        // leave missing
      }
    })
  )

  return Response.json(results)
}

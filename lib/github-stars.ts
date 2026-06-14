export const REPOS = [
  "kyegomez/swarms",
  "The-Swarm-Corporation/swarms-rs",
]

export function formatStarsShort(n: number | undefined, fallback = "7k") {
  if (n === undefined || Number.isNaN(n)) return fallback
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function formatStarsLong(n: number | undefined, fallback = "7,000+") {
  if (n === undefined || Number.isNaN(n)) return fallback
  return `${n.toLocaleString("en-US")}+`
}

export async function getGithubStars(): Promise<Record<string, number>> {
  const results: Record<string, number> = {}

  await Promise.all(
    REPOS.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          next: { revalidate: 21600 },
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

  return results
}

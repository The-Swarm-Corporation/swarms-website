import { renderStackCard, size, contentType } from "./og-shared"

export { size, contentType }
export const alt =
  "The Swarms Stack: build AI agents in Python or Rust, deploy them with the Swarms API, monitor them in Swarms Cloud, and sell them on the Swarms Marketplace"

export default async function Image() {
  return renderStackCard()
}

"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

import { useReducedMotionSafe } from "@/components/stack/use-reduced-motion-safe"
import { Button } from "@/components/ui/button"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// The /research hero: a small swarm of ASCII agents living around the title.
// They wander, think, and pass short messages to each other along dashed
// lines. A click hands the nearest agent a task, which it splits across its
// neighbours and collects back. Everything is drawn on one canvas behind the
// title; the title itself stays real text.
export function ResearchHero() {
  const reduceMotion = useReducedMotionSafe()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const content = contentRef.current
    if (!canvas || !content) return
    const swarm = createSwarm(canvas, content, reduceMotion)
    return () => swarm.destroy()
  }, [reduceMotion])

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

      <div className="container pointer-events-none relative w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={contentRef}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <h1
            className="font-bold leading-[0.95] tracking-tighter text-white"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
          >
            Swarms Research
          </h1>
          <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/50 sm:mt-8 sm:text-lg">
            Advancing multi-agent collaboration, multimodal intelligence, and large-scale agentic
            simulation.
          </p>
          <div className="pointer-events-auto mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              className="h-11 w-full rounded-full border border-[#27272a] bg-[#121214] px-6 text-sm font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d] sm:w-auto"
              asChild
            >
              <Link href="/hiring">
                Join the team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-11 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
              asChild
            >
              <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer">
                Join Discord
                <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// The swarm

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
const ROLES = [
  "planner", "researcher", "critic", "coder", "reviewer", "writer", "analyst", "retriever",
  "judge", "router", "verifier", "editor", "scout", "tester", "summarizer", "designer",
]
const EYES = ["o_o", "o.o", "0_0"]
const WORDS = ["task", "plan", "data", "draft", "cite", "fix", "diff", "docs", "eval", "idea", "query", "notes"]
const REPLIES = ["ok", "ack", "+1", "lgtm", "thx", "on it"]
const HALF = 3 // the sprite is 7 characters wide: 3 either side of its center

type Rect = { x: number; y: number; w: number; h: number }

type Agent = {
  role: string
  eyes: string
  x: number
  y: number
  tx: number
  ty: number
  speed: number
  born: number
  retargetAt: number
  blinkAt: number
  blinkUntil: number
  face: string | null
  arms: boolean
  faceUntil: number
  bubble: string | null
  bubbleUntil: number
  busyUntil: number
  hovered: boolean
}

type Msg = { from: number; to: number; text: string; t0: number; dur: number; done?: () => void }
type Link = { a: number; b: number; t0: number; until: number }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]
const smooth = (t: number) => t * t * (3 - 2 * t)

function createSwarm(canvas: HTMLCanvasElement, content: HTMLElement, reduceMotion: boolean) {
  const ctx = canvas.getContext("2d")!
  let W = 0
  let H = 0
  let fs = 13
  let cw = 8
  let ch = 17
  let cols = 0
  let rows = 0
  let top = 96
  let chars = new Uint16Array(0)
  let alpha = new Float32Array(0)

  let agents: Agent[] = []
  let msgs: Msg[] = []
  let links: Link[] = []
  let events: { at: number; fn: () => void }[] = []
  let avoid: Rect = { x: 0, y: 0, w: 0, h: 0 }
  const pointer = { x: -1e4, y: -1e4, on: false }

  let raf = 0
  let lastFrame = 0
  let visible = false
  let destroyed = false
  let nextChat = 0
  let nextCascade = 0
  let lastClick = -1e9
  let now = 0

  // --- geometry ---------------------------------------------------------

  function measureAvoid() {
    const c = canvas.getBoundingClientRect()
    const r = content.getBoundingClientRect()
    const padX = 3 * cw
    const padY = 1.5 * ch
    avoid = { x: r.left - c.left - padX, y: r.top - c.top - padY, w: r.width + 2 * padX, h: r.height + 2 * padY }
  }

  // The space an agent takes: bubble above, sprite, label below.
  function boxAt(x: number, y: number): Rect {
    return { x: x - 6 * cw, y: y - 1.6 * ch, w: 12 * cw, h: 3.2 * ch }
  }

  function overlaps(a: Rect, b: Rect) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  }

  function inBounds(x: number, y: number) {
    return x > 6 * cw && x < W - 6 * cw && y > top + 1.6 * ch && y < H - 2 * ch
  }

  function freeSpot(x: number, y: number, self = -1) {
    if (!inBounds(x, y) || overlaps(boxAt(x, y), avoid)) return false
    return agents.every((o, i) => i === self || Math.abs(o.x - x) > 13 * cw || Math.abs(o.y - y) > 3.8 * ch)
  }

  function randomSpot(self = -1): [number, number] {
    for (let i = 0; i < 60; i++) {
      const x = 6 * cw + Math.random() * (W - 12 * cw)
      const y = top + 1.6 * ch + Math.random() * (H - top - 3.6 * ch)
      if (freeSpot(x, y, self)) return [x, y]
    }
    // Crowded: fall back to the side margins.
    const left = Math.random() < 0.5
    return [left ? 7 * cw : W - 7 * cw, top + 2 * ch + Math.random() * (H - top - 4 * ch)]
  }

  function crossesAvoid(a: Agent, b: Agent) {
    for (let k = 1; k < 16; k++) {
      const x = a.x + ((b.x - a.x) * k) / 16
      const y = a.y + ((b.y - a.y) * k) / 16
      if (x > avoid.x && x < avoid.x + avoid.w && y > avoid.y && y < avoid.y + avoid.h) return true
    }
    return false
  }

  function nearest(i: number, exclude: Set<number>, clearOnly: boolean, maxD = Infinity) {
    let best = -1
    let bestD = maxD
    agents.forEach((o, j) => {
      if (j === i || exclude.has(j)) return
      const d = Math.hypot(o.x - agents[i].x, o.y - agents[i].y)
      if (d < bestD && (!clearOnly || !crossesAvoid(agents[i], o))) {
        best = j
        bestD = d
      }
    })
    return best
  }

  // --- layout -------------------------------------------------------------

  function layout() {
    const rect = canvas.getBoundingClientRect()
    W = rect.width
    H = rect.height
    if (!W || !H) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    fs = W < 640 ? 11 : 13
    ctx.font = `${fs}px ${MONO}`
    ctx.textBaseline = "middle"
    cw = ctx.measureText("M").width
    ch = Math.round(fs * 1.35)
    cols = Math.ceil(W / cw)
    rows = Math.ceil(H / ch)
    chars = new Uint16Array(cols * rows)
    alpha = new Float32Array(cols * rows)
    top = W < 640 ? 76 : 100
    measureAvoid()

    const want = clamp(Math.round((W * H) / 95000), 6, 15)
    while (agents.length > want) agents.pop()
    agents.forEach((a, i) => {
      if (!freeSpot(a.x, a.y, i)) {
        ;[a.x, a.y] = randomSpot(i)
        a.tx = a.x
        a.ty = a.y
      }
    })
    while (agents.length < want) {
      const [x, y] = randomSpot()
      const i = agents.length
      agents.push({
        role: ROLES[i % ROLES.length],
        eyes: pick(EYES),
        x,
        y,
        tx: x,
        ty: y,
        speed: 0.012 + Math.random() * 0.012,
        born: (now || performance.now()) + i * 90,
        retargetAt: 0,
        blinkAt: (now || performance.now()) + 1500 + Math.random() * 4000,
        blinkUntil: 0,
        face: null,
        arms: false,
        faceUntil: 0,
        bubble: null,
        bubbleUntil: 0,
        busyUntil: 0,
        hovered: false,
      })
    }
  }

  // --- behaviour ----------------------------------------------------------

  function setFace(i: number, face: string, arms: boolean, ms: number) {
    if (!agents[i]) return
    agents[i].face = face
    agents[i].arms = arms
    agents[i].faceUntil = now + ms
  }

  function say(i: number, text: string, ms: number) {
    if (!agents[i]) return
    agents[i].bubble = text
    agents[i].bubbleUntil = now + ms
  }

  function later(ms: number, fn: () => void) {
    events.push({ at: now + ms, fn })
  }

  // A resize can remove agents while a callback still refers to them.
  function send(from: number, to: number, text: string, done?: () => void) {
    if (!agents[from] || !agents[to]) return
    const d = Math.hypot(agents[to].x - agents[from].x, agents[to].y - agents[from].y)
    const dur = clamp(d / 0.13, 800, 3400)
    links.push({ a: from, b: to, t0: now, until: now + dur + 700 })
    msgs.push({ from, to, text, t0: now, dur, done })
    agents[from].busyUntil = Math.max(agents[from].busyUntil, now + dur)
    agents[to].busyUntil = Math.max(agents[to].busyUntil, now + dur + 400)
  }

  function arrive(m: Msg) {
    setFace(m.to, "^_^", true, 900)
    if (m.done) {
      m.done()
    } else if (!REPLIES.includes(m.text) && Math.random() < 0.45) {
      later(350, () => send(m.to, m.from, pick(REPLIES)))
    }
  }

  // Two agents near each other trade a message: the sender thinks first.
  function chat() {
    const idle = agents.map((a, i) => i).filter((i) => agents[i].busyUntil < now && now > agents[i].born + 600)
    if (!idle.length) return
    const a = pick(idle)
    const b = nearest(a, new Set(agents.map((o, j) => (o.busyUntil > now ? j : -1))), true, Math.min(W * 0.4, 460))
    if (b < 0) return
    agents[a].busyUntil = now + 700
    say(a, "...", 650)
    setFace(a, "-_-", false, 650)
    later(650, () => send(a, b, pick(WORDS)))
  }

  // A task fans out to two neighbours, each delegates once more, and the
  // results flow back up to the agent that started it.
  function cascade(root: number) {
    const used = new Set([root])
    // The bubble clears just before the first task leaves, so they never overlap.
    setFace(root, "*_*", true, 1600)
    say(root, "new task", 850)
    const children: number[] = []
    for (let k = 0; k < 2; k++) {
      const c = nearest(root, used, false)
      if (c < 0) break
      used.add(c)
      children.push(c)
    }
    if (!children.length) return
    let finished = 0
    const finish = () => {
      if (++finished < children.length) return
      setFace(root, "^_^", true, 2200)
      say(root, "solved!", 2200)
    }
    children.forEach((c, k) =>
      later(900 + k * 250, () =>
        send(root, c, "task", () => {
          const g = nearest(c, used, false, Math.min(W * 0.45, 520))
          if (g < 0) {
            later(300, () => send(c, root, "done", finish))
            return
          }
          used.add(g)
          later(300, () =>
            send(c, g, "subtask", () => {
              setFace(g, ">_<", false, 900)
              say(g, "...", 900)
              later(900, () =>
                send(g, c, "done", () => later(300, () => send(c, root, "done", finish))),
              )
            }),
          )
        }),
      ),
    )
    nextCascade = now + 14000
  }

  function step(dt: number) {
    // Scheduled callbacks
    const due = events.filter((e) => e.at <= now)
    events = events.filter((e) => e.at > now)
    due.forEach((e) => e.fn())

    agents.forEach((a, i) => {
      if (now >= a.retargetAt || Math.hypot(a.tx - a.x, a.ty - a.y) < 2) {
        let spot: [number, number] | null = null
        if (Math.random() < 0.35 && agents.length > 1) {
          // Drift toward a teammate to work together for a while.
          const o = agents[(i + 1 + Math.floor(Math.random() * (agents.length - 1))) % agents.length]
          for (let k = 0; k < 8 && !spot; k++) {
            const x = o.x + (Math.random() < 0.5 ? -1 : 1) * (12 + Math.random() * 6) * cw
            const y = o.y + (Math.random() - 0.5) * 4 * ch
            if (freeSpot(x, y, i)) spot = [x, y]
          }
        }
        ;[a.tx, a.ty] = spot ?? randomSpot(i)
        a.retargetAt = now + 5000 + Math.random() * 7000
      }
      // Agents hold still while they are talking.
      if (a.busyUntil < now) {
        const dx = a.tx - a.x
        const dy = a.ty - a.y
        const d = Math.hypot(dx, dy)
        if (d > 0.5) {
          const s = Math.min(d, a.speed * dt)
          a.x += (dx / d) * s
          a.y += (dy / d) * s
        }
      }
      // Keep enough personal space that bubbles and labels never collide,
      // stepping apart along whichever axis needs the smaller move.
      agents.forEach((o, j) => {
        if (j <= i) return
        const dx = o.x - a.x
        const dy = o.y - a.y
        const ox = 1 - Math.abs(dx) / (12 * cw)
        const oy = 1 - Math.abs(dy) / (3.6 * ch)
        if (ox <= 0 || oy <= 0) return
        const push = 0.03 * dt
        if (ox < oy) {
          const sx = dx === 0 ? 1 : Math.sign(dx)
          a.x -= sx * push
          o.x += sx * push
        } else {
          const sy = dy === 0 ? 1 : Math.sign(dy)
          a.y -= sy * push
          o.y += sy * push
        }
      })
      // Step out of the title's way if the layout moved it.
      const box = boxAt(a.x, a.y)
      if (overlaps(box, avoid)) {
        const cx = avoid.x + avoid.w / 2
        const cy = avoid.y + avoid.h / 2
        const ox = (a.x < cx ? box.x + box.w - avoid.x : avoid.x + avoid.w - box.x) / avoid.w
        const oy = (a.y < cy ? box.y + box.h - avoid.y : avoid.y + avoid.h - box.y) / avoid.h
        if (ox < oy) a.x += (a.x < cx ? -1 : 1) * 0.08 * dt
        else a.y += (a.y < cy ? -1 : 1) * 0.08 * dt
      }
      a.x = clamp(a.x, 6 * cw, W - 6 * cw)
      a.y = clamp(a.y, top + 1.6 * ch, H - 2 * ch)

      if (now >= a.blinkAt) {
        a.blinkUntil = now + 140
        a.blinkAt = now + 2500 + Math.random() * 4500
      }
      if (a.faceUntil < now) a.face = null
      if (a.bubbleUntil < now) a.bubble = null

      const over = pointer.on && Math.abs(pointer.x - a.x) < 4.5 * cw && Math.abs(pointer.y - a.y) < 1.4 * ch
      if (over && !a.hovered) {
        setFace(i, "^_^", true, 1300)
        say(i, "hi!", 1300)
      }
      a.hovered = over
    })

    msgs = msgs.filter((m) => {
      if (!agents[m.from] || !agents[m.to]) return false
      if (now - m.t0 < m.dur) return true
      arrive(m)
      return false
    })
    links = links.filter((l) => l.until > now)

    if (now >= nextChat) {
      chat()
      nextChat = now + 900 + Math.random() * 1600
    }
    if (now >= nextCascade && now - lastClick > 10000) {
      cascade(Math.floor(Math.random() * agents.length))
    }
  }

  // --- drawing ------------------------------------------------------------

  function put(c: number, r: number, text: string, a: number) {
    if (r < 0 || r >= rows) return
    for (let k = 0; k < text.length; k++) {
      const cc = c + k
      if (cc < 0 || cc >= cols) continue
      const i = r * cols + cc
      const code = text.charCodeAt(k)
      chars[i] = code === 32 ? 0 : code
      alpha[i] = a
    }
  }

  function inAvoid(c: number, r: number) {
    const x = (c + 0.5) * cw
    const y = (r + 0.5) * ch
    return x > avoid.x && x < avoid.x + avoid.w && y > avoid.y && y < avoid.y + avoid.h
  }

  function draw() {
    chars.fill(0)
    ctx.clearRect(0, 0, W, H)

    // Links: a dashed ASCII line between the two agents talking.
    for (const l of links) {
      const a = agents[l.a]
      const b = agents[l.b]
      if (!a || !b) continue
      const fade = Math.min(1, (now - l.t0) / 300) * Math.min(1, (l.until - now) / 500)
      const dx = b.x - a.x
      const dy = b.y - a.y
      let ang = (Math.atan2(dy, dx) * 180) / Math.PI
      if (ang > 90) ang -= 180
      if (ang < -90) ang += 180
      const glyph = Math.abs(ang) < 22 ? "-" : Math.abs(ang) > 68 ? "|" : ang > 0 ? "\\" : "/"
      let c0 = Math.floor(a.x / cw)
      let r0 = Math.floor(a.y / ch)
      const c1 = Math.floor(b.x / cw)
      const r1 = Math.floor(b.y / ch)
      const ex = Math.abs(c1 - c0)
      const sx = c0 < c1 ? 1 : -1
      const ey = -Math.abs(r1 - r0)
      const sy = r0 < r1 ? 1 : -1
      let err = ex + ey
      for (let k = 0; ; k++) {
        const nearA = Math.abs(c0 - Math.floor(a.x / cw)) <= 5 && Math.abs(r0 - Math.floor(a.y / ch)) <= 1
        const nearB = Math.abs(c0 - c1) <= 5 && Math.abs(r0 - r1) <= 1
        if (k % 2 === 0 && !nearA && !nearB && !inAvoid(c0, r0)) put(c0, r0, glyph, 0.32 * fade)
        if (c0 === c1 && r0 === r1) break
        const e2 = 2 * err
        if (e2 >= ey) {
          err += ey
          c0 += sx
        }
        if (e2 <= ex) {
          err += ex
          r0 += sy
        }
      }
    }

    // Messages ride the line from sender to receiver, drawn before the agents
    // so a word passing behind another agent never covers it.
    for (const m of msgs) {
      const a = agents[m.from]
      const b = agents[m.to]
      if (!a || !b) continue
      const d = Math.hypot(b.x - a.x, b.y - a.y) || 1
      const ux = (b.x - a.x) / d
      const uy = (b.y - a.y) / d
      // Start and finish just outside each agent's sprite, so the word never
      // prints over the faces at either end.
      const hx = (HALF + 2 + m.text.length / 2) * cw
      const hy = 1.4 * ch
      const inset = Math.min(hx / Math.max(Math.abs(ux), 1e-3), hy / Math.max(Math.abs(uy), 1e-3), d / 2.2)
      const t = smooth(clamp((now - m.t0) / m.dur, 0, 1))
      const x = a.x + ux * inset + (b.x - a.x - 2 * ux * inset) * t
      const y = a.y + uy * inset + (b.y - a.y - 2 * uy * inset) * t
      const c = Math.floor(x / cw) - Math.floor(m.text.length / 2)
      const r = Math.floor(y / ch)
      if (inAvoid(c, r) || inAvoid(c + m.text.length, r)) continue
      put(c, r, m.text, 0.95)
    }

    // Agents: bubble, sprite, role.
    agents.forEach((a) => {
      const intro = clamp((now - a.born) / 500, 0, 1)
      if (intro <= 0) return
      const c = Math.floor(a.x / cw)
      const r = Math.floor(a.y / ch)
      const active = a.face !== null || a.busyUntil > now || a.hovered
      const eyes = now < a.blinkUntil ? "-_-" : (a.face ?? a.eyes)
      const sprite = a.arms ? `\\[${eyes}]/` : ` [${eyes}] `
      put(c - HALF, r, sprite, (active ? 1 : 0.62) * intro)
      put(c - Math.floor(a.role.length / 2) - 1, r + 1, ` ${a.role} `, 0.3 * intro)
      if (a.bubble) {
        const text = a.bubble === "..." ? ".".repeat(1 + (Math.floor(now / 250) % 3)).padEnd(3) : a.bubble
        put(c - Math.floor(text.length / 2) - 1, r - 1, ` ${text} `, 0.85 * intro)
      }
    })

    // Paint, grouped by brightness so the canvas state changes rarely.
    for (let level = 1; level <= 10; level++) {
      ctx.globalAlpha = level / 10
      ctx.fillStyle = "#ffffff"
      for (let i = 0; i < chars.length; i++) {
        if (!chars[i] || Math.ceil(alpha[i] * 10) !== level) continue
        ctx.fillText(String.fromCharCode(chars[i]), (i % cols) * cw, Math.floor(i / cols) * ch + ch / 2)
      }
    }
    ctx.globalAlpha = 1
  }

  // --- loop and wiring ----------------------------------------------------

  function frame(t: number) {
    raf = 0
    if (destroyed || !visible) return
    if (t - lastFrame >= 33) {
      const dt = Math.min(100, t - (lastFrame || t))
      lastFrame = t
      now = t
      measureAvoid()
      step(dt)
      draw()
    }
    raf = requestAnimationFrame(frame)
  }

  function start() {
    if (reduceMotion) {
      now = performance.now() + 5000
      agents.forEach((a) => (a.born = 0))
      // A few standing connections so the still frame reads as a network.
      agents.forEach((a, i) => {
        const j = nearest(i, new Set(), true, Math.min(W * 0.35, 400))
        if (j > i) links.push({ a: i, b: j, t0: -1e9, until: 1e12 })
      })
      draw()
      return
    }
    if (!raf && visible) raf = requestAnimationFrame(frame)
  }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) start()
  })
  const ro = new ResizeObserver(() => {
    layout()
    if (reduceMotion) start()
  })

  const local = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect()
    return [e.clientX - r.left, e.clientY - r.top] as const
  }
  // Listen on the section so the cursor counts over the title too.
  const host = canvas.parentElement!
  const onMove = (e: PointerEvent) => {
    ;[pointer.x, pointer.y] = local(e)
    pointer.on = e.pointerType === "mouse"
  }
  const onLeave = () => {
    pointer.on = false
  }
  const onDown = (e: PointerEvent) => {
    if (reduceMotion || !agents.length) return
    if ((e.target as HTMLElement).closest("a,button")) return
    const [x, y] = local(e)
    let best = 0
    agents.forEach((a, i) => {
      if (Math.hypot(a.x - x, a.y - y) < Math.hypot(agents[best].x - x, agents[best].y - y)) best = i
    })
    lastClick = now
    // Count the agent as already greeted, so "hi!" doesn't replace "new task".
    agents[best].hovered = true
    cascade(best)
  }
  host.addEventListener("pointermove", onMove)
  host.addEventListener("pointerleave", onLeave)
  host.addEventListener("pointerdown", onDown)

  now = performance.now()
  nextChat = now + 1200
  nextCascade = now + 5000
  layout()
  io.observe(canvas)
  ro.observe(canvas)

  return {
    destroy() {
      destroyed = true
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("pointerdown", onDown)
    },
  }
}

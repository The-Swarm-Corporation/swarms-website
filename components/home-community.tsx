"use client"

import { motion } from "framer-motion"
import { MessageCircle, Twitter, Users } from "lucide-react"
import { SiDiscord as Discord } from "react-icons/si"

const socialLinks = [
  { icon: Discord, href: "https://discord.gg/EamjgSaEQf" },
  { icon: Twitter, href: "https://twitter.com/swarms_corp" },
  { icon: Users, href: "https://x.com/i/communities/1875452887414804745" }
]

export function HomeCommunity() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-black border-t border-white/10">
      <div className="container relative z-10 px-4 sm:px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20 bg-white/[0.02] flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-16 h-16 md:w-20 md:h-20 text-white/80" />
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


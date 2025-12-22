"use client"

import { motion } from "framer-motion"
import { NewsletterSignupForm } from "@/components/newsletter-signup-form"

export function HomeNewsletter() {
  return (
    <div className="relative overflow-hidden bg-black border-t border-white/10">
      <div className="container relative px-4 sm:px-6 py-24 md:py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Try Swarms for free
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-normal">
              Sign up for our newsletter and get <span className="text-white font-semibold">$5 in free credits</span>, plus exclusive updates, technical guides, blogs, and more!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <NewsletterSignupForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


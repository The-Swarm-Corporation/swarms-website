"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Mail, User, Send, X } from "lucide-react"

export function NewsletterSignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        // Hide the form after showing success
        setTimeout(() => {
          setIsHidden(true)
        }, 4000)
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch (err) {
      console.error("Newsletter signup error:", err)
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isHidden) {
    return null
  }

  return (
    <>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative max-w-md w-full mx-4"
            >
              <Card className="border-2 border-red-500/30 bg-black/95 backdrop-blur-md shadow-2xl shadow-red-500/20">
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-red-500" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-black text-white font-orbitron mb-4 tracking-wider"
                  >
                    WELCOME TO THE SWARM!
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 mb-6 font-sans"
                  >
                    Thank you for signing up! Check your email for your <span className="text-red-400 font-bold">$20 welcome credits</span> and next steps to get started.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center space-x-2 text-sm text-gray-400"
                  >
                    <Mail className="w-4 h-4 text-red-500" />
                    <span>Check your email for confirmation</span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="border-2 border-red-500/30 bg-black/50 backdrop-blur-sm shadow-xl shadow-red-500/10">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-red-400 font-orbitron tracking-wider">
                  FIRST NAME
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/50 border-2 border-red-500/30 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none font-sans h-12"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-red-400 font-orbitron tracking-wider">
                  LAST NAME
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/50 border-2 border-red-500/30 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none font-sans h-12"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-red-400 font-orbitron tracking-wider">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-black/50 border-2 border-red-500/30 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none font-sans h-12"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-red-400 text-sm text-center font-sans">{error}</p>
              </motion.div>
            )}
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 border-2 border-red-500/50 hover:border-red-400/70 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] font-orbitron text-lg px-8 py-6 h-14"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  SIGN UP & GET $20 CREDITS
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center font-sans">
              By signing up, you agree to receive updates about Swarms AI, including technical guides, blog posts, and product announcements. 
              You can unsubscribe at any time.
            </p>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

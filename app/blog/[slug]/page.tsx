"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { CardWrapper } from "@/components/card-wrapper"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { 
  Calendar, Clock, ArrowLeft, User, Tag, Eye, 
  Share2, Heart, BookOpen, ExternalLink, Github,
  Twitter, Linkedin, Facebook, Copy, Check, ArrowRight,
  Mail
} from "lucide-react"
import { format, parseISO } from "date-fns"
import { notFound } from "next/navigation"
import type { BlogPost } from "@/lib/blog"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState("")
  const [subscriptionError, setSubscriptionError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetch(`/api/blog/${params.slug}`)
        if (postResponse.ok) {
          const post = await postResponse.json()
          setPost(post)
          
          const allPostsResponse = await fetch('/api/blog')
          if (allPostsResponse.ok) {
            const allPosts = await allPostsResponse.json()
            const related = allPosts
              .filter((p: BlogPost) => p.slug !== params.slug)
              .slice(0, 3)
            setRelatedPosts(related)
          }
        } else {
          console.error('Failed to fetch blog post')
          setPost(null)
        }
      } catch (error) {
        console.error('Error fetching blog data:', error)
        setPost(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Check if user is already subscribed
    const isSubscribed = localStorage.getItem('isSubscribed')
    if (isSubscribed) {
      setSubscriptionMessage("You're already subscribed to our newsletter!")
    }
  }, [params.slug])

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post?.title,
        text: post?.description,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    setSubscriptionError("")
    setSubscriptionMessage("")

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubscriptionMessage(data.message)
        localStorage.setItem('isSubscribed', 'true')
        setEmail("")
        setFirstName("")
        setLastName("")
      } else {
        setSubscriptionError(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setSubscriptionError("An error occurred. Please try again later.")
    } finally {
      setIsSubscribing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500 font-orbitron text-xl">LOADING ARTICLE...</div>
        </div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
        <AnimatedBackground particleColor="rgba(239, 68, 68, 0.3)" className="opacity-30" />

        <div className="container max-w-[1600px] relative px-3 sm:px-6 py-12 sm:py-16 md:py-24 overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto min-w-0">
            {/* Back Button */}
            <div className="mb-8">
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron tracking-wider"
                asChild
              >
                <a href="/blog" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>BACK TO BLOG</span>
                </a>
              </Button>
            </div>

            {/* Article Header */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-orbitron text-red-400 tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white font-orbitron tracking-tighter leading-tight break-words">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-sans leading-relaxed max-w-4xl break-words">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 font-sans text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-red-500" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span>{format(parseISO(post.date), "MMMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-red-500" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLiked(!liked)}
                  className={`border-red-500/30 transition-all duration-300 font-orbitron tracking-wider ${
                    liked 
                      ? "bg-red-500/20 border-red-500 text-red-400" 
                      : "text-red-400 hover:bg-red-500/10 hover:border-red-500"
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                  <span>{liked ? "LIKED" : "LIKE"}</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron tracking-wider"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 mr-2" />
                      <span>SHARE</span>
                    </>
                  )}
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
                    asChild
                  >
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
                    asChild
                  >
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container max-w-[1600px] px-4 sm:px-6 py-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm relative overflow-hidden">
            <CardContent className="relative z-10 p-8 md:p-12">
              <div className="prose prose-invert prose-red max-w-none prose-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-4xl md:text-5xl font-black text-white font-orbitron tracking-tighter mb-8 mt-12 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-3xl md:text-4xl font-black text-white font-orbitron tracking-tighter mb-6 mt-10">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl md:text-3xl font-bold text-white font-orbitron tracking-tighter mb-4 mt-8">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-xl md:text-2xl font-bold text-white font-orbitron tracking-tighter mb-3 mt-6">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 leading-relaxed mb-6 font-sans text-lg">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-gray-300 mb-6 space-y-3 font-sans text-lg">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-3 font-sans text-lg">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300 font-sans text-lg">
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-red-500 pl-6 py-4 my-8 bg-red-500/10 rounded-r-lg">
                        <div className="text-gray-300 italic font-sans text-lg">
                          {children}
                        </div>
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className
                      if (isInline) {
                        return (
                          <code className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-base font-mono">
                            {children}
                          </code>
                        )
                      }
                      return (
                        <code className="block bg-gray-900 text-gray-300 p-6 rounded-lg overflow-x-auto text-base font-mono border border-red-500/20">
                          {children}
                        </code>
                      )
                    },
                    pre: ({ children }) => (
                      <pre className="bg-gray-900 p-6 rounded-lg overflow-x-auto text-base font-mono border border-red-500/20 mb-8">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-8">
                        <table className="min-w-full border border-red-500/20 rounded-lg">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-red-500/20 px-6 py-3 text-left text-red-400 font-orbitron tracking-wider bg-red-500/5">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-red-500/20 px-6 py-3 text-gray-300 font-sans">
                        {children}
                      </td>
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        className="text-red-400 hover:text-red-300 underline transition-colors duration-300 font-sans"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-bold font-sans">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-gray-300 italic font-sans">
                        {children}
                      </em>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="container max-w-[1600px] px-4 sm:px-6 py-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm relative overflow-hidden">
            <CardContent className="relative z-10 p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-white font-orbitron tracking-tighter mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                    SUBSCRIBE TO OUR NEWSLETTER
                  </span>
                </h2>
                <p className="text-gray-300 text-lg font-sans">
                  Stay updated with our latest insights and developments in multi-agent AI systems
                </p>
              </div>

              {subscriptionMessage ? (
                <div className="text-center text-green-400 font-orbitron mb-6">
                  {subscriptionMessage}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none font-sans"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border-2 border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none font-sans"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500" />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-black/50 border-2 border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none font-sans"
                    />
                  </div>
                  {subscriptionError && (
                    <div className="text-red-400 text-sm font-sans">
                      {subscriptionError}
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-orbitron tracking-wider py-6 text-lg transition-colors duration-300"
                  >
                    {isSubscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Articles */}
      <div className="container max-w-[1600px] px-4 sm:px-6 py-16 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white font-orbitron tracking-tighter mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
              RELATED ARTICLES
            </span>
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.slug}
                className="group"
              >
                <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-400 font-sans">
                          {format(parseISO(relatedPost.date), "MMM dd, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-400 font-sans">{relatedPost.readTime}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl text-white font-black mb-4 tracking-wider font-orbitron group-hover:text-red-400 transition-colors duration-300">
                      {relatedPost.title}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-300 leading-relaxed text-sm font-sans mb-6">
                      {relatedPost.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-400 font-sans">{relatedPost.author}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-orbitron text-red-400 tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron tracking-wider"
                      asChild
                    >
                      <a href={`/blog/${relatedPost.slug}`} className="flex items-center justify-center space-x-2">
                        <span>READ MORE</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
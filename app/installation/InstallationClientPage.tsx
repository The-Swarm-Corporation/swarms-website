"use client"

import { useState } from "react"
import { Copy, Check, Terminal, Package, Download, Github, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function InstallationClientPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = async (text: string, commandId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCommand(commandId)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const CodeBlock = ({
    command,
    commandId,
    description,
  }: {
    command: string
    commandId: string
    description?: string
  }) => (
    <div className="relative group overflow-hidden">
      <div className="bg-black border border-red-500/20 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
        <div className="flex items-center justify-between gap-2 min-w-0">
          <code className="text-green-400 break-all min-w-0">{command}</code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(command, commandId)}
            className="flex-shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-500/10 min-h-[36px] min-w-[36px] touch-manipulation"
          >
            {copiedCommand === commandId ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {description && <p className="text-xs sm:text-sm text-gray-400 mt-2 break-words">{description}</p>}
    </div>
  )

  const requirements = [
    "Python 3.8 or higher",
    "pip (Python package installer)",
    "Git (for source installation)",
    "Virtual environment (recommended)",
  ]

  const installationMethods = [
    {
      id: "pip",
      title: "pip",
      description: "Standard Python package installer",
      icon: Package,
      recommended: false,
      command: "pip install swarms",
    },
    {
      id: "uv",
      title: "uv",
      description: "Ultra-fast Python package installer",
      icon: Terminal,
      recommended: true,
      command: "uv pip install swarms",
    },
    {
      id: "conda",
      title: "conda",
      description: "Cross-platform package manager",
      icon: Package,
      recommended: false,
      command: "conda install -c conda-forge swarms",
    },
    {
      id: "source",
      title: "From Source",
      description: "Latest development version",
      icon: Github,
      recommended: false,
      command: "git clone https://github.com/kyegomez/swarms.git",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-gradient-to-br from-red-950/20 via-black to-black">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
        <div className="container mx-auto max-w-4xl relative px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <Badge variant="outline" className="mb-3 sm:mb-4 border-red-500/30 text-red-500 text-xs sm:text-sm">
              <Download className="w-3 h-3 mr-1 flex-shrink-0" />
              Installation Guide
            </Badge>
            <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-white to-red-500 bg-clip-text text-transparent text-white break-words">
              Install Swarms
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto break-words px-1">
              Get started with the Swarms framework in minutes. Choose your preferred installation method and start
              building multi-agent AI systems.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-10 sm:py-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white break-words">Quick Start</h2>
            <p className="text-sm sm:text-base text-gray-400 break-words">The fastest way to get Swarms up and running</p>
          </div>

          <Card className="mb-8 bg-black/40 border-red-900/30 hover:border-red-500/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-red-500" />
                <CardTitle className="text-red-500">Recommended: uv</CardTitle>
                <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                  Fastest
                </Badge>
              </div>
              <CardDescription className="text-gray-300">
                Ultra-fast Python package installer - up to 10x faster than pip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2 text-white">1. Install uv (if not already installed):</p>
                <CodeBlock command="curl -LsSf https://astral.sh/uv/install.sh | sh" commandId="install-uv" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-white">2. Install Swarms:</p>
                <CodeBlock command="uv pip install swarms" commandId="uv-install-swarms" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-white">3. Verify installation:</p>
                <CodeBlock
                  command="python -c 'import swarms; print(swarms.__version__)'"
                  commandId="verify-installation"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Installation Methods */}
      <section className="py-10 sm:py-16 px-3 sm:px-4 bg-gradient-to-r from-red-950/10 via-transparent to-red-950/10">
        <div className="container mx-auto max-w-4xl px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white break-words">Installation Methods</h2>
            <p className="text-sm sm:text-base text-gray-400 break-words px-1">Choose the installation method that works best for your environment</p>
          </div>

          <Tabs defaultValue="pip" className="w-full overflow-x-hidden">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-0 mb-6 sm:mb-8 p-1">
              {installationMethods.map((method) => (
<TabsTrigger
                key={method.id}
                value={method.id}
                className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 flex-shrink-0 min-h-[44px] sm:min-h-0"
              >
                <method.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{method.title}</span>
                  {method.recommended && (
                    <Badge variant="secondary" className="ml-1 text-xs bg-red-500/20 text-red-400">
                      Recommended
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="pip" className="space-y-6">
              <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Package className="h-5 w-5" />
                    Install with pip
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Standard Python package installer - works on all platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Basic installation:</p>
                    <CodeBlock command="pip install swarms" commandId="pip-basic" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">With specific version:</p>
                    <CodeBlock command="pip install swarms==5.1.0" commandId="pip-version" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Upgrade to latest:</p>
                    <CodeBlock command="pip install --upgrade swarms" commandId="pip-upgrade" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="uv" className="space-y-6">
              <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Terminal className="h-5 w-5 text-red-500" />
                    Install with uv
                    <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                      Recommended
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Ultra-fast Python package installer written in Rust - significantly faster than pip
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      uv is 10-100x faster than pip and provides better dependency resolution
                    </AlertDescription>
                  </Alert>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Install uv first:</p>
                    <CodeBlock
                      command="curl -LsSf https://astral.sh/uv/install.sh | sh"
                      commandId="uv-install"
                      description="On Windows, use: powershell -c 'irm https://astral.sh/uv/install.ps1 | iex'"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Install Swarms:</p>
                    <CodeBlock command="uv pip install swarms" commandId="uv-swarms" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Create and use virtual environment:</p>
                    <CodeBlock command="uv venv && uv pip install swarms" commandId="uv-venv" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conda" className="space-y-6">
              <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Package className="h-5 w-5" />
                    Install with conda
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Cross-platform package manager - great for data science environments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Conda installation may not always have the latest version. Use pip within conda for the most
                      recent release.
                    </AlertDescription>
                  </Alert>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">From conda-forge:</p>
                    <CodeBlock command="conda install -c conda-forge swarms" commandId="conda-forge" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Or use pip within conda:</p>
                    <CodeBlock
                      command="conda create -n swarms python=3.11 && conda activate swarms && pip install swarms"
                      commandId="conda-pip"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="source" className="space-y-6">
              <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Github className="h-5 w-5" />
                    Install from Source
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Get the latest development version with cutting-edge features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Development version may be unstable. Use for testing new features or contributing to the project.
                    </AlertDescription>
                  </Alert>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Clone the repository:</p>
                    <CodeBlock command="git clone https://github.com/kyegomez/swarms.git" commandId="git-clone" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Navigate and install:</p>
                    <CodeBlock command="cd swarms && pip install -e ." commandId="install-editable" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-white">Install development dependencies:</p>
                    <CodeBlock command="pip install -e .[dev]" commandId="install-dev" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-10 sm:py-16 px-3 sm:px-4">
        <div className="container mx-auto max-w-4xl px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  System Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Terminal className="h-5 w-5 text-blue-500" />
                  Verify Installation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-white">Check version:</p>
                  <CodeBlock command="python -c 'import swarms; print(swarms.__version__)'" commandId="check-version" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-white">Run a simple test:</p>
                  <CodeBlock
                    command="python -c &apos;from swarms import Agent; print(&quot;Swarms installed successfully!&quot;)&apos;"
                    commandId="simple-test"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-950/10 via-transparent to-red-950/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Next Steps</h2>
            <p className="text-gray-400">Now that you have Swarms installed, here's what you can do next</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow bg-black/40 border-red-900/30 hover:border-red-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ExternalLink className="h-5 w-5 text-blue-500" />
                  Quick Start Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">Learn the basics and create your first agent in minutes</p>
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href="https://docs.swarms.world/en/latest/swarms/install/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Guide
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-black/40 border-red-900/30 hover:border-red-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Package className="h-5 w-5 text-green-500" />
                  Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">Explore practical examples and use cases</p>
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href="https://github.com/kyegomez/swarms/tree/master/examples"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse Examples
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-black/40 border-red-900/30 hover:border-red-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Github className="h-5 w-5 text-purple-500" />
                  API Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">Comprehensive API documentation and reference</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    Read Docs
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Troubleshooting</h2>
            <p className="text-gray-400">Common issues and their solutions</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Permission Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-2">
                  If you encounter permission errors, try installing in user space:
                </p>
                <CodeBlock command="pip install --user swarms" commandId="user-install" />
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Virtual Environment Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-2">Create a fresh virtual environment:</p>
                <CodeBlock
                  command="python -m venv swarms-env && source swarms-env/bin/activate && pip install swarms"
                  commandId="venv-fresh"
                />
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-red-900/30 hover:border-red-500/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Dependency Conflicts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-2">Use uv for better dependency resolution:</p>
                <CodeBlock command="uv pip install swarms --resolution=highest" commandId="uv-resolution" />
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still having issues? Get help from our community</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/kyegomez/swarms/issues" target="_blank" rel="noopener noreferrer">
                  Report Issue
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

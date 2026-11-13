import { ArrowUpRight, Github, Package, Terminal } from "lucide-react"

// Page content shared by the server page (which highlights every command)
// and the client page (which lays it out).
export const requirements = [
  "Python 3.8 or higher",
  "pip (Python package installer)",
  "Git (for source installation)",
  "Virtual environment (recommended)",
]

export const quickStart = [
  {
    label: "Install uv (if not already installed)",
    command: "curl -LsSf https://astral.sh/uv/install.sh | sh",
    file: "install.sh",
    commandId: "install-uv",
  },
  {
    label: "Install Swarms",
    command: "uv pip install swarms",
    file: "shell",
    commandId: "uv-install-swarms",
  },
  {
    label: "Verify installation",
    command: "python -c 'import swarms; print(swarms.__version__)'",
    file: "shell",
    commandId: "verify-installation",
  },
]

export const installationMethods = [
  {
    id: "pip",
    title: "pip",
    icon: Package,
    recommended: false,
  },
  {
    id: "uv",
    title: "uv",
    icon: Terminal,
    recommended: true,
  },
  {
    id: "conda",
    title: "conda",
    icon: Package,
    recommended: false,
  },
  {
    id: "source",
    title: "From Source",
    icon: Github,
    recommended: false,
  },
]

export type Step = { label: string; command: string; description?: string }
export type NoteType = "success" | "warning"

export const tabsData: Record<
  string,
  {
    icon: typeof Package
    title: string
    description: string
    note?: { type: NoteType; text: string }
    steps: Step[]
  }
> = {
  pip: {
    icon: Package,
    title: "Install with pip",
    description: "Standard Python package installer — works on all platforms.",
    steps: [
      { label: "Basic installation", command: "pip install swarms" },
      { label: "With specific version", command: "pip install swarms==5.1.0" },
      { label: "Upgrade to latest", command: "pip install --upgrade swarms" },
    ],
  },
  uv: {
    icon: Terminal,
    title: "Install with uv",
    description:
      "Ultra-fast Python package installer written in Rust — significantly faster than pip.",
    note: {
      type: "success",
      text: "uv is 10-100x faster than pip and provides better dependency resolution.",
    },
    steps: [
      {
        label: "Install uv first",
        command: "curl -LsSf https://astral.sh/uv/install.sh | sh",
        description: "On Windows, use: powershell -c 'irm https://astral.sh/uv/install.ps1 | iex'",
      },
      { label: "Install Swarms", command: "uv pip install swarms" },
      { label: "Create and use virtual environment", command: "uv venv && uv pip install swarms" },
    ],
  },
  conda: {
    icon: Package,
    title: "Install with conda",
    description: "Cross-platform package manager — great for data science environments.",
    note: {
      type: "warning",
      text: "Conda installation may not always have the latest version. Use pip within conda for the most recent release.",
    },
    steps: [
      { label: "From conda-forge", command: "conda install -c conda-forge swarms" },
      {
        label: "Or use pip within conda",
        command: "conda create -n swarms python=3.11 && conda activate swarms && pip install swarms",
      },
    ],
  },
  source: {
    icon: Github,
    title: "Install from Source",
    description: "Get the latest development version with cutting-edge features.",
    note: {
      type: "warning",
      text: "Development version may be unstable. Use for testing new features or contributing to the project.",
    },
    steps: [
      { label: "Clone the repository", command: "git clone https://github.com/kyegomez/swarms.git" },
      { label: "Navigate and install", command: "cd swarms && pip install -e ." },
      { label: "Install development dependencies", command: "pip install -e .[dev]" },
    ],
  },
}

export const verification = [
  {
    label: "Check version:",
    command: "python -c 'import swarms; print(swarms.__version__)'",
    commandId: "check-version",
  },
  {
    label: "Run a simple test:",
    command: `python -c 'from swarms import Agent; print("Swarms installed successfully!")'`,
    commandId: "simple-test",
  },
]

export const nextSteps = [
  {
    icon: ArrowUpRight,
    title: "Quick Start Guide",
    description: "Learn the basics and create your first agent in minutes.",
    label: "View Guide",
    href: "https://docs.swarms.world/installation",
  },
  {
    icon: Package,
    title: "Examples",
    description: "Explore practical examples and use cases.",
    label: "Browse Examples",
    href: "https://github.com/kyegomez/swarms/tree/master/examples",
  },
  {
    icon: Github,
    title: "API Reference",
    description: "Comprehensive API documentation and reference.",
    label: "Read Docs",
    href: "https://docs.swarms.world",
  },
]

export const troubleshooting = [
  {
    title: "Permission Errors",
    description: "If you encounter permission errors, try installing in user space:",
    command: "pip install --user swarms",
  },
  {
    title: "Virtual Environment Issues",
    description: "Create a fresh virtual environment:",
    command: "python -m venv swarms-env && source swarms-env/bin/activate && pip install swarms",
  },
  {
    title: "Dependency Conflicts",
    description: "Use uv for better dependency resolution:",
    command: "uv pip install swarms --resolution=highest",
  },
]

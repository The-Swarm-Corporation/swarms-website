import { ArrowUpRight, Github, Package, Terminal } from "lucide-react"

// Page content shared by the server page (which highlights every command)
// and the client page (which lays it out).
export const requirements = [
  "Python 3.8 或更高版本",
  "pip（Python 包管理器）",
  "Git（用于源码安装）",
  "虚拟环境（推荐）",
]

export const quickStart = [
  {
    label: "安装 uv（如果尚未安装）",
    command: "curl -LsSf https://astral.sh/uv/install.sh | sh",
    file: "install.sh",
    commandId: "install-uv",
  },
  {
    label: "安装 Swarms",
    command: "uv pip install swarms",
    file: "shell",
    commandId: "uv-install-swarms",
  },
  {
    label: "验证安装",
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
    title: "从源码安装",
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
    title: "使用 pip 安装",
    description: "标准 Python 包管理器 —— 适用于所有平台。",
    steps: [
      { label: "基础安装", command: "pip install swarms" },
      { label: "安装指定版本", command: "pip install swarms==5.1.0" },
      { label: "升级到最新版本", command: "pip install --upgrade swarms" },
    ],
  },
  uv: {
    icon: Terminal,
    title: "使用 uv 安装",
    description:
      "使用 Rust 编写的超快 Python 包管理器 —— 速度远超 pip。",
    note: {
      type: "success",
      text: "uv 比 pip 快 10 到 100 倍，并提供更优秀的依赖解析能力。",
    },
    steps: [
      {
        label: "先安装 uv",
        command: "curl -LsSf https://astral.sh/uv/install.sh | sh",
        description: "在 Windows 上，请使用：powershell -c 'irm https://astral.sh/uv/install.ps1 | iex'",
      },
      { label: "安装 Swarms", command: "uv pip install swarms" },
      { label: "创建并使用虚拟环境", command: "uv venv && uv pip install swarms" },
    ],
  },
  conda: {
    icon: Package,
    title: "使用 conda 安装",
    description: "跨平台包管理器 —— 非常适合数据科学环境。",
    note: {
      type: "warning",
      text: "Conda 安装的版本可能不是最新的。如需获取最新版本，请在 conda 环境中使用 pip 安装。",
    },
    steps: [
      { label: "通过 conda-forge 安装", command: "conda install -c conda-forge swarms" },
      {
        label: "或在 conda 中使用 pip",
        command: "conda create -n swarms python=3.11 && conda activate swarms && pip install swarms",
      },
    ],
  },
  source: {
    icon: Github,
    title: "从源码安装",
    description: "获取包含最新特性的开发版本。",
    note: {
      type: "warning",
      text: "开发版本可能不稳定，适用于测试新特性或为项目贡献代码。",
    },
    steps: [
      { label: "克隆仓库", command: "git clone https://github.com/kyegomez/swarms.git" },
      { label: "进入目录并安装", command: "cd swarms && pip install -e ." },
      { label: "安装开发依赖", command: "pip install -e .[dev]" },
    ],
  },
}

export const verification = [
  {
    label: "检查版本：",
    command: "python -c 'import swarms; print(swarms.__version__)'",
    commandId: "check-version",
  },
  {
    label: "运行简单测试：",
    command: `python -c 'from swarms import Agent; print("Swarms installed successfully!")'`,
    commandId: "simple-test",
  },
]

export const nextSteps = [
  {
    icon: ArrowUpRight,
    title: "快速入门指南",
    description: "几分钟内学习基础知识，创建你的第一个智能体。",
    label: "查看指南",
    href: "https://docs.swarms.world/installation",
  },
  {
    icon: Package,
    title: "示例",
    description: "探索实用示例与应用场景。",
    label: "浏览示例",
    href: "https://github.com/kyegomez/swarms/tree/master/examples",
  },
  {
    icon: Github,
    title: "API 参考",
    description: "全面的 API 文档与参考资料。",
    label: "阅读文档",
    href: "https://docs.swarms.world",
  },
]

export const troubleshooting = [
  {
    title: "权限错误",
    description: "如果遇到权限错误，请尝试在用户空间中安装：",
    command: "pip install --user swarms",
  },
  {
    title: "虚拟环境问题",
    description: "创建一个全新的虚拟环境：",
    command: "python -m venv swarms-env && source swarms-env/bin/activate && pip install swarms",
  },
  {
    title: "依赖冲突",
    description: "使用 uv 获得更好的依赖解析：",
    command: "uv pip install swarms --resolution=highest",
  },
]

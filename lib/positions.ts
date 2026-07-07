import { 
  Brain, 
  Code, 
  Target, 
  GraduationCap, 
  Rocket, 
  Users,
  TrendingUp,
  Megaphone,
  Search,
  Terminal,
  Server,
  BookUser,
  Handshake,
  LucideIcon
} from 'lucide-react'

export interface Position {
  slug: string
  title: string
  icon: LucideIcon
  department: 'Engineering' | 'Finance' | 'Executive' | 'Marketing' | 'Internship' | 'Research' | 'Business Development'
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  location: string
  priority: 'Critical' | 'High' | 'Medium'
  description: string
  requirements: string[]
  aboutRole: string
  whatYoullDo: string[]
  youMayBeAFitIf: string[]
}

export const positions: Position[] = [
  {
    slug: 'agent-engineer',
    title: 'Agent Engineer',
    icon: Brain,
    department: 'Engineering',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Build and optimize autonomous agents, implement advanced coordination protocols, and scale multi-agent systems.',
    requirements: ['Strong Python/TypeScript', 'Distributed systems', 'ML/AI experience'],
    aboutRole: 'As an Agent Engineer at Swarms, you will design, build, and optimize autonomous agents that collaborate to solve complex problems. You will work on cutting-edge multi-agent systems, implementing advanced coordination protocols and scaling our infrastructure to power the agent economy.',
    whatYoullDo: [
      'Design and implement autonomous agent architectures and coordination protocols',
      'Build scalable multi-agent systems that can simulate entire industries',
      'Optimize agent performance, reliability, and fault tolerance',
      'Collaborate with research teams to translate findings into production systems',
      'Develop tools and frameworks for agent lifecycle management'
    ],
    youMayBeAFitIf: [
      'You have 3+ years of experience in distributed systems or multi-agent architectures',
      'You have strong Python/TypeScript skills and experience with async programming',
      'You have experience with ML/AI frameworks and agent orchestration tools',
      'You are passionate about building infrastructure for the agent economy',
      'You have a track record of shipping complex systems at scale'
    ]
  },
  {
    slug: 'front-end-engineer',
    title: 'Front-end Engineer',
    icon: Code,
    department: 'Engineering',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Build beautiful, intuitive interfaces for agent dashboards and monitoring systems.',
    requirements: ['React/Next.js', 'TypeScript', 'UI/UX experience'],
    aboutRole: 'As a Front-end Engineer at Swarms, you will build the interfaces that allow users to interact with, monitor, and manage autonomous agent systems. You will create intuitive dashboards and monitoring tools that make complex agent workflows accessible and actionable.',
    whatYoullDo: [
      'Build responsive, performant web interfaces for agent management dashboards',
      'Design and implement real-time monitoring and visualization systems',
      'Create intuitive UX for complex agent workflows and orchestration',
      'Collaborate with product and design to ship delightful user experiences',
      'Optimize frontend performance for real-time data and agent state updates'
    ],
    youMayBeAFitIf: [
      'You have 3+ years of experience with React/Next.js and TypeScript',
      'You have strong UI/UX sensibilities and experience with design systems',
      'You have experience with real-time data visualization or dashboards',
      'You are passionate about making complex systems accessible',
      'You have a portfolio of polished, production web applications'
    ]
  },
  {
    slug: 'finance',
    title: 'Finance',
    icon: Target,
    department: 'Finance',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'High',
    description: 'Manage financial operations, budgeting, and strategic planning for a fast-growing AI company.',
    requirements: ['Financial modeling', 'Strategic planning', 'Tech industry experience'],
    aboutRole: 'As a Finance team member at Swarms, you will manage financial operations, budgeting, and strategic planning for our fast-growing AI company. You will play a critical role in scaling our financial infrastructure to support the expansion of the agent economy.',
    whatYoullDo: [
      'Manage financial planning, budgeting, and forecasting processes',
      'Build financial models to support strategic decision-making',
      'Track and analyze key business metrics and financial performance',
      'Support fundraising efforts with financial data and projections',
      'Develop and maintain financial controls and reporting systems'
    ],
    youMayBeAFitIf: [
      'You have 3+ years of finance experience, preferably in tech or AI',
      'You have strong financial modeling and analytical skills',
      'You have experience with SaaS metrics and unit economics',
      'You are detail-oriented with excellent organizational skills',
      'You are passionate about the future of AI and the agent economy'
    ]
  },
  {
    slug: 'accounting-intern',
    title: 'Accounting Intern',
    icon: GraduationCap,
    department: 'Internship',
    type: 'Internship',
    location: 'Bay Area',
    priority: 'Medium',
    description: 'Support accounting operations and learn financial systems at a cutting-edge AI company.',
    requirements: ['Accounting background', 'Attention to detail', 'Eagerness to learn'],
    aboutRole: 'As an Accounting Intern at Swarms, you will support accounting operations and gain hands-on experience with financial systems at a cutting-edge AI company. This is an excellent opportunity to learn about finance in a fast-paced tech environment.',
    whatYoullDo: [
      'Assist with accounts payable and receivable processes',
      'Help maintain accurate financial records and reconciliations',
      'Support month-end and quarter-end close processes',
      'Assist with preparation of financial statements and reports',
      'Learn and contribute to improving financial workflows'
    ],
    youMayBeAFitIf: [
      'You are pursuing or recently completed a degree in Accounting or Finance',
      'You have strong attention to detail and organizational skills',
      'You are eager to learn and grow in a fast-paced environment',
      'You have proficiency with spreadsheets and accounting software',
      'You are passionate about technology and AI'
    ]
  },
  {
    slug: 'growth-engineer',
    title: 'Growth Engineer',
    icon: TrendingUp,
    department: 'Engineering',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Drive user acquisition and engagement through data-driven growth strategies and technical implementation.',
    requirements: ['Growth marketing experience', 'Full-stack development', 'Data analysis'],
    aboutRole: 'As a Growth Engineer at Swarms, you will drive user acquisition and engagement through data-driven growth strategies. You will combine engineering expertise with growth marketing to scale our reach in the agent economy.',
    whatYoullDo: [
      'Design and implement growth experiments across acquisition, activation, and retention',
      'Build and optimize landing pages, signup flows, and onboarding experiences',
      'Analyze user behavior data to identify growth opportunities',
      'Collaborate with marketing on campaign technical implementation',
      'Build attribution and tracking systems for growth measurement'
    ],
    youMayBeAFitIf: [
      'You have 3+ years of experience in growth engineering or full-stack development',
      'You have experience with A/B testing and experimentation frameworks',
      'You have strong analytical skills and experience with growth metrics',
      'You are creative and data-driven in problem-solving',
      'You are passionate about AI and the agent economy'
    ]
  },
  {
    slug: 'growth-marketers',
    title: 'Growth Marketer',
    icon: Megaphone,
    department: 'Marketing',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Lead growth marketing initiatives to establish Swarms as the premier AI agent platform globally.',
    requirements: ['Growth marketing', 'AI/tech industry', 'Brand building'],
    aboutRole: 'As a Growth Marketer at Swarms, you will lead marketing initiatives to drive awareness, acquisition, and engagement for our AI agent platform. You will help establish Swarms as the premier platform for the agent economy.',
    whatYoullDo: [
      'Develop and execute growth marketing strategies across channels',
      'Manage paid acquisition campaigns and optimize for ROI',
      'Build and nurture developer community and influencer relationships',
      'Create compelling content for developer audiences',
      'Analyze and report on marketing performance and growth metrics'
    ],
    youMayBeAFitIf: [
      'You have 3+ years of growth or performance marketing experience',
      'You have experience marketing developer tools or AI products',
      'You have strong analytical skills and data-driven approach',
      'You are creative and can develop innovative marketing campaigns',
      'You are passionate about AI and the future of software development'
    ]
  },
  {
    slug: 'head-of-marketplace-growth',
    title: 'Head of Marketplace Growth',
    icon: Handshake,
    department: 'Business Development',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Own business development for the Swarms marketplace — reaching out to new and existing users to drive adoption, retention, and revenue.',
    requirements: ['Business development', 'Sales / partnerships', 'AI/tech industry'],
    aboutRole: 'As Head of Marketplace Growth at Swarms, you will own business development for our marketplace. You will proactively reach out to new and existing users, build relationships, and drive adoption of agents and tools across the platform. You will be the connective tissue between our users and our product, turning interest into lasting engagement and revenue as we scale the agent economy.',
    whatYoullDo: [
      'Reach out to new and existing marketplace users to drive adoption and retention',
      'Build and own the business development pipeline for the Swarms marketplace',
      'Develop partnerships with agent builders, buyers, and enterprise customers',
      'Gather user feedback and partner with product to improve the marketplace experience',
      'Define and hit growth, activation, and revenue targets for the marketplace'
    ],
    youMayBeAFitIf: [
      'You have 5+ years of business development, partnerships, or sales experience',
      'You have a track record of growing marketplaces, platforms, or developer ecosystems',
      'You are a strong communicator who loves talking to users and closing deals',
      'You are data-driven and comfortable owning growth and revenue targets',
      'You are passionate about AI and the future of the agent economy'
    ]
  },
  {
    slug: 'cmo',
    title: 'CMO (Chief Marketing Officer)',
    icon: Rocket,
    department: 'Executive',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Lead marketing strategy to establish Swarms as the premier AI agent platform globally.',
    requirements: ['Marketing leadership', 'AI/tech industry', 'Brand building'],
    aboutRole: 'As CMO at Swarms, you will lead all marketing efforts to establish Swarms as the premier AI agent platform globally. You will define and execute the marketing strategy to drive awareness, adoption, and growth in the agent economy.',
    whatYoullDo: [
      'Define and execute comprehensive marketing strategy for global growth',
      'Build and lead a high-performing marketing team',
      'Establish Swarms as the leading brand in the AI agent space',
      'Drive integrated marketing campaigns across digital, content, and events',
      'Partner with product and sales to accelerate market adoption'
    ],
    youMayBeAFitIf: [
      'You have 10+ years of marketing leadership experience, with 5+ years as CMO or equivalent',
      'You have a proven track record of building iconic tech brands',
      'You have deep understanding of AI and the future of software',
      'You are a visionary leader who can build and inspire teams',
      'You are passionate about transforming how software gets built with AI'
    ]
  },
  {
    slug: 'coo',
    title: 'COO (Chief Operating Officer)',
    icon: Users,
    department: 'Executive',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Oversee operations and help scale Swarms to power the agent economy worldwide.',
    requirements: ['Operations leadership', 'Scaling startups', 'AI/tech vision'],
    aboutRole: 'As COO at Swarms, you will oversee all operational aspects of the company and help scale Swarms to power the agent economy worldwide. You will ensure operational excellence while we grow rapidly.',
    whatYoullDo: [
      'Oversee all operational functions including engineering, product, and business operations',
      'Develop and execute operational strategy to support rapid growth',
      'Build and scale world-class teams and processes',
      'Optimize operations for efficiency, quality, and velocity',
      'Partner with CEO on company strategy and execution'
    ],
    youMayBeAFitIf: [
      'You have 10+ years of operational leadership experience, with 5+ years as COO or equivalent',
      'You have a proven track record of scaling startups through high growth phases',
      'You have deep understanding of AI technology and the agent economy',
      'You are a strategic thinker with exceptional execution skills',
      'You are passionate about building infrastructure for the agent economy'
    ]
  },
  {
    slug: 'senior-agent-researcher',
    title: 'Senior Agent Researcher',
    icon: Search,
    department: 'Research',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Lead groundbreaking research in autonomous agent development and multi-agent coordination systems.',
    requirements: ['PhD in CS/AI/ML', 'Published research', 'Multi-agent systems experience'],
    aboutRole: 'As a Senior Agent Researcher at Swarms, you will lead groundbreaking research in autonomous agent development and multi-agent coordination systems. You will push the boundaries of what\'s possible in AI agent research and bring your findings from theory to production.',
    whatYoullDo: [
      'Lead research initiatives in autonomous agent development and multi-agent systems',
      'Design and conduct experiments to advance agent capabilities and coordination',
      'Publish research findings and represent Swarms at top AI conferences',
      'Collaborate with engineering teams to translate research into production systems',
      'Mentor junior researchers and build a world-class research team'
    ],
    youMayBeAFitIf: [
      'You have a PhD in CS/AI/ML or equivalent research experience',
      'You have a strong publication record in top AI venues',
      'You have deep expertise in multi-agent systems or distributed AI',
      'You are passionate about advancing the state of the art in autonomous agents',
      'You can bridge the gap between research and practical applications'
    ]
  },
  {
    slug: 'rust-engineer',
    title: 'Rust Engineer',
    icon: Terminal,
    department: 'Engineering',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'High',
    description: 'Develop high-performance, memory-safe infrastructure for agent communication and coordination systems.',
    requirements: ['Expert Rust skills', 'Systems programming', 'Performance optimization'],
    aboutRole: 'As a Rust Engineer at Swarms, you will develop high-performance, memory-safe infrastructure for agent communication and coordination systems. You will build the foundational systems that power our multi-agent platform.',
    whatYoullDo: [
      'Design and implement core infrastructure components in Rust',
      'Build high-performance agent communication and coordination systems',
      'Optimize existing systems for maximum performance and reliability',
      'Develop tooling and frameworks for agent deployment and monitoring',
      'Collaborate with research teams to implement efficient production systems'
    ],
    youMayBeAFitIf: [
      'You have expert-level Rust skills and production experience',
      'You have experience with systems programming and performance optimization',
      'You understand memory management, concurrency, and distributed systems',
      'You are passionate about building robust, scalable infrastructure',
      'You have a track record of shipping high-performance production code'
    ]
  },
  {
    slug: 'devrel-lead',
    title: 'DevRel Lead',
    icon: BookUser,
    department: 'Engineering',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'Critical',
    description: 'Lead the development of DevReal platform - our revolutionary agent development and deployment infrastructure.',
    requirements: ['Full-stack expertise', 'Platform architecture', 'Team leadership'],
    aboutRole: 'As DevRel Lead at Swarms, you will lead the development of DevReal platform - our revolutionary agent development and deployment infrastructure. You will build tools and systems that make it easy for developers to create and deploy multi-agent applications.',
    whatYoullDo: [
      'Lead development of the DevReal platform for agent development and deployment',
      'Design and implement scalable platform architecture',
      'Build developer tools, SDKs, and documentation',
      'Lead and mentor a team of engineers',
      'Collaborate with research and product to define platform roadmap'
    ],
    youMayBeAFitIf: [
      'You have 5+ years of full-stack development experience',
      'You have experience building developer platforms or tools',
      'You have strong architectural skills and can design scalable systems',
      'You have led and mentored engineering teams',
      'You are passionate about developer experience and tooling'
    ]
  },
  {
    slug: 'infrastructure-engineer',
    title: 'Infrastructure Engineer',
    icon: Server,
    department: 'Engineering',
    type: 'Full-time',
    location: 'Palo Alto, CA',
    priority: 'High',
    description: 'Build and scale computational infrastructure powering multi-agent research and deployment.',
    requirements: ['Cloud infrastructure', 'Distributed systems', 'DevOps experience'],
    aboutRole: 'As an Infrastructure Engineer at Swarms, you will build and scale computational infrastructure powering multi-agent research and deployment. You will ensure our systems can handle the demands of running millions of agents.',
    whatYoullDo: [
      'Design and maintain cloud infrastructure for agent computation',
      'Build and scale distributed systems for agent coordination',
      'Implement monitoring, alerting, and incident response systems',
      'Optimize infrastructure costs and performance',
      'Collaborate with research to support computationally intensive workloads'
    ],
    youMayBeAFitIf: [
      'You have 3+ years of infrastructure or DevOps experience',
      'You have strong experience with cloud platforms (AWS, GCP, Azure)',
      'You have experience with distributed systems and container orchestration',
      'You are passionate about reliability and operational excellence',
      'You can balance between building new systems and maintaining existing ones'
    ]
  },
  {
    slug: 'research-intern',
    title: 'Research Intern',
    icon: GraduationCap,
    department: 'Internship',
    type: 'Internship',
    location: 'Bay Area',
    priority: 'Medium',
    description: 'Exceptional students working on ambitious multi-agent research with senior mentorship.',
    requirements: ['Strong academic record', 'Programming skills', 'Research interest'],
    aboutRole: 'As a Research Intern at Swarms, you will work on ambitious multi-agent research projects with senior mentorship. You will gain hands-on experience with cutting-edge AI research and contribute to publications.',
    whatYoullDo: [
      'Conduct research on multi-agent systems and autonomous AI',
      'Implement and evaluate research prototypes',
      'Collaborate with senior researchers on ongoing projects',
      'Contribute to research papers and publications',
      'Present findings to the research team'
    ],
    youMayBeAFitIf: [
      'You are pursuing or completed a degree in CS/AI/ML',
      'You have strong programming skills in Python or similar languages',
      'You have a genuine interest in AI research',
      'You are self-motivated and able to work independently',
      'You want to push the boundaries of what\'s possible in AI'
    ]
  }
]

export const departments = ['All', 'Engineering', 'Business Development', 'Finance', 'Marketing', 'Executive', 'Internship', 'Research'] as const
export type Department = typeof departments[number]

export function getPositionBySlug(slug: string): Position | undefined {
  return positions.find(p => p.slug === slug)
}

export function getPositionsByDepartment(department: Department): Position[] {
  if (department === 'All') return positions
  return positions.filter(p => p.department === department)
}

// Where applications go. Developer (Engineering) roles apply through the
// application form; every other role applies by emailing the team directly.
export const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd3f1c_WBVoBm5P_IHwxVFxeEFRy3RbiDslj91o5CTknsca5g/viewform?usp=sf_link'
export const APPLICATION_EMAIL = 'kye@swarms.world'

export function isDeveloperRole(position: Position): boolean {
  return position.department === 'Engineering'
}

export interface ApplyMethod {
  type: 'form' | 'email'
  href: string
}

export function getApplyMethod(position: Position): ApplyMethod {
  if (isDeveloperRole(position)) {
    return { type: 'form', href: GOOGLE_FORM_URL }
  }
  const subject = encodeURIComponent(`Application: ${position.title}`)
  return { type: 'email', href: `mailto:${APPLICATION_EMAIL}?subject=${subject}` }
}
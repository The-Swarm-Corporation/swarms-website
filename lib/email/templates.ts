import {
  EMAIL_ASSET_BASE_URL,
  type EmailLink,
  type EmailMessage,
  bulletList,
  escapeHtml,
  heading,
  image,
  link,
  panel,
  paragraph,
  renderEmail,
  renderText,
  rows,
  strong,
} from './layout';

const docs = 'https://docs.swarms.ai/docs';

const welcomeResources: (EmailLink & { description: string })[] = [
  {
    label: 'Quickstart Guide',
    href: `${docs}/documentation/getting-started/quickstart`,
    description: 'Get up and running quickly',
  },
  {
    label: 'API Key Setup',
    href: `${docs}/documentation/getting-started/api-key-setup`,
    description: 'Configure your authentication',
  },
  {
    label: 'Python Client',
    href: `${docs}/documentation/clients/python-client`,
    description: 'Client setup and basic usage',
  },
  {
    label: 'Client Setup Examples',
    href: `${docs}/examples/examples/client-setup`,
    description: 'Step-by-step implementation examples',
  },
  { label: 'API Reference', href: 'https://www.swarms.ai/api', description: 'Complete API documentation' },
  { label: 'View Documentation', href: 'https://docs.swarms.ai', description: 'The full Swarms documentation' },
];

const welcomeBuildItems: [string, string][] = [
  ['Multi-Agent Structures', 'Complex hierarchical, sequential, and parallel systems'],
  ['Production Deployments', 'Enterprise-grade reliability and scaling'],
  ['Agent Monitoring', 'Real-time observability and debugging tools'],
  ['Enterprise Automation', 'Transform your organization with intelligent automation'],
];

export function welcomeEmail(rawName: string): EmailMessage {
  // The name is caller-supplied, so it is escaped for the HTML part.
  const name = escapeHtml(rawName);
  const title = 'Welcome to Swarms AI!';
  const cta = { label: 'Create Your Account & Get Credits', href: 'https://swarms.world/signin/signup' };
  const reason = 'You received this email because you signed up for the Swarms AI newsletter.';

  const html = renderEmail({
    preheader: 'Your $5 free credits are waiting. Complete your account setup to claim them.',
    eyebrow: 'Newsletter',
    title,
    content: [
      paragraph('Thank you for joining the future of multi-agent systems.', { muted: true }),
      paragraph(`Hi ${name},`),
      paragraph('Thank you for signing up! Our mission at Swarms is to build the infrastructure necessary for the agent economy.'),
      paragraph(`You've just joined over ${strong('160,000+ developers')} who are leveraging the most advanced multi-agent framework to transform their organizations with autonomous AI systems.`),
      panel('Complete your account setup to claim your credits and start building immediately.', 'Your $5 Free Credits Are Waiting'),
    ].join(''),
    cta,
    afterCta: [
      heading('Get Started with These Resources:'),
      panel(rows(welcomeResources.map((resource) => `${link(resource)} - ${resource.description}`))),
      heading('What you can build with Swarms:'),
      bulletList(welcomeBuildItems.map(([item, description]) => `${strong(item)} - ${description}`)),
      paragraph(`Whether you're using our ${strong('Rust framework (Swarms-RS)')}, our battle-tested ${strong('Python framework')}, or our ultra-optimized ${strong('hosted API')} – we've got you covered.`),
      paragraph('Questions? Our community is here to help! Join us on our social channels or check out our comprehensive documentation.'),
      paragraph(`Best regards,<br>${strong('The Swarms AI Team')}`),
    ].join(''),
    reason,
    unsubscribe: true,
  });

  const text = renderText({
    title,
    body: `
Thank you for joining the future of multi-agent systems.

Hi ${rawName},

Thank you for signing up! Our mission at Swarms is to build the infrastructure necessary for the agent economy.

You've just joined over 160,000+ developers who are leveraging the most advanced multi-agent framework to transform their organizations with autonomous AI systems.

Your $5 Free Credits Are Waiting:
Complete your account setup to claim your credits and start building immediately.

${cta.label}: ${cta.href}

Get Started with These Resources:
${welcomeResources.map(({ label, href, description }) => `- ${label} (${description}): ${href}`).join('\n')}

What you can build with Swarms:
${welcomeBuildItems.map(([item, description]) => `- ${item}: ${description}`).join('\n')}

Whether you're using our Rust framework (Swarms-RS), our battle-tested Python framework, or our ultra-optimized hosted API – we've got you covered.

Questions? Our community is here to help! Join us on our social channels or check out our comprehensive documentation.

Best regards,
The Swarms AI Team`,
    reason,
    unsubscribe: true,
  });

  return { subject: 'Welcome to Swarms - Your $5 Credits Await!', html, text };
}

export function agentHQWaitlistEmail(): EmailMessage {
  const title = "You're on the AgentHQ waitlist";
  const cta = { label: 'Open AgentHQ', href: 'https://game.swarms.world' };
  const learnMore = { label: 'Learn more about AgentHQ', href: 'https://game.swarms.world/learn-more' };
  const announcement = { label: 'Read the announcement blog post', href: 'https://www.swarms.ai/blog/introducing-agenthq' };
  const reason = 'You received this email because you joined the AgentHQ waitlist.';
  const intro =
    'Thanks for joining. AgentHQ makes multi-agent orchestration fun, simple, and enjoyable: hire Claude and Codex agents, assign tasks in plain language, and watch them work in real time in an interactive office.';
  const free = "It's free right now, and you can start playing today.";
  const playNow = 'Sign in with your existing Swarms Marketplace account. No new signup needed.';
  const freeAccess = 'AgentHQ is free for the next few weeks, until we launch our business model. Play as much as you want in the meantime.';

  const html = renderEmail({
    preheader: "You're on the AgentHQ waitlist. It's free right now, and you can start playing today.",
    eyebrow: 'AgentHQ',
    title,
    content: [
      image(`${EMAIL_ASSET_BASE_URL}/agent_hq_banner.png`, 'AgentHQ'),
      paragraph(intro),
      paragraph(free),
      panel(`${strong('game.swarms.world')}<br>${playNow}`, 'Play now'),
      panel(freeAccess, 'Free access'),
    ].join(''),
    cta,
    afterCta: [paragraph([learnMore, announcement].map(({ label, href }) => link({ label: `${label} ›`, href })).join('<br>')), paragraph('The Swarms Team')].join(''),
    reason,
  });

  const text = renderText({
    title,
    body: `
${intro}

${free}

Play now: game.swarms.world
${playNow}

Free access: ${freeAccess}

${cta.label}: ${cta.href}

${learnMore.label}: ${learnMore.href}
${announcement.label}: ${announcement.href}

The Swarms Team`,
    reason,
  });

  return { subject: 'Welcome to AgentHQ: play now at game.swarms.world', html, text };
}

export function mobileWaitlistEmail(): EmailMessage {
  const title = "You're on the list!";
  const reason = 'You received this email because you signed up for the Swarms Mobile App waitlist.';
  const thanks = 'Thank you for joining the Swarms Mobile App waitlist!';
  const working =
    "We're working hard to bring you the best mobile experience for managing and deploying AI agents. You'll be among the first to know when the app is ready.";
  const expect = "We'll notify you as soon as the app is available for early access. Stay tuned for updates!";

  const html = renderEmail({
    preheader: "You're on the Swarms Mobile App waitlist. We'll notify you as soon as early access opens.",
    eyebrow: 'Mobile app',
    title,
    content: [paragraph(thanks), paragraph(working), panel(expect, 'What to Expect'), paragraph(`Best regards,<br>${strong('The Swarms Team')}`)].join(''),
    reason,
  });

  const text = renderText({
    title,
    body: `
${thanks}

${working}

What to Expect: ${expect}

Best regards,
The Swarms Team`,
    reason,
  });

  return { subject: "You're on the Swarms Mobile App Waitlist!", html, text };
}

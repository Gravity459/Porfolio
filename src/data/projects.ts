import type { Project } from "./types";

/**
 * Project content. Every fact here comes from the owner — no metrics,
 * clients or achievements are invented. Add a project by appending an object.
 * `layout` controls how it is presented in the showcase.
 */

/** Every client project ran with the same five-person setup. */
const TEAM = "Five-person team — frontend, backend (me), QA, PM and a lead engineer";

export const projects: Project[] = [
  {
    slug: "angel",
    index: "01",
    name: "Angel",
    tagline: "Therapy automation that turns session audio into approved summaries and multi-speaker podcast audio.",
    layout: "wide",
    role: "Backend engineer",
    status: "live",
    team: TEAM,
    overview:
      "Angel automates a therapist's post-session work. Session audio is transcribed, summarised by an LLM, reviewed and approved by the therapist, turned into a podcast script and voiced with multi-speaker TTS. It is live in production and has processed around 500 sessions, starting with one therapist.",
    outcomes: [
      "~500 therapy sessions processed in production",
      "4–5 hours of therapist work per session replaced by a 20–30 minute pipeline run",
      "GDPR-compliant, with data encrypted at rest and in transit",
    ],
    contribution: [
      "Built the FastAPI backend on MongoDB",
      "Speech-to-text with ElevenLabs Scribe v2",
      "Session summaries and podcast scripts generated with Claude Sonnet 4.6",
      "Therapist approval gate before any script is generated",
      "Multi-speaker TTS with ElevenLabs v3 Alpha",
      "S3 storage and PDF generation",
      "AWS deployment: Elastic Beanstalk, CloudFront, WAF, SQS, KMS and Secrets Manager",
    ],
    stack: [
      "FastAPI",
      "MongoDB",
      "ElevenLabs Scribe v2",
      "Claude",
      "ElevenLabs v3 Alpha",
      "S3",
      "Elastic Beanstalk",
      "CloudFront",
      "WAF",
      "SQS",
      "KMS",
      "Secrets Manager",
    ],
    highlights: [
      "~500 sessions processed live — 4–5 hours of therapist work per session cut to a 20–30 minute pipeline run",
      "Therapist approves every summary before the podcast script is generated",
      "GDPR-compliant on AWS, encrypted at rest and in transit",
    ],
    architecture: {
      kind: "pipeline",
      steps: [
        { label: "Audio", sub: "session", variant: "io" },
        { label: "STT", sub: "scribe v2" },
        { label: "Summary", sub: "claude sonnet 4.6" },
        { label: "Approval", sub: "therapist", variant: "human" },
        { label: "Podcast script", sub: "claude sonnet 4.6" },
        { label: "Multi-speaker TTS", sub: "elevenlabs v3 alpha", variant: "io" },
      ],
    },
    architectureLabel:
      "Pipeline: session audio to speech-to-text with ElevenLabs Scribe v2, to a Claude Sonnet 4.6 summary, to therapist approval, to a Claude-written podcast script, to multi-speaker TTS with ElevenLabs v3 Alpha.",
    challenges: [
      "AI can mis-transcribe, mis-summarise or mix up who is the therapist — so the therapist approves each summary before anything downstream is generated, and errors never reach the podcast script or audio.",
      "Multi-speaker audio depends on knowing who said what, which made correct speaker attribution in the transcript a hard requirement rather than a nice-to-have.",
      "Session audio is sensitive personal data: everything is encrypted at rest and in transit to meet GDPR.",
    ],
    media: [
      {
        src: "/projects/angel-clients.webp",
        alt: "Angel's therapist portal showing the client list: client type, programme duration, status and language for each client. Client names are blurred.",
        width: 1600,
        height: 428,
        caption: "Therapist portal, live in production — client names blurred.",
      },
    ],
  },
  {
    slug: "settle-wing",
    index: "02",
    name: "Settle Wing",
    tagline: "Legal services platform for sensitive client documents — live with 20+ users.",
    layout: "split-left",
    role: "Backend & DevOps engineer",
    status: "live",
    team: TEAM,
    overview:
      "Settle Wing is a legal services platform where clients upload filings, records and other legal documents. Those documents include medical records, so the platform is built to HIPAA requirements. I owned the backend, payments and the AWS infrastructure across development, staging and production.",
    outcomes: [
      "Live in production with 20+ users",
      "HIPAA-scoped: encryption across the database, cloud, payments and error monitoring",
      "Releases shipped through a GitHub Actions CI/CD pipeline across three environments",
    ],
    contribution: [
      "Built the Python / FastAPI backend on MongoDB",
      "Integrated Stripe payments",
      "Deployed the API on AWS Elastic Beanstalk and the frontend with AWS Amplify",
      "Set up development, staging and production environments",
      "Released through a GitHub Actions CI/CD pipeline",
      "Encryption across MongoDB, AWS, Stripe and Sentry for HIPAA",
    ],
    stack: ["Python", "FastAPI", "MongoDB", "Stripe", "Sentry", "Elastic Beanstalk", "Amplify", "GitHub Actions", "AWS", "HIPAA"],
    highlights: [
      "Live with 20+ users handling sensitive legal and medical documents",
      "Backend, payments and DevOps owned together across dev, staging and production",
      "HIPAA-scoped encryption across every service, shipped through GitHub Actions",
    ],
    architecture: {
      kind: "environments",
      environments: ["Development", "Staging", "Production"],
      services: [
        { label: "Amplify", sub: "frontend" },
        { label: "Elastic Beanstalk", sub: "fastapi" },
        { label: "Stripe", sub: "payments" },
      ],
      band: "HIPAA compliance",
    },
    architectureLabel:
      "Three environments — development, staging and production — each running an Amplify frontend, a FastAPI API on Elastic Beanstalk and Stripe, under HIPAA compliance.",
    challenges: [
      "Legal documents arrive with medical records inside them, so HIPAA applied to the whole platform — encryption had to cover the database, storage, payments and error monitoring, not just the API.",
      "Keeping development, staging and production consistent, with every release going through the same GitHub Actions pipeline.",
    ],
    links: [{ label: "Live app", href: "https://app.settlewing.com/auth/login" }],
  },
  {
    slug: "diesel-repair",
    index: "03",
    name: "Diesel Repair",
    tagline: "RAG diagnostic assistant over 15,000+ diesel repair notes, answered by LLaMA 4 Maverick.",
    layout: "split-right",
    role: "Backend & AI integration",
    team: TEAM,
    overview:
      "A diagnostic assistant for diesel repair. More than 15,000 repair notes from a spreadsheet are ingested, embedded with OpenAI text-embedding-3-small and indexed in QDrant. Each question retrieves the most relevant notes and LLaMA 4 Maverick answers from them, with application data in PostgreSQL on RDS. Internal testers used it during development.",
    outcomes: [
      "15,000+ repair notes ingested, embedded and searchable",
      "Tested by internal users — their feedback traced weak answers to the source data, not the model",
    ],
    contribution: [
      "Owned the complete backend and AI integration",
      "Built the ingestion pipeline from spreadsheet repair notes",
      "Embeddings with OpenAI text-embedding-3-small",
      "Vector search in QDrant, application data in PostgreSQL on RDS",
      "Retrieval and context assembly for LLaMA 4 Maverick",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "RDS", "QDrant", "LLaMA 4 Maverick", "OpenAI APIs", "RAG", "Vector Search"],
    highlights: [
      "15,000+ repair notes embedded with text-embedding-3-small and indexed in QDrant",
      "LLaMA 4 Maverick answers grounded in retrieved notes, not a generic chatbot",
      "Internal testing traced answer quality back to the shape of the source data",
    ],
    architecture: {
      kind: "rag",
      steps: [
        { label: "User query", variant: "io" },
        { label: "Retrieval", sub: "qdrant" },
        { label: "Context", sub: "assembly" },
        { label: "LLM", sub: "llama 4 maverick" },
        { label: "Diagnostic answer", variant: "io" },
      ],
      branchAt: 1,
      branch: [
        { label: "Notes ingestion", sub: "15k+ rows" },
        { label: "Embeddings", sub: "text-embedding-3-small" },
      ],
    },
    architectureLabel:
      "RAG flow: user query to retrieval from QDrant, to context, to LLaMA 4 Maverick, to diagnostic answer. More than 15,000 spreadsheet notes are ingested and embedded with text-embedding-3-small to back retrieval.",
    challenges: [
      "Internal testers wanted more detailed answers. The cause was the data, not retrieval: the source notes were short, flat text, so the LLM could only reformat them, not add detail. Answer quality is capped by corpus quality.",
      "Turning spreadsheet rows into retrievable chunks and assembling the right context for each diagnostic question.",
    ],
  },
  {
    slug: "fanbai",
    index: "04",
    name: "Fanbai",
    tagline: "AI character chat that reads each character's personality straight from its PNG character card.",
    layout: "pair",
    role: "Backend engineer · frontend integration",
    status: "offline",
    team: TEAM,
    overview:
      "Fanbai was an AI character platform, previously live. Users upload character cards — PNG images with the character's data hidden in the file's metadata. The backend extracts that data and turns it into the character's persona, and replies are streamed from a self-hosted model served with vLLM.",
    contribution: [
      "Built the Python / FastAPI backend",
      "Extracted character data from PNG card metadata",
      "Self-hosted model serving with vLLM",
      "Streaming character conversations",
      "SQLModel on PostgreSQL, managed with Alembic migrations",
      "Stripe payments and Cloudflare R2 storage for character cards",
      "Integrated the API with the Next.js frontend",
    ],
    stack: ["Python", "FastAPI", "vLLM", "SQLModel", "PostgreSQL", "Alembic", "Streaming", "Stripe", "Cloudflare R2", "Next.js"],
    highlights: [
      "Personalities read from metadata embedded in PNG character cards",
      "Self-hosted model on vLLM with streamed replies",
      "Stripe payments, R2 storage, SQLModel + Alembic on PostgreSQL",
    ],
    architecture: {
      kind: "stack",
      layers: [
        { label: "Client", items: [{ label: "Next.js", sub: "frontend" }] },
        { label: "API", items: [{ label: "FastAPI", sub: "python" }, { label: "Streaming", sub: "responses" }] },
        {
          label: "AI",
          items: [
            { label: "Characters", sub: "persona from png metadata" },
            { label: "vLLM", sub: "self-hosted" },
          ],
        },
        {
          label: "Data",
          items: [
            { label: "PostgreSQL", sub: "sqlmodel" },
            { label: "Alembic", sub: "migrations" },
          ],
        },
        {
          label: "Services",
          items: [
            { label: "Stripe", sub: "payments" },
            { label: "Cloudflare R2", sub: "object storage" },
          ],
        },
      ],
    },
    architectureLabel:
      "Layered architecture: Next.js client, FastAPI API with streaming, characters built from PNG card metadata and served by a self-hosted vLLM model, PostgreSQL with SQLModel and Alembic, and Stripe plus Cloudflare R2 services.",
    challenges: [
      "Character data lives inside the PNG file's metadata rather than a form, so the backend reads it out of each uploaded card and turns it into the character's persona.",
      "Bringing streaming, payments and object storage together behind one coherent API.",
    ],
  },
  {
    slug: "hooked-ai",
    index: "05",
    name: "Hooked AI",
    tagline: "AI-powered social media growth platform.",
    layout: "pair",
    role: "Backend engineer",
    team: TEAM,
    overview:
      "A social media growth platform powered by AI workflows, coordinated through an Agent-Supervisor architecture.",
    contribution: [
      "Built the Python / FastAPI backend",
      "LangChain supervisor agent that routes work to a content generation agent and a content growth agent",
      "Integrated Stripe payments",
      "Worked with MongoDB and S3",
    ],
    stack: ["Python", "FastAPI", "LangChain", "MongoDB", "Stripe", "S3", "AI Workflows", "Agent-Supervisor Architecture"],
    highlights: [
      "Supervisor agent routing work to content generation and content growth agents",
      "FastAPI backend on MongoDB",
      "Stripe payments and S3 storage",
    ],
    architecture: {
      kind: "supervisor",
      supervisor: { label: "Supervisor", sub: "routes work" },
      agents: [
        { label: "Content generation", sub: "agent" },
        { label: "Content growth", sub: "agent" },
      ],
      output: { label: "Growth workflow", sub: "result", variant: "io" },
    },
    architectureLabel:
      "Agent-Supervisor pattern: a supervisor delegates to a content generation agent and a content growth agent, whose results combine into the growth workflow output.",
    challenges: [
      "Splitting the work between a content generation agent and a content growth agent, with a supervisor deciding which one to call, rather than one long prompt chain.",
    ],
  },
  {
    slug: "amarco",
    index: "06",
    name: "Amarco AI Chatbot",
    tagline: "AI assistant that works across emails, meeting schedules and SharePoint files.",
    layout: "row",
    role: "Backend engineer",
    team: TEAM,
    overview:
      "An AI assistant capable of interacting with emails, meeting schedules and SharePoint files, built on agent tools and external API integrations.",
    contribution: [
      "Built the Python / FastAPI backend",
      "Built LangChain agent tools for email, calendar and SharePoint",
      "Connected the tools to Microsoft Graph API",
      "Persisted tool results to MongoDB",
      "Traced and debugged agent runs with LangSmith",
    ],
    stack: ["Python", "FastAPI", "LangChain", "LangSmith", "MongoDB", "Microsoft Graph API", "AI Agents", "Tool Calling"],
    highlights: [
      "Agent with tools for emails, meeting schedules and SharePoint",
      "Microsoft Graph API exposed as LangChain agent tools",
      "Agent runs traced in LangSmith, results stored in MongoDB",
    ],
    architecture: {
      kind: "toolhub",
      input: { label: "User", sub: "request", variant: "io" },
      hub: { label: "Agent", sub: "tool calling" },
      tools: [
        { label: "Emails", sub: "tool" },
        { label: "Meeting schedules", sub: "tool" },
        { label: "SharePoint files", sub: "tool" },
      ],
    },
    architectureLabel: "An agent receives the user's request and calls tools for emails, meeting schedules and SharePoint files.",
    challenges: ["Integrating several external APIs as tools a single agent can use"],
  },
  {
    slug: "realtime-voice",
    index: "07",
    name: "Real-Time Conversational AI",
    tagline: "Voice-to-voice AI prototype — speech-to-text, LLM and text-to-speech in one conversation loop.",
    layout: "row",
    role: "Backend engineer",
    status: "prototype",
    team: TEAM,
    overview:
      "A prototype built to demo to a client. The user speaks, Distil-Whisper transcribes, an OpenAI model writes the reply and StyleTTS2 speaks it back. The speech models were small enough to self-host on a local GTX 1650 GPU.",
    contribution: [
      "Built the Python / FastAPI backend",
      "Designed the STT → LLM → TTS loop",
      "Self-hosted Distil-Whisper for speech-to-text",
      "Self-hosted StyleTTS2 for text-to-speech",
      "Turn-taking on a 2-second pause, with interruption logging",
    ],
    stack: ["Python", "FastAPI", "Distil-Whisper", "StyleTTS2", "OpenAI APIs", "Speech-to-Text", "Text-to-Speech"],
    highlights: [
      "STT → LLM → TTS conversation loop built as a client demo",
      "Distil-Whisper and StyleTTS2 self-hosted on a local GTX 1650",
      "Turns switch after a 2-second pause; interruptions are logged",
    ],
    architecture: {
      kind: "pipeline",
      steps: [
        { label: "Voice", sub: "input", variant: "io" },
        { label: "STT", sub: "distil-whisper" },
        { label: "LLM", sub: "openai" },
        { label: "TTS", sub: "styletts2" },
        { label: "Voice", sub: "output", variant: "io" },
      ],
    },
    architectureLabel:
      "Pipeline: voice input to speech-to-text with Distil-Whisper, to an OpenAI LLM, to text-to-speech with StyleTTS2, back to voice output.",
    challenges: [
      "Self-hosted the speech models instead of calling paid APIs — they were small enough to run on a local GTX 1650.",
      "Turn-taking: a 2-second silence hands the turn to the AI. Interruptions are detected and logged; stopping playback mid-reply was the next step.",
    ],
  },
  {
    slug: "trading-card-ocr",
    index: "08",
    name: "Smart Trading Card OCR",
    tagline: "Mobile trading card inventory and valuation platform.",
    layout: "row",
    role: "Frontend engineer (React Native)",
    team: "Five-person team — frontend (me), backend, QA, PM and a lead engineer",
    overview:
      "A mobile platform for trading card inventory and valuation: cards are captured from the camera or photo library, read through an OCR pipeline and valued.",
    contribution: [
      "Built the React Native app",
      "Camera and photo library capture",
      "Integrated the app with the FastAPI OCR backend",
      "Card inventory and valuation screens",
    ],
    stack: ["React Native", "FastAPI", "OCR"],
    highlights: [
      "React Native app with camera and photo library capture",
      "Integrated with an OCR pipeline behind a FastAPI backend",
      "Card inventory and valuation",
    ],
    architecture: {
      kind: "pipeline",
      steps: [
        { label: "Camera / library", sub: "react native", variant: "io" },
        { label: "OCR", sub: "pipeline" },
        { label: "FastAPI", sub: "api" },
        { label: "Database", sub: "inventory" },
        { label: "Valuation", variant: "io" },
      ],
    },
    architectureLabel:
      "Pipeline: camera or photo library capture in React Native, to OCR, to FastAPI, to the database, to card valuation.",
  },
  {
    slug: "academia-navigator",
    index: "09",
    name: "Academia Navigator",
    tagline: "Course-outline scraping platform that cut data collection from days to hours.",
    layout: "row",
    role: "Backend engineer",
    team: TEAM,
    overview:
      "A platform for scraping course outlines, combining HTML parsing with browser automation. It cut course-outline data collection from days to hours.",
    outcomes: ["Course-outline data collection cut from days to hours"],
    contribution: [
      "Built the Python / FastAPI backend",
      "Parsing with BeautifulSoup4",
      "Browser automation with Selenium and ChromeDriver",
    ],
    stack: ["Python", "FastAPI", "BeautifulSoup4", "Selenium", "ChromeDriver"],
    highlights: [
      "Data collection cut from days to hours",
      "Browser automation with Selenium and ChromeDriver, parsing with BeautifulSoup4",
      "Served through a FastAPI backend",
    ],
    architecture: {
      kind: "pipeline",
      steps: [
        { label: "Course pages", variant: "io" },
        { label: "Selenium", sub: "chromedriver" },
        { label: "BeautifulSoup4", sub: "parse" },
        { label: "FastAPI", sub: "api", variant: "io" },
      ],
    },
    architectureLabel: "Pipeline: course pages loaded with Selenium and ChromeDriver, parsed with BeautifulSoup4, served through FastAPI.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

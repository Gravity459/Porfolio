// TODO: replace the placeholder values below with real links before deploying.
export const site = {
  name: "Talha Rana",
  title: "AI Backend Engineer",
  url: "https://talha-rana.dev", // TODO: production URL
  description:
    "Talha Rana — AI Backend Engineer building production LLM applications, AI agents, RAG systems, backend APIs and cloud infrastructure.",
  email: "talha.rana08@gmail.com", // TODO: real email
  socials: {
    github: { label: "GitHub", handle: "@Gravity459", href: "https://github.com/Gravity459" }, // TODO
    linkedin: {
      label: "LinkedIn",
      handle: "in/talha-rana",
      href: "https://www.linkedin.com/in/talha-rana", // TODO
    },
  },
  availability: {
    open: true,
    label: "Open to full-time roles",
  },
  location: "Karachi, Pakistan",
  /** Built from resume/resume.html — see the comment there. */
  resume: "/Talha_Rana_Resume.pdf",
  education: "BS Computer Science, FAST National University, Karachi (2019–2023)",
  remote: "Open to remote work worldwide",
  current: { title: "AI Backend Engineer", company: "Kodexo Labs" },
  /** First year in data/experience.ts — shown in the hero. */
  careerStart: 2023,
} as const;

export const navItems = [
  { label: "Expertise", href: "#expertise", sections: ["expertise"] },
  { label: "Work", href: "#work", sections: ["work", "experience", "infrastructure"] },
  { label: "About", href: "#about", sections: ["about"] },
  { label: "Contact", href: "#contact", sections: ["contact"] },
] as const;

export const heroTags = ["PYTHON", "FASTAPI", "LLMs", "RAG", "AI AGENTS", "AWS"] as const;

/** How a product moves through my hands — shown above the hero headline. */
export const lifecycle = ["Architecture", "Backend", "AI workflows", "Infrastructure", "Deployment"] as const;

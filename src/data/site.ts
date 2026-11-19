export const site = {
  name: "Talha Rana",
  title: "Full Stack AI Engineer",
  url: "https://talha-rana.vercel.app",
  description:
    "Talha Rana, Full Stack AI Engineer. Production LLM agents, RAG, FastAPI backends, React frontends and cloud infrastructure. Open to relocation and remote roles.",
  email: "talha.rana08@gmail.com",
  socials: {
    github: { label: "GitHub", handle: "@Gravity459", href: "https://github.com/Gravity459" },
    linkedin: {
      label: "LinkedIn",
      handle: "in/talha-rana",
      href: "https://www.linkedin.com/in/talha-rana",
    },
  },
  availability: {
    open: true,
    label: "Open to relocation and remote roles",
  },
  location: "Karachi, Pakistan",
  /** Built from resume/resume.html — see the comment there. */
  resume: "/Talha_Rana_Resume.pdf",
  education: "BS Computer Science, FAST National University, Karachi (2019–2023)",
  remote: "Open to relocation with visa sponsorship, or remote work",
  current: { title: "Full Stack AI Engineer", company: "ZOD AI" },
  /** First year in data/experience.ts — shown in the hero. */
  careerStart: 2023,
} as const;

export const navItems = [
  { label: "Work", href: "#work", sections: ["work", "experience"] },
  { label: "Expertise", href: "#expertise", sections: ["expertise", "infrastructure"] },
  { label: "About", href: "#about", sections: ["about"] },
  { label: "Contact", href: "#contact", sections: ["contact"] },
] as const;

export const heroTags = ["PYTHON", "FASTAPI", "LLM AGENTS", "RAG", "TYPESCRIPT", "AWS"] as const;

/** How a product moves through my hands — shown above the hero headline. */
export const lifecycle = ["Architecture", "Backend", "AI workflows", "Infrastructure", "Deployment"] as const;

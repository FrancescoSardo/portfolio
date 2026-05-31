import type { WorkExperience } from "@/types";

export const experience: WorkExperience[] = [
  {
    role: "Shopify Developer",
    company: "Excelsior Group SRL",
    location: "Italy",
    start: "Oct 2023",
    end: "Feb 2025",
    bullets: [
      "Built customized e-commerce solutions using Shopify themes and Liquid templating",
      "Optimized storefronts for UX and performance across multiple client accounts",
      "Managed technical architecture and integration of complex e-commerce platforms",
    ],
    techStack: ["Shopify", "Liquid", "JavaScript", "HTML/CSS"],
  },
  {
    role: "Full Stack Developer",
    company: "Impero Soft SRLS",
    location: "Genoa, Italy",
    start: "Sep 2023",
    end: "Oct 2023",
    bullets: [
      "Designed and built microservice-based applications with Java Spring Boot",
      "Containerized services with Docker and optimized CI/CD pipelines",
      "Followed Agile methodology in cross-functional team delivery",
    ],
    techStack: ["Java", "Spring Boot", "Docker", "Microservices"],
  },
  {
    role: "UI Developer",
    company: "Linfa SRL",
    location: "Imperia, Italy",
    start: "Jun 2022",
    end: "Sep 2022",
    bullets: [
      "Built enterprise asset search solution using .NET framework",
      "Integrated software solutions across multiple departments",
    ],
    techStack: [".NET", "C#"],
  },
];

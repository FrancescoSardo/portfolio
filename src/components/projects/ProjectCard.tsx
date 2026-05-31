import { TechBadge } from "@/components/ui/TechBadge";
import { StatusDot } from "@/components/ui/StatusDot";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors duration-300 group">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs text-zinc-600 tracking-widest">
          {project.number}
        </span>
        <h3 className="font-mono text-base font-semibold text-zinc-100 tracking-wide">
          {project.title}
        </h3>
        <StatusDot status={project.status} label={project.statusLabel} />
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed font-mono flex-1">{project.hook}</p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      <div className="font-mono text-xs text-zinc-600 border-t border-zinc-800 pt-3">
        {project.metrics}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.links.caseStudy && (
          <Button href={project.links.caseStudy} variant="primary">
            Case Study →
          </Button>
        )}
        {project.links.appStore && (
          <Button href={project.links.appStore} variant="ghost" external>
            App Store ↗
          </Button>
        )}
        {project.links.github && (
          <Button href={project.links.github} variant="ghost" external>
            GitHub ↗
          </Button>
        )}
        {project.links.live && (
          <Button href={project.links.live} variant="ghost" external>
            Live ↗
          </Button>
        )}
      </div>
    </div>
  );
}

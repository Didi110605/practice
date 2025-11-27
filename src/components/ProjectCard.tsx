import { Project } from '../App';
import { Users, Star, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-700';
      case 'teacher': return 'bg-green-100 text-green-700';
      case 'mentor': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'Студент';
      case 'teacher': return 'Преподаватель';
      case 'mentor': return 'Ментор';
      default: return role;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-200"
    >
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs ${getRoleBadgeColor(project.author.role)}`}>
            {getRoleLabel(project.author.role)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{project.team.length}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{project.rating.toFixed(1)}</span>
            <span className="text-gray-400">({project.ratingCount})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>{project.progress}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm text-gray-900">{project.author.name}</p>
            <p className="text-xs text-gray-500">{project.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

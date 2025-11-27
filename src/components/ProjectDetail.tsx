import { useState } from 'react';
import { Project } from '../App';
import { ArrowLeft, Star, Users, Calendar, Tag } from 'lucide-react';
import { TeamMembers } from './TeamMembers';
import { ProgressTracker } from './ProgressTracker';
import { Comments } from './Comments';
import { ImageWithFallback } from './ImageWithFallback';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onRate: (projectId: string, rating: number) => void;
  onComment: (projectId: string, text: string) => void;
}

export function ProjectDetail({ project, onBack, onRate, onComment }: ProjectDetailProps) {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    onRate(project.id, rating);
  };

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Назад к проектам
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1>{project.title}</h1>
              <span className={`px-3 py-1 rounded-full text-xs ${getRoleBadgeColor(project.author.role)}`}>
                {getRoleLabel(project.author.role)}
              </span>
            </div>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </div>
        </div>

        {/* Image */}
        <div className="mb-6 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>{project.team.length} участников</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>{project.createdAt.toLocaleDateString('ru-RU')}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-5 h-5" />
            <span>{project.category}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-900">Автор проекта</p>
            <p className="text-gray-600">{project.author.name}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="pt-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl">{project.rating.toFixed(1)}</span>
              <span className="text-gray-500">({project.ratingCount} оценок)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Оцените проект:</span>
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                onClick={() => handleRate(rating)}
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-6 h-6 ${
                    rating <= (hoveredRating || userRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <ProgressTracker progress={project.progress} />
      </div>

      {/* Team */}
      <div className="mb-6">
        <TeamMembers team={project.team} />
      </div>

      {/* Comments */}
      <Comments
        comments={project.comments}
        onAddComment={(text) => onComment(project.id, text)}
      />
    </div>
  );
}

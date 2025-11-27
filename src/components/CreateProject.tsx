import { useState } from 'react';
import { Project, User, TeamMember } from '../App';
import { X } from 'lucide-react';

interface CreateProjectProps {
  onSubmit: (project: Omit<Project, 'id' | 'createdAt' | 'rating' | 'ratingCount' | 'comments'>) => void;
  onCancel: () => void;
}

export function CreateProject({ onSubmit, onCancel }: CreateProjectProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Веб-разработка');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const categories = [
    'Веб-разработка',
    'Искусственный интеллект',
    'Образовательные технологии',
    'Мобильная разработка',
    'Дизайн',
    'Другое'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser: User = {
      id: 'current',
      name: 'Евгения Аданян',
      role: 'student',
      avatar: 'https://i.pravatar.cc/150?img=20'
    };

    const teamMember: TeamMember = {
      ...currentUser,
      contribution: 100
    };

    const project: Omit<Project, 'id' | 'createdAt' | 'rating' | 'ratingCount' | 'comments'> = {
      title,
      description,
      category,
      author: currentUser,
      team: [teamMember],
      progress,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: imageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
    };

    onSubmit(project);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h1>Создать новый проект</h1>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Название проекта *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите название проекта"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Описание *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Опишите цели и задачи проекта"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Категория *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Теги (через запятую)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, TypeScript, AI"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              URL изображения (опционально)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Начальный прогресс: {progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Создать проект
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

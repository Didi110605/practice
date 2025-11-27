import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { CreateProject } from './components/CreateProject';
import { Plus } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'mentor';
  avatar: string;
}

export interface TeamMember extends User {
  contribution: number;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  author: User;
  team: TeamMember[];
  progress: number;
  rating: number;
  ratingCount: number;
  comments: Comment[];
  tags: string[];
  createdAt: Date;
  image: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-powered Study Assistant',
    description: 'Разработка умного помощника для студентов с использованием машинного обучения для персонализации учебного процесса.',
    category: 'Искусственный интеллект',
    author: { id: 'u1', name: 'Анна Петрова', role: 'student', avatar: 'https://i.pravatar.cc/150?img=1' },
    team: [
      { id: 'u1', name: 'Анна Петрова', role: 'student', avatar: 'https://i.pravatar.cc/150?img=1', contribution: 40 },
      { id: 'u2', name: 'Иван Смирнов', role: 'student', avatar: 'https://i.pravatar.cc/150?img=2', contribution: 35 },
      { id: 'u3', name: 'Мария Козлова', role: 'mentor', avatar: 'https://i.pravatar.cc/150?img=3', contribution: 25 },
    ],
    progress: 75,
    rating: 4.8,
    ratingCount: 24,
    comments: [
      {
        id: 'c1',
        user: { id: 'u4', name: 'Дмитрий Волков', role: 'teacher', avatar: 'https://i.pravatar.cc/150?img=4' },
        text: 'Отличная идея! Особенно впечатлила реализация персонализации.',
        timestamp: new Date('2024-11-20')
      },
      {
        id: 'c2',
        user: { id: 'u5', name: 'Елена Соколова', role: 'student', avatar: 'https://i.pravatar.cc/150?img=5' },
        text: 'Можно ли добавить интеграцию с календарем?',
        timestamp: new Date('2024-11-22')
      }
    ],
    tags: ['AI', 'Python', 'Machine Learning'],
    createdAt: new Date('2024-11-01'),
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Virtual Lab для химии',
    description: 'Интерактивная виртуальная лаборатория для проведения химических экспериментов в безопасной среде.',
    category: 'Образовательные технологии',
    author: { id: 'u6', name: 'Сергей Новиков', role: 'teacher', avatar: 'https://i.pravatar.cc/150?img=6' },
    team: [
      { id: 'u6', name: 'Сергей Новиков', role: 'teacher', avatar: 'https://i.pravatar.cc/150?img=6', contribution: 50 },
      { id: 'u7', name: 'Ольга Федорова', role: 'student', avatar: 'https://i.pravatar.cc/150?img=7', contribution: 30 },
      { id: 'u8', name: 'Павел Морозов', role: 'student', avatar: 'https://i.pravatar.cc/150?img=8', contribution: 20 },
    ],
    progress: 60,
    rating: 4.6,
    ratingCount: 18,
    comments: [
      {
        id: 'c3',
        user: { id: 'u9', name: 'Татьяна Лебедева', role: 'mentor', avatar: 'https://i.pravatar.cc/150?img=9' },
        text: 'Очень полезный проект для дистанционного обучения!',
        timestamp: new Date('2024-11-18')
      }
    ],
    tags: ['WebGL', 'React', 'Education'],
    createdAt: new Date('2024-10-15'),
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Платформа для peer-review',
    description: 'Система взаимного рецензирования студенческих работ с алгоритмами умного распределения.',
    category: 'Веб-разработка',
    author: { id: 'u10', name: 'Андрей Кузнецов', role: 'student', avatar: 'https://i.pravatar.cc/150?img=10' },
    team: [
      { id: 'u10', name: 'Андрей Кузнецов', role: 'student', avatar: 'https://i.pravatar.cc/150?img=10', contribution: 60 },
      { id: 'u11', name: 'Наталья Попова', role: 'student', avatar: 'https://i.pravatar.cc/150?img=11', contribution: 40 },
    ],
    progress: 45,
    rating: 4.3,
    ratingCount: 12,
    comments: [],
    tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
    createdAt: new Date('2024-11-10'),
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'Gamification Learning System',
    description: 'Игровая платформа для изучения математики с достижениями, уровнями и соревнованиями.',
    category: 'Геймификация',
    author: { id: 'u12', name: 'Виктория Орлова', role: 'mentor', avatar: 'https://i.pravatar.cc/150?img=12' },
    team: [
      { id: 'u12', name: 'Виктория Орлова', role: 'mentor', avatar: 'https://i.pravatar.cc/150?img=12', contribution: 30 },
      { id: 'u13', name: 'Максим Зайцев', role: 'student', avatar: 'https://i.pravatar.cc/150?img=13', contribution: 35 },
      { id: 'u14', name: 'Алиса Белова', role: 'student', avatar: 'https://i.pravatar.cc/150?img=14', contribution: 35 },
    ],
    progress: 85,
    rating: 4.9,
    ratingCount: 31,
    comments: [
      {
        id: 'c4',
        user: { id: 'u15', name: 'Роман Григорьев', role: 'teacher', avatar: 'https://i.pravatar.cc/150?img=15' },
        text: 'Потрясающая реализация! Студенты в восторге.',
        timestamp: new Date('2024-11-23')
      }
    ],
    tags: ['Unity', 'C#', 'Education'],
    createdAt: new Date('2024-09-20'),
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop'
  }
];

function HomePage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');

  const categories = ['all', 'Искусственный интеллект', 'Образовательные технологии', 'Веб-разработка', 'Геймификация'];
  const roles = ['all', 'student', 'teacher', 'mentor'];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = filterCategory === 'all' || project.category === filterCategory;
    const roleMatch = filterRole === 'all' || project.author.role === filterRole;
    return categoryMatch && roleMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogoClick={() => navigate('/')} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="mb-4">EduCollab</h1>
          <p className="text-xl mb-8 opacity-90">
            Платформа для совместной работы над учебными проектами
          </p>
          <button
            onClick={() => navigate('/create')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Создать проект
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">Категория</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Все категории' : cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Роль автора</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'Все роли' : 
                     role === 'student' ? 'Студенты' :
                     role === 'teacher' ? 'Преподаватели' : 'Менторы'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2>Учебные проекты</h2>
          <p className="text-gray-600">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'проект' : 'проектов'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/project/${project.id}`)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Проекты не найдены</p>
            <button
              onClick={() => {
                setFilterCategory('all');
                setFilterRole('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  
  const project = projects.find(p => p.id === id);

  const handleRateProject = (projectId: string, newRating: number) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const totalRating = p.rating * p.ratingCount + newRating;
        const newCount = p.ratingCount + 1;
        return { ...p, rating: totalRating / newCount, ratingCount: newCount };
      }
      return p;
    }));
  };

  const handleAddComment = (projectId: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: { id: 'current', name: 'Текущий пользователь', role: 'student', avatar: 'https://i.pravatar.cc/150?img=20' },
      text,
      timestamp: new Date()
    };

    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onLogoClick={() => navigate('/')} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2>Проект не найден</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Вернуться к проектам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogoClick={() => navigate('/')} />
      <ProjectDetail
        project={project}
        onBack={() => navigate('/')}
        onRate={handleRateProject}
        onComment={handleAddComment}
      />
    </div>
  );
}

function CreatePage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const handleCreateProject = (newProject: Omit<Project, 'id' | 'createdAt' | 'rating' | 'ratingCount' | 'comments'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      createdAt: new Date(),
      rating: 0,
      ratingCount: 0,
      comments: []
    };
    setProjects([project, ...projects]);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogoClick={() => navigate('/')} />
      <CreateProject
        onSubmit={handleCreateProject}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
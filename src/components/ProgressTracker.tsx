import { TrendingUp, CheckCircle, Circle } from 'lucide-react';

interface ProgressTrackerProps {
  progress: number;
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
  const milestones = [
    { label: 'Планирование', threshold: 25 },
    { label: 'Разработка', threshold: 50 },
    { label: 'Тестирование', threshold: 75 },
    { label: 'Завершение', threshold: 100 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-gray-700" />
        <h2>Прогресс проекта</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Общий прогресс</span>
          <span className="text-2xl text-blue-600">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {milestones.map((milestone, index) => {
          const isCompleted = progress >= milestone.threshold;
          const isActive = progress >= (milestones[index - 1]?.threshold || 0) && progress < milestone.threshold;

          return (
            <div key={milestone.label} className="flex items-center gap-3">
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-300'}`} />
              )}
              <div className="flex-1">
                <p className={`text-sm ${isCompleted ? 'text-gray-900' : isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {milestone.label}
                </p>
              </div>
              <span className="text-xs text-gray-500">{milestone.threshold}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

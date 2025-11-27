import { TeamMember } from '../App';
import { Users } from 'lucide-react';

interface TeamMembersProps {
  team: TeamMember[];
}

export function TeamMembers({ team }: TeamMembersProps) {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student': return 'Студент';
      case 'teacher': return 'Преподаватель';
      case 'mentor': return 'Ментор';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600';
      case 'teacher': return 'text-green-600';
      case 'mentor': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-gray-700" />
        <h2>Команда проекта</h2>
      </div>

      <div className="space-y-4">
        {team.map(member => (
          <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-gray-900">{member.name}</p>
                <p className={`text-sm ${getRoleColor(member.role)}`}>
                  {getRoleLabel(member.role)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Вклад</p>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${member.contribution}%` }}
                  />
                </div>
                <span className="text-sm text-gray-900">{member.contribution}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

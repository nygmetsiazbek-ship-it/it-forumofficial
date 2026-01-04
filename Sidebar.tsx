import { BookOpen, Users, Trophy, MessageSquare } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { name: 'All', icon: MessageSquare, color: 'text-gray-600' },
  { name: 'General', icon: MessageSquare, color: 'text-blue-600' },
  { name: 'Academics', icon: BookOpen, color: 'text-green-600' },
  { name: 'Study Groups', icon: Users, color: 'text-purple-600' },
  { name: 'Sports & Events', icon: Trophy, color: 'text-orange-600' }
];

export function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <div className="bg-white rounded-lg p-4 h-fit sticky top-24">
      <h2 className="mb-4">Categories</h2>
      
      <div className="space-y-1">
        {categories.map(category => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === category.name
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <category.icon size={20} className={category.color} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

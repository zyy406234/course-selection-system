/**
 * 课程筛选组件
 * 提供按类别筛选、搜索、仅显示可选课程等功能
 */

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Search, Filter, Check } from 'lucide-react';
import type { CourseCategory, CourseFilter as FilterType } from '@/types';
import { cn } from '@/lib/utils';

interface CourseFilterProps {
  filter: FilterType;
  onFilterChange: (filter: Partial<FilterType>) => void;
}

export function CourseFilter({ filter, onFilterChange }: CourseFilterProps) {
  const categories: { value: CourseCategory | 'all'; label: string }[] = [
    { value: 'all', label: '全部课程' },
    { value: 'required', label: '必修' },
    { value: 'elective', label: '选修' },
    { value: 'general', label: '通识' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="搜索课程名称、代码或教师..."
          value={filter.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          className="pl-10 h-11"
        />
      </div>

      {/* 筛选选项 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">类别：</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onFilterChange({ category: cat.value })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                filter.category === cat.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilterChange({ onlyAvailable: !filter.onlyAvailable })}
            className={cn(
              'gap-2',
              filter.onlyAvailable && 'border-indigo-500 text-indigo-600 bg-indigo-50'
            )}
          >
            {filter.onlyAvailable && <Check className="w-4 h-4" />}
            仅显示可选
          </Button>
        </div>
      </div>
    </div>
  );
}

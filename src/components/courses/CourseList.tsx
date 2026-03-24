/**
 * 课程列表组件
 * 展示筛选后的课程列表
 */

import { CourseCard } from './CourseCard';
import type { Course } from '@/types';
import { BookOpen } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
  selectedCourseIds: string[];
  onSelect: (courseId: string) => void;
  onDrop: (courseId: string) => void;
}

export function CourseList({ courses, selectedCourseIds, onSelect, onDrop }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到课程</h3>
        <p className="text-gray-500 max-w-sm">
          尝试调整筛选条件或搜索关键词
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isSelected={selectedCourseIds.includes(course.id)}
          onSelect={() => onSelect(course.id)}
          onDrop={() => onDrop(course.id)}
        />
      ))}
    </div>
  );
}

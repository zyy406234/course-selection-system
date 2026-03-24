/**
 * 已选课程组件
 * 展示当前学生已选的课程列表和学分统计
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, BookOpen, Award, AlertCircle } from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

interface SelectedCoursesProps {
  courses: Course[];
  totalCredits: number;
  maxCredits: number;
  onDrop: (courseId: string) => void;
}

export function SelectedCourses({ courses, totalCredits, maxCredits, onDrop }: SelectedCoursesProps) {
  const creditRate = Math.round((totalCredits / maxCredits) * 100);
  const isNearLimit = creditRate >= 80;
  const isOverLimit = totalCredits > maxCredits;

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            已选课程
          </CardTitle>
          <Badge variant="secondary" className="text-sm">
            {courses.length} 门
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 学分统计 */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">学分统计</span>
            </div>
            <span className={cn(
              'text-lg font-bold',
              isOverLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-indigo-600'
            )}>
              {totalCredits}/{maxCredits}
            </span>
          </div>
          
          <Progress 
            value={creditRate} 
            className={cn(
              'h-2',
              isOverLimit ? 'bg-red-100' : isNearLimit ? 'bg-yellow-100' : 'bg-gray-200'
            )}
          />
          
          {isNearLimit && !isOverLimit && (
            <div className="flex items-center gap-2 text-sm text-yellow-600">
              <AlertCircle className="w-4 h-4" />
              <span>接近学分上限</span>
            </div>
          )}
          
          {isOverLimit && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span>已超出学分限制</span>
            </div>
          )}
        </div>

        {/* 已选课程列表 */}
        {courses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>还没有选择课程</p>
            <p className="text-sm mt-1">从下方列表中选择课程</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{course.name}</span>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {course.credits}学分
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{course.teacher}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDrop(course.id)}
                  className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

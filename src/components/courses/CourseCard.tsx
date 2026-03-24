/**
 * 课程卡片组件
 * 展示单个课程的信息，支持选课/退课操作
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  isSelected: boolean;
  onSelect: () => void;
  onDrop: () => void;
}

export function CourseCard({ course, isSelected, onSelect, onDrop }: CourseCardProps) {
  // 计算选课进度
  const enrollmentRate = Math.round((course.enrolled / course.capacity) * 100);
  
  // 判断是否已满
  const isFull = course.enrolled >= course.capacity;
  
  // 类别标签配置
  const categoryConfig = {
    required: { label: '必修', color: 'bg-red-100 text-red-700 border-red-200' },
    elective: { label: '选修', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    general: { label: '通识', color: 'bg-green-100 text-green-700 border-green-200' },
  };
  
  // 状态标签配置
  const statusConfig = {
    open: { label: '可选', color: 'bg-green-500' },
    closed: { label: '关闭', color: 'bg-gray-500' },
    full: { label: '已满', color: 'bg-red-500' },
  };
  
  return (
    <Card className={cn(
      'transition-all duration-300 hover:shadow-lg',
      isSelected && 'ring-2 ring-indigo-500 ring-offset-2'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono text-gray-500">{course.code}</span>
              <Badge variant="outline" className={categoryConfig[course.category].color}>
                {categoryConfig[course.category].label}
              </Badge>
              <span className={cn('w-2 h-2 rounded-full', statusConfig[course.status].color)} />
            </div>
            <CardTitle className="text-lg leading-tight">{course.name}</CardTitle>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-indigo-600">{course.credits}</span>
            <span className="text-sm text-gray-500 block">学分</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 教师信息 */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{course.teacher}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{course.location}</span>
          </div>
        </div>
        
        {/* 课程描述 */}
        <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
        
        {/* 上课时间安排 */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="font-medium">上课时间</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {course.schedule.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item.weekDay} {item.startTime}-{item.endTime}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* 选课进度 */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">选课进度</span>
            <span className={cn(
              'font-medium',
              isFull ? 'text-red-600' : 'text-gray-900'
            )}>
              {course.enrolled}/{course.capacity}
            </span>
          </div>
          <Progress 
            value={enrollmentRate} 
            className={cn(
              'h-2',
              isFull ? 'bg-red-100' : 'bg-gray-100'
            )}
          />
        </div>
        
        {/* 操作按钮 */}
        <div className="pt-2">
          {isSelected ? (
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={onDrop}
            >
              <XCircle className="w-4 h-4 mr-2" />
              退选
            </Button>
          ) : (
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={onSelect}
              disabled={course.status !== 'open' || isFull}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {isFull ? '已满' : course.status === 'closed' ? '已关闭' : '选课'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

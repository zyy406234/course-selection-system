/**
 * 统计面板组件
 * 展示选课系统的统计数据
 */

import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, CheckCircle, AlertCircle } from 'lucide-react';
import type { Statistics } from '@/types';

interface StatisticsPanelProps {
  statistics: Statistics;
}

export function StatisticsPanel({ statistics }: StatisticsPanelProps) {
  const stats = [
    {
      label: '总课程数',
      value: statistics.totalCourses,
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      label: '可选课程',
      value: statistics.openCourses,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: '已满课程',
      value: statistics.fullCourses,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: '总选课人次',
      value: statistics.totalSelections,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`${stat.bgColor} p-2.5 rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

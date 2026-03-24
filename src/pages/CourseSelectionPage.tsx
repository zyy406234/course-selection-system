/**
 * 选课页面
 * 学生选课系统的主页面
 */

import { useEffect } from 'react';
import { toast } from 'sonner';
import { CourseFilter, CourseList, SelectedCourses, StatisticsPanel } from '@/components/courses';
import { useCourseStore } from '@/store/courseStore';
import { GraduationCap, User } from 'lucide-react';

export function CourseSelectionPage() {
  const {
    state,
    filteredCourses,
    selectedCourses,
    totalCredits,
    statistics,
    selectCourse,
    dropCourse,
    setFilter,
    clearError,
  } = useCourseStore();

  const { currentStudent, error } = state;

  // 错误提示
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 3000,
        onDismiss: clearError,
      });
    }
  }, [error, clearError]);

  // 选课成功提示
  const handleSelect = (courseId: string) => {
    const course = filteredCourses.find(c => c.id === courseId);
    selectCourse(courseId);
    if (course) {
      toast.success(`成功选择课程：${course.name}`, {
        description: `${course.credits}学分 · ${course.teacher}`,
        duration: 2000,
      });
    }
  };

  // 退课成功提示
  const handleDrop = (courseId: string) => {
    const course = selectedCourses.find(c => c.id === courseId);
    dropCourse(courseId);
    if (course) {
      toast.info(`已退选课程：${course.name}`, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      {/* 头部 */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                学生选课系统
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Course Selection System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{currentStudent.name}</p>
              <p className="text-xs text-gray-500">{currentStudent.major}</p>
            </div>
            <div className="bg-indigo-50 p-2 rounded-full">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计面板 */}
        <div className="mb-8">
          <StatisticsPanel statistics={statistics} />
        </div>

        {/* 两栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：课程列表 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 筛选器 */}
            <CourseFilter
              filter={state.filter}
              onFilterChange={setFilter}
            />

            {/* 课程列表 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                可选课程
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredCourses.length})
                </span>
              </h2>
              <CourseList
                courses={filteredCourses}
                selectedCourseIds={currentStudent.selectedCourses}
                onSelect={handleSelect}
                onDrop={handleDrop}
              />
            </div>
          </div>

          {/* 右侧：已选课程 */}
          <div className="lg:col-span-1">
            <SelectedCourses
              courses={selectedCourses}
              totalCredits={totalCredits}
              maxCredits={currentStudent.maxCredits}
              onDrop={handleDrop}
            />
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p> 2024 学生选课系统. 用 React + TypeScript + Vite 构建</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                系统运行正常
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

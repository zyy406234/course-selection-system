/**
 * 课程状态管理（Store）
 * 使用 React Context + useReducer 实现全局状态管理
 */

import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import type { Course, Student, CourseFilter, Statistics } from '@/types';

// 初始课程数据
const initialCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: '计算机导论',
    teacher: '王教授',
    credits: 3,
    category: 'required',
    status: 'open',
    capacity: 120,
    enrolled: 85,
    schedule: [
      { weekDay: '周一', startTime: '08:00', endTime: '09:40' },
      { weekDay: '周三', startTime: '08:00', endTime: '09:40' },
    ],
    description: '计算机科学入门课程，介绍计算机基础知识',
    location: '教学楼A-101',
  },
  {
    id: '2',
    code: 'CS201',
    name: '数据结构与算法',
    teacher: '李教授',
    credits: 4,
    category: 'required',
    status: 'open',
    capacity: 80,
    enrolled: 72,
    schedule: [
      { weekDay: '周二', startTime: '10:00', endTime: '11:40' },
      { weekDay: '周四', startTime: '10:00', endTime: '11:40' },
    ],
    description: '学习常用数据结构和算法设计与分析',
    location: '教学楼B-203',
  },
  {
    id: '3',
    code: 'CS301',
    name: 'Web前端开发',
    teacher: '张老师',
    credits: 3,
    category: 'elective',
    status: 'open',
    capacity: 60,
    enrolled: 45,
    schedule: [
      { weekDay: '周一', startTime: '14:00', endTime: '15:40' },
      { weekDay: '周五', startTime: '14:00', endTime: '15:40' },
    ],
    description: 'HTML、CSS、JavaScript及现代前端框架',
    location: '实验楼C-305',
  },
  {
    id: '4',
    code: 'MATH101',
    name: '高等数学',
    teacher: '陈教授',
    credits: 5,
    category: 'required',
    status: 'full',
    capacity: 150,
    enrolled: 150,
    schedule: [
      { weekDay: '周二', startTime: '08:00', endTime: '09:40' },
      { weekDay: '周四', startTime: '08:00', endTime: '09:40' },
    ],
    description: '微积分、级数、微分方程等数学基础',
    location: '教学楼A-201',
  },
  {
    id: '5',
    code: 'ENG101',
    name: '大学英语',
    teacher: '刘老师',
    credits: 2,
    category: 'general',
    status: 'open',
    capacity: 40,
    enrolled: 28,
    schedule: [
      { weekDay: '周三', startTime: '10:00', endTime: '11:40' },
    ],
    description: '提高英语听说读写能力',
    location: '语言楼D-102',
  },
  {
    id: '6',
    code: 'CS401',
    name: '数据库原理',
    teacher: '赵教授',
    credits: 3,
    category: 'elective',
    status: 'closed',
    capacity: 50,
    enrolled: 0,
    schedule: [
      { weekDay: '周五', startTime: '08:00', endTime: '09:40' },
      { weekDay: '周五', startTime: '10:00', endTime: '11:40' },
    ],
    description: '关系数据库设计与SQL语言',
    location: '实验楼C-401',
  },
];

// 当前学生
const currentStudent: Student = {
  id: '2024001',
  name: '张三',
  major: '计算机科学与技术',
  grade: 2,
  maxCredits: 25,
  selectedCourses: ['1'],
};

// State 类型
interface CourseState {
  courses: Course[];
  currentStudent: Student;
  filter: CourseFilter;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: initialCourses,
  currentStudent,
  filter: {
    category: 'all',
    searchQuery: '',
    onlyAvailable: false,
  },
  loading: false,
  error: null,
};

// Action 类型
type CourseAction =
  | { type: 'SELECT_COURSE'; payload: string }
  | { type: 'DROP_COURSE'; payload: string }
  | { type: 'SET_FILTER'; payload: Partial<CourseFilter> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Reducer
function courseReducer(state: CourseState, action: CourseAction): CourseState {
  switch (action.type) {
    case 'SELECT_COURSE': {
      const courseId = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      
      if (!course) return state;
      
      if (state.currentStudent.selectedCourses.includes(courseId)) {
        return { ...state, error: '该课程已选择' };
      }
      
      const currentCredits = state.courses
        .filter(c => state.currentStudent.selectedCourses.includes(c.id))
        .reduce((sum, c) => sum + c.credits, 0);
      
      if (currentCredits + course.credits > state.currentStudent.maxCredits) {
        return { ...state, error: '超出学分限制' };
      }
      
      if (course.enrolled >= course.capacity) {
        return { ...state, error: '课程已满' };
      }
      
      return {
        ...state,
        courses: state.courses.map(c =>
          c.id === courseId ? { ...c, enrolled: c.enrolled + 1 } : c
        ),
        currentStudent: {
          ...state.currentStudent,
          selectedCourses: [...state.currentStudent.selectedCourses, courseId],
        },
        error: null,
      };
    }
    
    case 'DROP_COURSE': {
      const courseId = action.payload;
      
      if (!state.currentStudent.selectedCourses.includes(courseId)) {
        return { ...state, error: '未选择该课程' };
      }
      
      return {
        ...state,
        courses: state.courses.map(c =>
          c.id === courseId ? { ...c, enrolled: Math.max(0, c.enrolled - 1) } : c
        ),
        currentStudent: {
          ...state.currentStudent,
          selectedCourses: state.currentStudent.selectedCourses.filter(id => id !== courseId),
        },
        error: null,
      };
    }
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
}

// Context
interface CourseContextType {
  state: CourseState;
  selectCourse: (courseId: string) => void;
  dropCourse: (courseId: string) => void;
  setFilter: (filter: Partial<CourseFilter>) => void;
  clearError: () => void;
  filteredCourses: Course[];
  selectedCourses: Course[];
  totalCredits: number;
  statistics: Statistics;
}

const CourseContext = createContext<CourseContextType | null>(null);

// Provider
export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(courseReducer, initialState);
  
  const filteredCourses = useMemo(() => {
    return state.courses.filter(course => {
      if (state.filter.category !== 'all' && course.category !== state.filter.category) {
        return false;
      }
      
      if (state.filter.searchQuery) {
        const query = state.filter.searchQuery.toLowerCase();
        const matchesName = course.name.toLowerCase().includes(query);
        const matchesCode = course.code.toLowerCase().includes(query);
        const matchesTeacher = course.teacher.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesTeacher) return false;
      }
      
      if (state.filter.onlyAvailable) {
        if (course.status !== 'open') return false;
        if (course.enrolled >= course.capacity) return false;
      }
      
      return true;
    });
  }, [state.courses, state.filter]);
  
  const selectedCourses = useMemo(() => {
    return state.courses.filter(course =>
      state.currentStudent.selectedCourses.includes(course.id)
    );
  }, [state.courses, state.currentStudent.selectedCourses]);
  
  const totalCredits = useMemo(() => {
    return selectedCourses.reduce((sum, course) => sum + course.credits, 0);
  }, [selectedCourses]);
  
  const statistics = useMemo<Statistics>(() => ({
    totalCourses: state.courses.length,
    openCourses: state.courses.filter(c => c.status === 'open').length,
    fullCourses: state.courses.filter(c => c.enrolled >= c.capacity).length,
    totalStudents: 1,
    totalSelections: state.courses.reduce((sum, c) => sum + c.enrolled, 0),
  }), [state.courses]);
  
  const selectCourse = useCallback((courseId: string) => {
    dispatch({ type: 'SELECT_COURSE', payload: courseId });
  }, []);
  
  const dropCourse = useCallback((courseId: string) => {
    dispatch({ type: 'DROP_COURSE', payload: courseId });
  }, []);
  
  const setFilter = useCallback((filter: Partial<CourseFilter>) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);
  
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);
  
  const value: CourseContextType = {
    state,
    selectCourse,
    dropCourse,
    setFilter,
    clearError,
    filteredCourses,
    selectedCourses,
    totalCredits,
    statistics,
  };
  
  return React.createElement(CourseContext.Provider, { value }, children);
}

// Hook
export function useCourseStore() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseStore must be used within CourseProvider');
  }
  return context;
}

/**
 * 类型定义文件
 * 使用 TypeScript 定义所有数据结构的类型
 * 这是类型安全的基础
 */

// 课程状态
export type CourseStatus = 'open' | 'closed' | 'full';

// 课程类别
export type CourseCategory = 'required' | 'elective' | 'general';

// 星期
export type WeekDay = '周一' | '周二' | '周三' | '周四' | '周五';

// 课程接口
export interface Course {
  id: string;                    // 课程唯一ID
  code: string;                  // 课程代码（如：CS101）
  name: string;                  // 课程名称
  teacher: string;               // 授课教师
  credits: number;               // 学分
  category: CourseCategory;      // 课程类别
  status: CourseStatus;          // 课程状态
  capacity: number;              // 容量上限
  enrolled: number;              // 已选人数
  schedule: ScheduleItem[];      // 上课时间安排
  description: string;           // 课程描述
  location: string;              // 上课地点
}

// 课程安排项
export interface ScheduleItem {
  weekDay: WeekDay;              // 星期几
  startTime: string;             // 开始时间（如：08:00）
  endTime: string;               // 结束时间（如：09:40）
}

// 学生接口
export interface Student {
  id: string;                    // 学号
  name: string;                  // 姓名
  major: string;                 // 专业
  grade: number;                 // 年级
  maxCredits: number;            // 最大学分限制
  selectedCourses: string[];     // 已选课程ID列表
}

// 选课记录
export interface SelectionRecord {
  studentId: string;             // 学生ID
  courseId: string;              // 课程ID
  selectTime: number;            // 选课时间戳
  status: 'selected' | 'dropped'; // 状态
}

// 筛选条件
export interface CourseFilter {
  category: CourseCategory | 'all';
  searchQuery: string;
  onlyAvailable: boolean;
}

// 统计信息
export interface Statistics {
  totalCourses: number;
  openCourses: number;
  fullCourses: number;
  totalStudents: number;
  totalSelections: number;
}

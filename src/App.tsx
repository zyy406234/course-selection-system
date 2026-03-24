/**
 * 应用程序入口组件
 * 提供全局状态管理和路由
 */

import { CourseProvider } from '@/store/courseStore';
import { CourseSelectionPage } from '@/pages/CourseSelectionPage';
import { Toaster } from 'sonner';
import './App.css';

function App() {
  return (
    <CourseProvider>
      <Toaster position="top-center" richColors />
      <CourseSelectionPage />
    </CourseProvider>
  );
}

export default App;


import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { ITLines } from "./components/ITLines";
import { Students } from "./components/Students";
import { TopStudents } from "./components/TopStudents";
import { AboutSchool } from "./components/AboutSchool";
import { Forum } from "./components/Forum";
import { AdminLogin } from "./components/AdminLogin";
import { AdminPanel } from "./components/AdminPanel";
// DatabaseSetup removed as requested
import { supabase } from './supabaseClient';
import { toast, Toaster } from 'sonner';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

export interface Olympiad {
  id: number;
  name: string;
  date: string;
  location: string;
  registration: string;
}

export interface SchedulePDF {
  id: number;
  title: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
}

export interface TopStudent {
  id: number;
  rank: number;
  name: string;
  grade: string;
  gpa: number;
  achievements: number;
  specialty: string;
}

export interface ForumPost {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: ForumReply[];
}

export interface ForumReply {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

type Page =
  | "it-lines"
  | "top-students"
  | "about"
  | "forum"
  | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("it-lines");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Состояния данных
  const [news, setNews] = useState<NewsItem[]>([]);
  const [olympiads, setOlympiads] = useState<Olympiad[]>([]);
  const [schedulePDFs, setSchedulePDFs] = useState<SchedulePDF[]>([]);
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);

  // Состояния загрузки и ошибок
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Универсальная функция для обработки real-time изменений
  const handleRealtimeChange = <T extends { id: number }>(
    payload: any,
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    switch (payload.eventType) {
      case 'INSERT':
        setState((prev) => [payload.new as T, ...prev]);
        break;
      case 'UPDATE':
        setState((prev) =>
          prev.map((item) => (item.id === payload.new.id ? payload.new : item))
        );
        break;
      case 'DELETE':
        setState((prev) => prev.filter((item) => item.id !== payload.old.id));
        break;
    }
  };

  useEffect(() => {
    // Загрузка всех данных при монтировании
    async function fetchAllData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch each independently to avoid one failure crashing everything
        const fetchTable = async (table: string, setter: Function, orderBy: string, ascending = false) => {
          try {
            const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending });
            if (error) throw error;
            setter(data || []);
          } catch (e: any) {
            console.warn(`Failed to fetch ${table}:`, e.message);
            // Don't set global error, just log it. This allows the app to load even if tables are missing.
          }
        };

        await Promise.all([
          fetchTable('news', setNews, 'date', false),
          fetchTable('olympiads', setOlympiads, 'date', false),
          fetchTable('schedule_pdfs', setSchedulePDFs, 'uploadDate', false),
          fetchTable('top_students', setTopStudents, 'rank', true),
          fetchTable('forum_posts', setForumPosts, 'timestamp', false),
        ]);

      } catch (err: any) {
        setError(err.message);
        console.error('Ошибка загрузки данных:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();

    // Real-time подписки
    // We wrap this in a try-catch block or just allow it to fail silently if connection is bad
    try {
      const channels = [
        supabase.channel('news-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, (p) => handleRealtimeChange(p, setNews)).subscribe(),
        supabase.channel('olympiads-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'olympiads' }, (p) => handleRealtimeChange(p, setOlympiads)).subscribe(),
        supabase.channel('pdfs-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'schedule_pdfs' }, (p) => handleRealtimeChange(p, setSchedulePDFs)).subscribe(),
        supabase.channel('top-students-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'top_students' }, (p) => handleRealtimeChange(p, setTopStudents)).subscribe(),
        supabase.channel('forum-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'forum_posts' }, (p) => handleRealtimeChange(p, setForumPosts)).subscribe(),
      ];

      return () => {
        channels.forEach(channel => supabase.removeChannel(channel));
      };
    } catch (e) {
      console.error("Realtime subscription failed:", e);
    }
  }, []);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage("it-lines");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" richColors />
      <Header />
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* DatabaseSetup removed as requested */}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === "it-lines" && (
          <ITLines news={news} olympiads={olympiads} schedulePDFs={schedulePDFs} />
        )}
     
        {currentPage === "top-students" && <TopStudents students={topStudents} />}
        {currentPage === "about" && <AboutSchool />}
        {currentPage === "forum" && <Forum posts={forumPosts} setPosts={setForumPosts} />}
        {currentPage === "admin" &&
          (isAdminAuthenticated ? (
            <AdminPanel
              onLogout={handleAdminLogout}
              news={news}
              setNews={setNews}
              olympiads={olympiads}
              setOlympiads={setOlympiads}
              schedulePDFs={schedulePDFs}
              setSchedulePDFs={setSchedulePDFs}
              topStudents={topStudents}
              setTopStudents={setTopStudents}
              forumPosts={forumPosts}
              setForumPosts={setForumPosts}
            />
          ) : (
            <AdminLogin onLogin={handleAdminLogin} />
          ))}
      </main>
    </div>
  );
}

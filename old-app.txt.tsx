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

import { supabase } from './supabaseClient';

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
  | "students"
  | "top-students"
  | "about"
  | "forum"
  | "admin";



// LocalStorage keys
const STORAGE_KEYS = {
  NEWS: "itschool_news",
  OLYMPIADS: "itschool_olympiads",
  SCHEDULE_PDFS: "itschool_schedule_pdfs",
  TOP_STUDENTS: "itschool_top_students",
  FORUM_POSTS: "itschool_forum_posts",
};



export default function App(){

  const [currentPage, setCurrentPage] =
    useState<Page>("it-lines");
  const [isAdminAuthenticated, setIsAdminAuthenticated] =
    useState(false);
  
  const [news, setNews] = useState<NewsItem[]>([]);
 

  const [olympiads, setOlympiads] = useState<Olympiad[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OLYMPIADS);
    return saved ? JSON.parse(saved) : [];
  });

  const [schedulePDFs, setSchedulePDFs] = useState<
    SchedulePDF[]
  >(() => {
    const saved = localStorage.getItem(
      STORAGE_KEYS.SCHEDULE_PDFS,
    );
    return saved ? JSON.parse(saved) : [];
  });

  const [topStudents, setTopStudents] = useState<TopStudent[]>(
    () => {
      const saved = localStorage.getItem(
        STORAGE_KEYS.TOP_STUDENTS,
      );
      return saved ? JSON.parse(saved) : [];
    },
  );

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(
    () => {
      const saved = localStorage.getItem(
        STORAGE_KEYS.FORUM_POSTS,
      );
      return saved ? JSON.parse(saved) : [];
    },
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.NEWS,
      JSON.stringify(news),
    );
  }, [news]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.OLYMPIADS,
      JSON.stringify(olympiads),
    );
  }, [olympiads]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SCHEDULE_PDFS,
      JSON.stringify(schedulePDFs),
    );
  }, [schedulePDFs]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.TOP_STUDENTS,
      JSON.stringify(topStudents),
    );
  }, [topStudents]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.FORUM_POSTS,
      JSON.stringify(forumPosts),
    );
  }, [forumPosts]);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage("it-lines");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === "it-lines" && (
          <ITLines
            news={news}
            olympiads={olympiads}
            schedulePDFs={schedulePDFs}
          />
        )}
        {currentPage === "students" && <Students />}
        {currentPage === "top-students" && (
          <TopStudents students={topStudents} />
        )}
        {currentPage === "about" && <AboutSchool />}
        {currentPage === "forum" && (
          <Forum posts={forumPosts} setPosts={setForumPosts} />
        )}
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
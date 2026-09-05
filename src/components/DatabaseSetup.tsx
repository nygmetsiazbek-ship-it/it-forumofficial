import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { AlertTriangle, Database, XCircle, Code, HelpCircle, Copy, Check } from 'lucide-react';

export function DatabaseSetup() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [missingTables, setMissingTables] = useState<string[]>([]);
  const [showSql, setShowSql] = useState(false);
  const [copied, setCopied] = useState(false);

  const tables = ['news', 'olympiads', 'schedule_pdfs', 'top_students', 'forum_posts'];

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setStatus('loading');
      setMissingTables([]);
      
      // 1. Check basic connection by fetching from a likely existing table or just checking auth
      const { error } = await supabase.from('news').select('count', { count: 'exact', head: true });
      
      if (error) {
        // If error is code 404 or "relation does not exist", the table is missing
        if (error.code === '42P01') {
          // Verify each table individually
          const missing = [];
          for (const table of tables) {
            const { error: tableError } = await supabase.from(table).select('count', { count: 'exact', head: true });
            if (tableError && tableError.code === '42P01') {
              missing.push(table);
            }
          }
          setMissingTables(missing);
          if (missing.length > 0) {
            setStatus('error');
            setErrorMessage('Missing tables detected');
            return;
          }
        } else if (error.code === 'PGRST301' || error.message?.includes('JWT')) {
            setStatus('error');
            setErrorMessage('Auth error. Check API keys.');
            return;
        } else {
             // Other errors (like RLS) shouldn't block the UI entirely, but we can warn
             console.warn("Connection check warning:", error);
        }
      }

      setStatus('connected');
    } catch (err: any) {
      console.error("Database check failed:", err);
      setStatus('error');
      setErrorMessage(err.message || 'Unknown error');
    }
  };

  const sqlScript = `-- Create Tables
create table if not exists news (
  id serial primary key,
  title text not null,
  date text not null,
  content text not null
);

create table if not exists olympiads (
  id serial primary key,
  name text not null,
  date text not null,
  location text not null,
  registration text not null
);

create table if not exists schedule_pdfs (
  id serial primary key,
  title text not null,
  "fileName" text not null,
  "fileUrl" text not null,
  "uploadDate" text not null
);

create table if not exists top_students (
  id serial primary key,
  rank integer not null,
  name text not null,
  grade text not null,
  gpa float not null,
  achievements integer not null,
  specialty text not null
);

create table if not exists forum_posts (
  id serial primary key,
  author text not null,
  title text not null,
  content text not null,
  timestamp text not null,
  likes integer default 0,
  replies jsonb default '[]'::jsonb
);

-- Enable Realtime
alter publication supabase_realtime add table news;
alter publication supabase_realtime add table olympiads;
alter publication supabase_realtime add table schedule_pdfs;
alter publication supabase_realtime add table top_students;
alter publication supabase_realtime add table forum_posts;

-- Allow public access (Fix for RLS errors 42501)
create policy "Allow public read news" on news for select using (true);
create policy "Allow public insert news" on news for insert with check (true);
create policy "Allow public update news" on news for update using (true);
create policy "Allow public delete news" on news for delete using (true);

create policy "Allow public read olympiads" on olympiads for select using (true);
create policy "Allow public insert olympiads" on olympiads for insert with check (true);
create policy "Allow public update olympiads" on olympiads for update using (true);
create policy "Allow public delete olympiads" on olympiads for delete using (true);

create policy "Allow public read pdfs" on schedule_pdfs for select using (true);
create policy "Allow public insert pdfs" on schedule_pdfs for insert with check (true);
create policy "Allow public delete pdfs" on schedule_pdfs for delete using (true);

create policy "Allow public read students" on top_students for select using (true);
create policy "Allow public insert students" on top_students for insert with check (true);
create policy "Allow public update students" on top_students for update using (true);
create policy "Allow public delete students" on top_students for delete using (true);

create policy "Allow public read forum" on forum_posts for select using (true);
create policy "Allow public insert forum" on forum_posts for insert with check (true);
create policy "Allow public update forum" on forum_posts for update using (true);
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Always show a small help button if status is connected but hidden, 
  // or show the full error panel if error.
  if (status === 'connected' && !showSql) {
    return (
      <button 
        onClick={() => setShowSql(true)}
        className="fixed bottom-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-blue-600 transition-colors z-50 border border-gray-200"
        title="Database Help"
      >
        <HelpCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 max-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database size={20} className={status === 'error' ? 'text-red-500' : 'text-blue-500'} />
          <h3 className="font-semibold">Database Setup</h3>
        </div>
        <button onClick={() => setShowSql(false)} className="text-gray-400 hover:text-gray-600">
            <XCircle size={18} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {status === 'error' && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4">
            <div className="flex items-center gap-2 mb-1 font-semibold">
              <AlertTriangle size={16} />
              Error: {errorMessage}
            </div>
            {missingTables.length > 0 && (
              <p>Missing tables: {missingTables.join(', ')}</p>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              If you see <strong>"row violates row-level security policy"</strong> errors or missing tables, 
              run this SQL in your Supabase Dashboard:
            </p>
          </div>

          <div className="relative bg-gray-900 rounded-lg p-4">
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
              title="Copy SQL"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
            <pre className="text-xs text-blue-300 font-mono overflow-x-auto p-1">
              <code>{sqlScript}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

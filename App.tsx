
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import { fetchLogsFromServer } from './services/db';

enum View {
  DASHBOARD = 'DASHBOARD',
  CALENDAR = 'CALENDAR'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    // Carica i dati dal database condiviso (Docker backend) all'avvio
    fetchLogsFromServer().finally(() => setIsSyncing(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      {/* Navigation (Hidden during print) */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setCurrentView(View.DASHBOARD)}>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 transform group-hover:rotate-12 transition-transform">
                   <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <span className="text-lg md:text-xl font-black text-slate-900 tracking-tight hidden sm:block">CHRONOS</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentView(View.DASHBOARD)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                    currentView === View.DASHBOARD 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView(View.CALENDAR)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                    currentView === View.CALENDAR 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  Report
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] md:text-sm font-bold text-slate-900 leading-none">Admin</span>
                <span className={`text-[8px] md:text-xs font-medium ${isSyncing ? 'text-amber-500 animate-pulse' : 'text-emerald-500'}`}>
                  {isSyncing ? 'Sincronizzazione...' : 'Database Connesso'}
                </span>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-slate-400">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 w-full">
        {currentView === View.DASHBOARD ? <Dashboard /> : <CalendarView />}
      </main>

      {/* Footer (Hidden during print) */}
      <footer className="bg-white border-t border-slate-100 py-6 md:py-8 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-[10px] md:text-sm">
            &copy; {new Date().getFullYear()} Chronos Management. Gestione presenze professionale.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

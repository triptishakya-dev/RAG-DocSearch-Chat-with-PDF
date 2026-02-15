'use client';

import React from 'react';
import { ChatSection } from '@/components/ChatSection';
import { DocumentList } from '@/components/DocumentList';

// --- Main Page Component ---
const Page = () => {
  return (
    <div className="h-screen w-full bg-white overflow-hidden flex flex-col">
      <main className="flex-1 flex overflow-hidden w-full">
         {/* Chat Section - Left Side - Fixed Width (e.g., 400px or 30%) */}
         <div className="w-[400px] shrink-0 h-full border-r border-slate-200 z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
            <ChatSection />
         </div>

         {/* Document List - Right Side - Flexible Width */}
         <div className="flex-1 h-full min-w-0 bg-slate-50/30">
             <DocumentList />
         </div>
      </main>
    </div>
  );
};

export default Page;
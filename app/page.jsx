import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
// Using direct relative paths to eliminate the module resolution error
import Comments from '../components/Comments'; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-950 text-zinc-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-8">
        
        <header className="text-center mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r select-none from-teal-400 to-emerald-400">
            The Living Alexandria
          </h1>
          <p className="text-zinc-400 mt-2">Synchronized Video Commenting Platform</p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Video Section */}
          <div className="lg:col-span-2 w-full bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-2xl">
            <VideoPlayer />
          </div>

          {/* Synchronized Sidebar Comments */}
          <div className="w-full h-[600px] bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
            <Comments />
          </div>
        </div>

      </div>
    </main>
  );
}
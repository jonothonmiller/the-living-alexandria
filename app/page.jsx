import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import Comments from './components/Comments';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-zinc-950 text-zinc-50">
      <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-8">
        
        <header className="text-center my-4">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 select-none">
            The Living Alexandria
          </h1>
          <p className="text-zinc-400 mt-2">Synchronized Video Commenting Platform</p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 w-full bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-2xl">
            <VideoPlayer />
          </div>
          <div className="w-full h-[450px] bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
            <Comments />
          </div>
        </div>

      </div>
    </main>
  );
}
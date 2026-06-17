'use client';
import React from 'react';

export default function VideoPlayer() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[350px] bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800">
      {/* Placeholder player - we can link your real video source/ID here */}
      <div className="w-full aspect-video bg-black flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-xs">Video Stream Container</p>
      </div>
      <div className="p-4 w-full border-t border-zinc-800 bg-zinc-900/50">
        <h2 className="text-sm font-semibold text-zinc-200">The Living Alexandria Primary Stream</h2>
      </div>
    </div>
  );
}
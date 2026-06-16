'use client';
import React, { useState } from 'react';

export default function Comments() {
  const [commentText, setCommentText] = useState('');

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <p className="text-xs text-zinc-500 font-mono">--- Connected to live timeline feed ---</p>
        <div className="bg-zinc-950 p-3 rounded border border-zinc-800/60">
          <span className="text-xs font-bold text-teal-400 block mb-1">00:14</span>
          <p className="text-sm text-zinc-300">Welcome to The Living Alexandria interface.</p>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="mt-4 pt-4 border-t border-zinc-800">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a synchronized timestamp note..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </form>
    </div>
  );
}
'use client';
import React, { useState, useEffect, useRef } from 'react';
import supabase from '../supabase';

export default function Home() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeComments, setActiveComments] = useState([]);
  const [inputText, setInputText] = useState("");
  const [capturedTime, setCapturedTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pull records from Supabase live
  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('video_timestamp', { ascending: true });
      
      if (!error && data) {
        // Show comments within a 15-second window of playhead
        const filtered = data.filter(c => Math.abs((c.video_timestamp || 0) - currentTime) <= 15);
        setActiveComments(filtered);
      } else if (error) {
        console.error("Supabase Stream Error:", error.message);
      }
    }
    fetchComments();
  }, [currentTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(Math.floor(videoRef.current.currentTime));
    }
  };

  const captureMarker = () => {
    if (videoRef.current) setCapturedTime(Math.floor(videoRef.current.currentTime));
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase
      .from('comments')
      .insert([
        {
          video_timestamp: capturedTime,
          author: 'Independent Node',
          content: inputText,
          is_verified: false
        }
      ]);

    if (!error) {
      setInputText("");
      setCurrentTime(prev => prev + 0.001); // Quick UI update toggle to reload state
    } else {
      console.error("Write back error:", error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 font-serif selection:bg-neutral-800">
      <header className="border-b border-neutral-900 pb-4 max-w-6xl w-full mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl tracking-widest text-neutral-200 uppercase font-light">THE LIVING ALEXANDRIA</h1>
          <p className="text-[10px] tracking-wider font-mono text-neutral-500 uppercase mt-0.5">Core Humanities Stack // Active Database Pipeline</p>
        </div>
        <span className="text-xs font-mono text-emerald-500 bg-emerald-950/20 px-2 py-1 border border-emerald-900/30 rounded-sm">
          🟢 Engine Linked
        </span>
      </header>

      <main className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Interactive Media Screen */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video bg-black rounded-sm border border-neutral-900 overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src=""https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
              controls
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full"
            />
          </div>
          <div className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-sm text-xs flex justify-between items-center font-mono">
            <span className="text-neutral-500">SYSTEM GATEWAY STATE: SECURE DATA NODE</span>
            <span className="text-emerald-400">PLAYHEAD MARKS: {Math.floor(currentTime / 60)}m {currentTime % 60}s</span>
          </div>
        </div>

        {/* Right: Cloud Dialogue stream */}
        <div className="flex flex-col h-[480px] bg-neutral-900/20 border border-neutral-900 rounded-sm p-4">
          <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-mono border-b border-neutral-900 pb-3 mb-4">Contextual Dialogue Stream</h3>
          
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
            {activeComments.length === 0 ? (
              <p className="text-xs text-neutral-600 italic text-center pt-12">No data rows returned for this timestamp.</p>
            ) : (
              activeComments.map(c => {
                const ts = c.video_timestamp || 0;
                const isVerified = c.is_verified || false;
                return (
                  <div key={c.id} className={`p-3 text-xs border ${isVerified ? 'border-emerald-900/30 bg-emerald-950/10' : 'border-neutral-900 bg-neutral-950/40'} rounded-sm`}>
                    <div className="flex justify-between text-neutral-500 mb-1 font-mono text-[10px]">
                      <span>{c.author}</span>
                      <span>{Math.floor(ts / 60)}m {ts % 60}s</span>
                    </div>
                    <p className="text-neutral-300 font-sans leading-relaxed">{c.content}</p>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={submitComment} className="border-t border-neutral-900 pt-4 space-y-2">
            <button type="button" onClick={captureMarker} className="text-[10px] font-mono bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-2 py-1 rounded-sm text-neutral-400 transition-colors">
              Set Anchor Flag to ({Math.floor(capturedTime / 60)}m {capturedTime % 60}s)
            </button>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Submit an empirical assertion to the table storage..."
              className="w-full h-16 bg-neutral-950 border border-neutral-900 rounded-sm p-2 text-xs font-sans text-neutral-300 focus:outline-none focus:border-neutral-800 resize-none"
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-wider py-2 rounded-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Transmitting Data...' : 'Commit to Database'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
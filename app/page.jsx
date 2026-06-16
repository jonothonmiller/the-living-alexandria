'use client';

import React, { useState, useEffect, useRef } from 'react';
import supabase from './supabase'; // Adjusted to './' assuming it lives in your app directory

export default function Home() {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [allComments, setAllComments] = useState([]); // Holds master list from DB
  const [activeComments, setActiveComments] = useState([]); // Holds filtered comments shown on screen
  const [inputText, setInputText] = useState("");
  const [capturedTime, setCapturedTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch records from Supabase ONCE when the component mounts
  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('video_timestamp', { ascending: true });

      if (!error && data) {
        setAllComments(data);
      } else if (error) {
        console.error("Supabase Stream Error:", error.message);
      }
    }
    fetchComments();
  }, []); // Empty dependency array ensures this runs exactly once, not on every tick

  // 2. Filter comments in local memory whenever the video playback time updates
  useEffect(() => {
    if (allComments.length === 0) {
      setActiveComments([]);
      return;
    }

    // Show comments within a 15-second window of playhead
    const filtered = allComments.filter(c => 
      Math.abs((c.video_timestamp || 0) - currentTime) <= 15
    );
    
    setActiveComments(filtered);
  }, [currentTime, allComments]); // Runs locally and instantly without hitting the network

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>The Living Alexandria</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Video Player Section */}
        <div style={{ flex: 2 }}>
          <video 
            ref={videoRef}
            controls 
            src="https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video, swap with yours
            style={{ width: '100%', borderRadius: '8px' }}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
              }
            }}
          />
          <p style={{ marginTop: '10px', color: '#666' }}>
            Current Time: <strong>{currentTime.toFixed(1)}s</strong>
          </p>
        </div>

        {/* Dynamic Comments Timeline Section */}
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '15px', maxHeight: '400px', overflowY: 'auto' }}>
          <h3>Synchronized Comments</h3>
          {activeComments.length === 0 ? (
            <p style={{ color: '#999', fontStyle: 'italic' }}>No comments in this window.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {activeComments.map((comment) => (
                <li key={comment.id} style={{ marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#0070f3', fontWeight: 'bold' }}>

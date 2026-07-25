import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Persona from './components/Persona';
import Forge from './components/Forge';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import FilesHub from './components/FilesHub';
import Dashboards from './components/Dashboards';

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const followCursor = () => {
      setRingPos((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.15,
        y: prev.y + (cursorPos.y - prev.y) * 0.15,
      }));
    };

    const animId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animId);
  }, [cursorPos]);

  return (
    <div className="app-main">
      {/* Background Mesh Grid */}
      <div className="bg-mesh"></div>
      <div className="bg-grid-overlay"></div>

      {/* Custom Cursor Ring */}
      <div
        className="custom-cursor"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>
      <div
        className="custom-cursor-ring"
        style={{ left: `${ringPos.x}px`, top: `${ringPos.y}px` }}
      ></div>

      {/* Main Header Nav */}
      <Header />

      {/* Main Sections */}
      <main>
        <Hero />
        <Persona />
        <Forge />
        <Projects />
        <Certificates />
        <FilesHub />
        <Dashboards />
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} ZAHEDUL ISLAM. Built with React & Vite • White & #80ed99 Mint Theme.</p>
        </div>
      </footer>
    </div>
  );
}

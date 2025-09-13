// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

// 1. Definição do tipo para o objeto de partícula
interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  animationType: 'twinkle' | 'float' | 'drift';
}

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  size?: "icon" | "default";
  className?: string;
  [key: string]: any;
}

const Button = ({
  children,
  onClick,
  size = "default",
  className,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "flex items-center justify-center p-3 rounded-md transition-colors";
  const sizeClasses = {
    default: "",
    icon: "w-10 h-10 md:w-12 md:h-12",
  };
  const finalClasses = `${baseClasses} ${sizeClasses[size]} ${className || ""}`;

  return (
    <button onClick={onClick} className={finalClasses} {...props}>
      {children}
    </button>
  );
};

export default function Dashboard() {
  const [isDayMode, setIsDayMode] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    document.title = "Inventário";

    const imageUrl =
      "https://abrale.org.br/wp-content/uploads/2024/10/hospital-mario-covas.jpg";
    const svgFavicon = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="favCircle"><circle cx="16" cy="16" r="16" /></clipPath></defs><image href="${imageUrl}" x="0" y="0" width="32" height="32" clip-path="url(#favCircle)" /></svg>`;
    const faviconUrl = `data:image/svg+xml,${encodeURIComponent(svgFavicon)}`;

    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link") as HTMLLinkElement;
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;

    const particleCount = window.innerWidth < 768 ? 25 : 50;
    const animationTypes: ('twinkle' | 'float' | 'drift')[] = ['twinkle', 'float', 'drift'];
    
    const newParticles: Particle[] = Array.from(
      { length: particleCount },
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
      })
    );
    setParticles(newParticles);
  }, []);

  const toggleMode = () => {
    setIsDayMode(!isDayMode);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ease-in-out relative overflow-hidden ${
        isDayMode
          ? "bg-gradient-to-br from-sky-200 via-sky-100 to-blue-50"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"
      }`}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 p-4 md:p-6">
        <div
          className={`flex items-center gap-3 backdrop-blur-xl border rounded-2xl px-4 py-2 md:px-6 md:py-3 transition-all duration-500 ${
            isDayMode
              ? "bg-white/20 border-white/30 shadow-lg"
              : "bg-white/5 border-white/10 shadow-2xl"
          }`}
        >
          <img
            src="https://abrale.org.br/wp-content/uploads/2024/10/hospital-mario-covas.jpg"
            alt="Hospital Mário Covas"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover filter brightness-110"
          />
          <h1
            className={`text-base md:text-xl font-semibold bg-gradient-to-r bg-clip-text text-transparent ${
              isDayMode
                ? "from-blue-600 to-blue-800"
                : "from-blue-300 to-blue-100"
            }`}
          >
            Inventário
          </h1>
        </div>
      </header>

      {/* Day/Night Toggle */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <Button
          onClick={toggleMode}
          size="icon"
          className={`rounded-full w-12 h-12 md:w-14 md:h-14 backdrop-blur-xl border transition-all duration-500 hover:scale-110 active:scale-95 ${
            isDayMode
              ? "bg-orange-400/90 hover:bg-orange-500/90 border-orange-300/50 text-white shadow-lg shadow-orange-200/50"
              : "bg-slate-700/90 hover:bg-slate-600/90 border-slate-500/50 text-blue-100 shadow-lg shadow-slate-800/50"
          }`}
        >
          {isDayMode ? (
            <Moon className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Sun className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </Button>
      </div>

      {/* Sun (Day Mode) */}
      {isDayMode && (
        <div className="absolute top-16 right-20 w-16 h-16 md:top-20 md:right-32 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl shadow-yellow-300/50 animate-pulse">
          <div className="absolute inset-1 md:inset-2 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 opacity-80"></div>
          <div className="absolute -inset-2 md:-inset-4 rounded-full bg-yellow-300/30 animate-ping"></div>
        </div>
      )}

      {/* Moon (Night Mode) */}
      {!isDayMode && (
        <div className="absolute top-16 right-20 w-16 h-16 md:top-20 md:right-32 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-2xl shadow-blue-300/30 animate-moon-glow">
          <div className="absolute inset-1 md:inset-1 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 opacity-90"></div>
          <div className="absolute top-4 right-6 w-1 h-1 md:w-2 md:h-2 rounded-full bg-gray-400/60"></div>
          <div className="absolute bottom-6 left-4 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-400/40"></div>
          <div className="absolute top-8 left-6 w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-gray-400/50"></div>
          {/* Aura da lua */}
          <div className="absolute -inset-4 md:-inset-6 rounded-full bg-blue-200/10 animate-pulse"></div>
        </div>
      )}

      {/* Constellation Lines (Night Mode) */}
      {!isDayMode && (
        <div className="fixed inset-0 pointer-events-none z-5 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1200 800">
            <line x1="10%" y1="20%" x2="25%" y2="30%" stroke="rgb(147, 197, 253)" strokeWidth="1" opacity="0.4" className="animate-constellation-fade" />
            <line x1="25%" y1="30%" x2="35%" y2="15%" stroke="rgb(147, 197, 253)" strokeWidth="1" opacity="0.3" className="animate-constellation-fade" style={{ animationDelay: '1s' }} />
            <line x1="70%" y1="25%" x2="85%" y2="40%" stroke="rgb(147, 197, 253)" strokeWidth="1" opacity="0.4" className="animate-constellation-fade" style={{ animationDelay: '2s' }} />
            <line x1="85%" y1="40%" x2="90%" y2="20%" stroke="rgb(147, 197, 253)" strokeWidth="1" opacity="0.3" className="animate-constellation-fade" style={{ animationDelay: '0.5s' }} />
            <line x1="40%" y1="60%" x2="55%" y2="70%" stroke="rgb(147, 197, 253)" strokeWidth="1" opacity="0.4" className="animate-constellation-fade" style={{ animationDelay: '1.5s' }} />
            <line x1="15%" y1="70%" x2="30%" y2="85%" stroke="rgb(147, 197, 253)" strokeWidth="1" opacity="0.3" className="animate-constellation-fade" style={{ animationDelay: '2.5s' }} />
          </svg>
        </div>
      )}

      {/* Shooting Stars (Night Mode) */}
      {!isDayMode && (
        <div className="fixed inset-0 pointer-events-none z-5">
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
          <div className="shooting-star shooting-star-3"></div>
        </div>
      )}

      {/* Clouds (Day Mode) - Hidden on mobile */}
      {isDayMode && (
        <>
          <div className="absolute top-32 left-20 animate-float hidden md:block">
            <div className="flex items-center">
              <div className="w-16 h-12 bg-white/80 rounded-full shadow-lg"></div>
              <div className="w-20 h-16 bg-white/90 rounded-full -ml-4 shadow-lg"></div>
              <div className="w-14 h-10 bg-white/80 rounded-full -ml-4 shadow-lg"></div>
            </div>
          </div>
          <div className="absolute top-48 right-64 animate-float-delayed hidden lg:block">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-white/70 rounded-full shadow-md"></div>
              <div className="w-16 h-12 bg-white/80 rounded-full -ml-3 shadow-md"></div>
              <div className="w-10 h-7 bg-white/70 rounded-full -ml-3 shadow-md"></div>
            </div>
          </div>
          <div className="absolute top-80 left-1/3 animate-float hidden md:block">
            <div className="flex items-center">
              <div className="w-20 h-14 bg-white/85 rounded-full shadow-lg"></div>
              <div className="w-24 h-18 bg-white/90 rounded-full -ml-5 shadow-lg"></div>
              <div className="w-18 h-12 bg-white/80 rounded-full -ml-5 shadow-lg"></div>
            </div>
          </div>
        </>
      )}

      {/* Enhanced Particles/Stars */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {particles.map((particle) => {
          let animationClass = '';
          let particleStyle = '';
          
          if (isDayMode) {
            animationClass = 'animate-bounce';
            particleStyle = 'bg-white/60';
          } else {
            switch (particle.animationType) {
              case 'twinkle':
                animationClass = 'animate-star-twinkle';
                particleStyle = 'bg-blue-200';
                break;
              case 'float':
                animationClass = 'animate-star-float';
                particleStyle = 'bg-blue-100';
                break;
              case 'drift':
                animationClass = 'animate-star-drift';
                particleStyle = 'bg-blue-300';
                break;
            }
          }

          return (
            <div
              key={particle.id}
              className={`absolute rounded-full transition-all duration-1000 ${particleStyle} ${animationClass}`}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: isDayMode ? particle.opacity * 0.3 : particle.opacity,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                boxShadow: !isDayMode ? `0 0 ${particle.size * 2}px rgba(147, 197, 253, 0.3)` : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen w-full px-4 md:px-8 pt-24 pb-20 relative z-20">
        <div className="w-full max-w-7xl h-full">
          <div
            className={`relative w-full h-[calc(100vh-180px)] min-h-[450px] md:min-h-[600px] rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-700 ${
              isDayMode
                ? "bg-white/30 border-white/40 shadow-2xl shadow-blue-200/30"
                : "bg-white/5 border-white/10 shadow-2xl shadow-black/40"
            } backdrop-blur-xl border-2`}
          >
            {/* Glow Effect */}
            <div
              className={`absolute -inset-0.5 rounded-3xl transition-all duration-1000 ${
                isDayMode
                  ? "bg-gradient-to-r from-blue-300/20 via-sky-200/30 to-blue-300/20"
                  : "bg-gradient-to-r from-blue-600/20 via-blue-400/30 to-blue-600/20"
              } blur-sm animate-pulse`}
            ></div>

            {/* Dashboard Iframe */}
            <iframe
              title="Inventário"
              src="https://app.powerbi.com/view?r=eyJrIjoiNjdhYzRkY2EtY2E3OS00YjNjLTljZGEtNDgwNjZmOWRkNDIyIiwidCI6IjgwYTM2ZDViLWI3YmItNDNkMS05ODgxLTI2YTcxMmE5MTU2ZCJ9"
              className="relative z-10 w-full h-full border-none"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </main>

      {/* Wave Animation (Night Mode) */}
      {!isDayMode && (
        <div className="fixed bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-32 md:h-48 animate-wave-slow"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
              fill="url(#wave-gradient-1)"
              opacity="0.3"
            ></path>
            <defs>
              <linearGradient
                id="wave-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-[200%] h-28 md:h-44 animate-wave-medium"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C200,20 400,120 600,80 C800,40 1000,100 1200,80 L1200,120 L0,120 Z"
              fill="url(#wave-gradient-2)"
              opacity="0.4"
            ></path>
            <defs>
              <linearGradient
                id="wave-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Footer Profissional */}
      <footer
        className={`absolute bottom-0 w-full z-30 text-center py-3 backdrop-blur-xl border-t transition-all duration-500 ${
          isDayMode
            ? "bg-white/20 border-white/30 text-gray-700"
            : "bg-black/10 border-white/10 text-blue-200"
        }`}
      >
        <p className="text-xs sm:text-sm font-medium tracking-wide">
          © 2025 | Desenvolvido por{" "}  
          <a
            href="https://github.com/Barreto0620"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-inherit"
          >
            Gabriel Barreto
          </a>
          {" "}&{" "}
          <a
            href="https://github.com/Nicodcruz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-inherit"
          >
            Nicolas Cruz
          </a>
        </p>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(-5px) translateX(-5px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(8px);
          }
        }

        @keyframes wave-slow {
          0%,
          100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-48%) translateY(-20px);
          }
        }

        @keyframes wave-medium {
          0%,
          100% {
            transform: translateX(-50%) translateY(10px);
          }
          50% {
            transform: translateX(-52%) translateY(-15px);
          }
        }

        @keyframes star-twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          25% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          75% {
            opacity: 0.6;
            transform: scale(0.9);
          }
        }

        @keyframes star-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-8px) translateX(-8px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) translateX(5px) rotate(270deg);
          }
        }

        @keyframes star-drift {
          0% {
            transform: translateX(0px) translateY(0px);
            opacity: 1;
          }
          50% {
            transform: translateX(30px) translateY(-20px);
            opacity: 0.5;
          }
          100% {
            transform: translateX(-20px) translateY(10px);
            opacity: 1;
          }
        }

        @keyframes moon-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 197, 253, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 197, 253, 0.5);
          }
        }

        @keyframes constellation-fade {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes shooting-star {
          0% {
            transform: translateX(-100px) translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(-200px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-wave-slow {
          animation: wave-slow 15s ease-in-out infinite;
        }

        .animate-wave-medium {
          animation: wave-medium 18s ease-in-out infinite;
        }

        .animate-star-twinkle {
          animation: star-twinkle 3s ease-in-out infinite;
        }

        .animate-star-float {
          animation: star-float 6s ease-in-out infinite;
        }

        .animate-star-drift {
          animation: star-drift 8s ease-in-out infinite;
        }

        .animate-moon-glow {
          animation: moon-glow 4s ease-in-out infinite;
        }

        .animate-constellation-fade {
          animation: constellation-fade 4s ease-in-out infinite;
        }

        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: linear-gradient(45deg, #ffffff, #93c5fd);
          border-radius: 50%;
          box-shadow: 0 0 10px #93c5fd;
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          width: 50px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #93c5fd);
          transform: translateY(-50%);
        }

        .shooting-star-1 {
          top: 20%;
          animation: shooting-star 3s linear infinite;
          animation-delay: 2s;
        }

        .shooting-star-2 {
          top: 40%;
          animation: shooting-star 4s linear infinite;
          animation-delay: 8s;
        }

        .shooting-star-3 {
          top: 60%;
          animation: shooting-star 5s linear infinite;
          animation-delay: 15s;
        }
      `}</style>
    </div>
  );
}
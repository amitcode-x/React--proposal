import { useState, useEffect } from "react";
import { Heart, Sparkles, Star } from "lucide-react";

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [noPos, setNoPos] = useState({ top: "60%", left: "60%" });
  const [showConfetti, setShowConfetti] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);
  const [noClickCount, setNoClickCount] = useState(0);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate floating hearts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 5,
          size: Math.random() * 20 + 10,
        });
      }
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  const moveNoButton = () => {
    const newTop = Math.random() * 70 + 10 + "%";
    const newLeft = Math.random() * 70 + 10 + "%";
    setNoPos({ top: newTop, left: newLeft });
    setNoClickCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    // Add celebration hearts
    const celebrationHearts = [];
    for (let i = 0; i < 50; i++) {
      celebrationHearts.push({
        id: `celebration-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 2,
        size: Math.random() * 30 + 15,
      });
    }
    setHearts(prev => [...prev, ...celebrationHearts]);
  };

  const getNoButtonText = () => {
    const texts = ["No", "sach me nhi?", "fir se soch lo ek bar aur!", "nahi?", "Last chance!", "Please say yes! 🥺"];
    return texts[Math.min(noClickCount, texts.length - 1)];
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-500/20 to-indigo-600/20 animate-pulse"></div>
      
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-bounce opacity-20"
          style={{
            left: `${heart.left}%`,
            top: heart.top ? `${heart.top}%` : 'auto',
            animationDelay: `${heart.animationDelay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Parallax Stars */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-white/30 animate-pulse"
            size={Math.random() * 20 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
        {/* Step 0: Name Input */}
        {step === 0 && (
          <div className="w-full max-w-md mx-auto transform transition-all duration-1000 ease-out scale-100 opacity-100">
            <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl shadow-2xl border border-white/30 transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <Heart className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-fade-in">
                  Aap ka name kya hain✨
                </h1>
                <p className="text-white/80 text-sm">Tell me your beautiful name</p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full p-4 rounded-2xl bg-white/90 text-gray-800 placeholder-gray-500 border-2 border-pink-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all duration-300 text-center font-medium"
                  onKeyPress={(e) => e.key === 'Enter' && name && setStep(1)}
                />
                <button
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => name && setStep(1)}
                  disabled={!name}
                >
                  <span className="flex items-center justify-center gap-2">
                    Click me <Sparkles className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="w-full max-w-md mx-auto transform transition-all duration-1000 ease-out">
            <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl shadow-2xl border border-white/30 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Hii {name}! 🌹
                </h1>
                <p className="text-white/80 text-lg mb-4">
                kuch special hai Apk liye... ❤️
                </p>
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart 
                      key={i} 
                      className="w-6 h-6 text-red-400 animate-pulse" 
                      style={{ animationDelay: `${i * 0.2}s` }} 
                    />
                  ))}
                </div>
              </div>
              
              <button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => setStep(2)}
              >
                <span className="flex items-center justify-center gap-2">
                  dekhna hai to click me <Star className="w-5 h-5 animate-spin" />
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: First Question */}
        {step === 2 && (
          <div className="w-full max-w-lg mx-auto transform transition-all duration-1000 ease-out">
            <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl shadow-2xl border border-white/30 text-center">
              <div className="mb-6">
                <div className="w-40 h-40 mx-auto mb-6 overflow-hidden shadow-2xl  ring-pink-300 transform hover:scale-110 transition-all duration-300">
                  <img
                    src="https://media.tenor.com/p_VEcmrBsLMAAAAj/manja.gif"
                    alt="cute"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Do you love me? 💕
                </h2>
                <p className="text-white/80 text-lg">Do you love me?</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={handleYesClick}
                >
                  Yes! ❤️
                </button>
                <button
                  className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => setStep(3)}
                >
                  No 😔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Second Chance */}
        {step === 3 && (
          <div className="w-full max-w-lg mx-auto transform transition-all duration-1000 ease-out">
            <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl shadow-2xl border border-white/30 text-center">
              <div className="mb-6">
                <div className="w-40 h-40 mx-auto mb-6 rounded-xl overflow-hidden shadow-2xl  ring-blue-300 transform hover:scale-110 transition-all duration-300">
                  <img
                    src="https://media.tenor.com/dltr8Wx24g8AAAAj/mochi.gif"
                    alt="thinking"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Soch lo ache se... 🥺
                </h2>
                <p className="text-white/80 text-lg mb-4">Think carefully now!</p>
                <div className="animate-bounce mb-4">💭</div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={handleYesClick}
                >
                 Yes! 💚
                </button>
                <button
                  className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => setStep(4)}
                >
                  No 😤
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Final Persuasion with Moving No Button */}
        {step === 4 && (
          <div className="w-full max-w-lg mx-auto relative min-h-[500px] flex items-center justify-center">
            <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl shadow-2xl border border-white/30 text-center relative z-10">
              <div className="mb-6">
                <div className="w-40 h-40 mx-auto mb-6 rounded-xl overflow-hidden shadow-2xl  ring-purple-300 transform hover:scale-110 transition-all duration-300">
                  <img
                    src="https://media.tenor.com/tzvzrz4famQAAAAj/couple-forgive-me.gif"
                    alt="pleading"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Maan jao na yarr kitna bhav khaogi??? 🥺💕
                </h2>
                <p className="text-white/80 text-lg mb-4">Please say yes! How much attitude will you show?</p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(7)].map((_, i) => (
                    <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                      🥺
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 mb-8 flex items-center justify-center gap-2 mx-auto"
                onClick={handleYesClick}
              >
              Haa bol do na! 💚✨
              </button>
            </div>
            
            {/* Moving No Button */}
            <button
              className="absolute bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:scale-110 transition-all duration-300 z-20"
              style={{ 
                top: noPos.top, 
                left: noPos.left,
                transform: 'translate(-50%, -50%)'
              }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              {getNoButtonText()}
            </button>
          </div>
        )}

        {/* Confetti Celebration */}
        {showConfetti && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-pink-500/90 to-purple-600/90 backdrop-blur-sm z-50">
            {/* Animated Confetti Effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${1 + Math.random() * 2}s`,
                  }}
                >
                  {['❤️', '💕', '💖', '💗', '🌹', '✨', '💫', '🎉'][Math.floor(Math.random() * 8)]}
                </div>
              ))}
            </div>
            
            <div className="text-center z-10 px-4">
              <div className="animate-pulse mb-6">
                <Heart className="w-24 h-24 text-red-300 mx-auto mb-4 animate-spin" />
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-bounce">
                🎉 😍😍😍😍😍😍! 🎉
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 animate-pulse">
                I KNEW YOU'D SAY YES! ❤️
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {name},LOVE YOU🥰🥰😍😍😍! 💕
              </p>
              
              <div className="w-50 h-50 md:w-56 md:h-56 mx-auto  overflow-hidden shadow-2xl  ring-white/50 animate-pulse">
                <img
                  src="https://media.tenor.com/6jaDm2Pv6dUAAAAi/dare-aggie-dare-aggie-bunny.gif"
                  alt="celebration"
                  className="w-full h-full object-cover"
                />
                
              </div>
              
              <div className="mt-8 flex justify-center gap-2">
                {[...Array(10)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className="w-8 h-8 text-red-300 animate-pulse" 
                    style={{ animationDelay: `${i * 0.1}s` }} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
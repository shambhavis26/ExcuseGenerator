import React, { useState } from 'react';
import { Bed, Brain, Calendar, ChevronRight, Moon, ArrowLeft, SmilePlus } from 'lucide-react';

type Category = 'initial' | 'question' | 'excuses';
type ExcuseType = 'chill' | 'sherlock' | 'pusher';

const excuses = {
  chill: [
    "I'm in the middle of a really good book, can't stop now!",
    "My cat looks too comfortable on my lap to move.",
    "I'm already in my comfy clothes, no going back.",
    "Started a new TV series, totally hooked.",
    "My social battery needs recharging.",
    "The weather is perfect for staying in.",
    "I'm having a deep conversation with my plants.",
    "My bed and I have plans.",
    "I'm practicing the art of doing nothing.",
    "Mercury is in retrograde, better stay home."
  ],
  sherlock: [
    "I think I'm coming down with something mysterious.",
    "My neighbor's been acting suspicious, need to investigate.",
    "Lost my lucky socks, can't go out without them.",
    "Mercury is in retrograde AND my horoscope said to lay low.",
    "The stars aren't aligned for social interactions today.",
    "I'm conducting a very important experiment on Netflix algorithms.",
    "My pet goldfish seems depressed, need to monitor.",
    "The air pressure isn't optimal for my rare houseplants.",
    "I'm tracking a pattern in my sleep cycle data.",
    "My Wi-Fi's acting up, might be aliens."
  ],
  pusher: [
    "I'm on a strict self-imposed quarantine for personal growth.",
    "I've committed to a 24-hour meditation challenge.",
    "I'm attending a virtual conference in a different time zone.",
    "My life coach scheduled an emergency session.",
    "I'm meal prepping for the next three weeks.",
    "I'm reorganizing my entire digital life.",
    "I'm in the middle of a home improvement project.",
    "I've started a 1000-piece puzzle, can't abandon it now.",
    "I'm documenting my indoor plant's growth hourly.",
    "I'm writing my autobiography, deadline approaching."
  ]
};

function App() {
  const [stage, setStage] = useState<Category>('initial');
  const [selectedType, setSelectedType] = useState<ExcuseType | null>(null);
  const [excuse, setExcuse] = useState<string>('');
  const [titlePosition, setTitlePosition] = useState(0);

  const handleNext = () => {
    if (stage === 'initial') {
      setTitlePosition(-100);
      setTimeout(() => setStage('question'), 500);
    }
  };

  const goHome = () => {
    setStage('initial');
    setSelectedType(null);
    setExcuse('');
    setTitlePosition(0);
  };

  const selectType = (type: ExcuseType) => {
    setSelectedType(type);
    setStage('excuses');
    const randomIndex = Math.floor(Math.random() * excuses[type].length);
    setExcuse(excuses[type][randomIndex]);
  };

  const getNewExcuse = () => {
    if (selectedType) {
      const randomIndex = Math.floor(Math.random() * excuses[selectedType].length);
      setExcuse(excuses[selectedType][randomIndex]);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0B1026 0%, #2A4B7C 100%)',
        backgroundImage: `url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80")`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Animated stars overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(1px 1px at 50% 50%, white 100%, transparent 100%)',
          backgroundSize: '100px 100px',
          opacity: 0.5
        }}
      />
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-2xl relative">
        {stage !== 'initial' && (
          <button
            onClick={goHome}
            className="absolute top-4 left-4 text-[#2C3333] hover:text-[#1A1F1F] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        {stage === 'initial' && (
          <div 
            className="text-center transition-transform duration-500"
            style={{ transform: `translateY(${titlePosition}px)` }}
          >
            <h1 className="text-4xl font-bold text-[#2C3333] mb-8">
              You should go out more
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={handleNext}
                className="bg-[#2A4B7C] text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-[#1A3B6C] transition-colors"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-4xl" role="img" aria-label="yawning face">😪</span>
            </div>
            <Moon className="w-16 h-16 text-[#FFD700] mx-auto animate-bounce" />
          </div>
        )}

        {stage === 'question' && (
          <div className="text-center animate-fadeIn">
            <h2 className="text-3xl font-bold text-[#2C3333] mb-8">
              Knock, Knock! Who's there?
            </h2>
            <div className="grid gap-4">
              <button
                onClick={() => selectType('chill')}
                className="flex items-center justify-center gap-3 bg-[#E3F4F4] hover:bg-[#D4ECEC] text-[#2C3333] px-6 py-4 rounded-lg text-xl font-medium transition-colors"
              >
                <Bed className="w-6 h-6" /> Chill Champs
              </button>
              <button
                onClick={() => selectType('sherlock')}
                className="flex items-center justify-center gap-3 bg-[#D2E9E9] hover:bg-[#C3DADA] text-[#2C3333] px-6 py-4 rounded-lg text-xl font-medium transition-colors"
              >
                <Brain className="w-6 h-6" /> Sherlock Souls
              </button>
              <button
                onClick={() => selectType('pusher')}
                className="flex items-center justify-center gap-3 bg-[#C4DFDF] hover:bg-[#B5D0D0] text-[#2C3333] px-6 py-4 rounded-lg text-xl font-medium transition-colors"
              >
                <Calendar className="w-6 h-6" /> Plan Pushers
              </button>
            </div>
          </div>
        )}

        {stage === 'excuses' && (
          <div className="text-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#2C3333] mb-6">Your Excuse:</h2>
            <p className="text-xl text-[#2C3333] mb-8 p-6 bg-[#E3F4F4] rounded-lg">
              {excuse}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={getNewExcuse}
                className="bg-[#2A4B7C] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#1A3B6C] transition-colors"
              >
                Generate Another
              </button>
              <button
                onClick={() => setStage('question')}
                className="bg-[#E3F4F4] text-[#2C3333] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#D4ECEC] transition-colors"
              >
                Change Category
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
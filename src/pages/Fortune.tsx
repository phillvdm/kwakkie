import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FortuneTeller from '../components/FortuneTeller';

// Color definitions with their cycle counts
const outerColors = [
  { name: 'Yellow', hex: '#FAD02E', cycleCount: 6 }, // "Yellow" has 6 letters
  { name: 'Peach', hex: '#FF9A76', cycleCount: 5 },  // "Peach" has 5 letters
  { name: 'Teal', hex: '#79A8A9', cycleCount: 4 },   // "Teal" has 4 letters
  { name: 'Purple', hex: '#9B59B6', cycleCount: 6 }  // "Purple" has 6 letters
];

const innerColors = [
  { name: 'Blue', hex: '#A8D8EA', cycleCount: 4 },    // "Blue" has 4 letters
  { name: 'Green', hex: '#AACDBE', cycleCount: 5 },   // "Green" has 5 letters
  { name: 'Rose', hex: '#E6B0AA', cycleCount: 4 },    // "Rose" has 4 letters
  { name: 'Lavender', hex: '#D7BDE2', cycleCount: 8 } // "Lavender" has 8 letters
];

const fortuneAnswers = [
  "Nope.",
  "Why not?",
  "If there's any doubt, there's no doubt.",
  "Absolutely!",
  "Ask Roland",
  "Alma would know the answer",
  "That's definitely a maybe",
  "You already know the answer friend :)"
];

type StageType = 'question' | 'outerColors' | 'animation' | 'innerColors' | 'finalAnimation' | 'answer';

const Fortune: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<StageType>('question');
  const [question, setQuestion] = useState('');
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [answer, setAnswer] = useState('');
  const [fadeState, setFadeState] = useState('');
  const [selectedInnerColor, setSelectedInnerColor] = useState<typeof innerColors[0] | null>(null);

  // Handle question submission
  const handleQuestionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFadeState('fade-out');
    setTimeout(() => {
      setStage('outerColors');
      setFadeState('fade-in');
    }, 500);
  };

  // Handle outer color selection
  const handleOuterColorSelect = (color: typeof outerColors[0]) => {
    setCycleCount(color.cycleCount);
    setFadeState('fade-out');
    setTimeout(() => {
      setStage('animation');
      setFadeState('fade-in');
      setIsAnimationPlaying(true);
    }, 500);
  };

  // Handle first animation completion
  const handleAnimationComplete = useCallback(() => {
    setIsAnimationPlaying(false);
    setFadeState('fade-out');
    setTimeout(() => {
      setStage('innerColors');
      setFadeState('fade-in');
    }, 500);
  }, []);

  // Handle inner color selection
  const handleInnerColorSelect = (color: typeof innerColors[0]) => {
    setSelectedInnerColor(color);
    setCycleCount(color.cycleCount);
    setFadeState('fade-out');
    setTimeout(() => {
      setStage('finalAnimation');
      setFadeState('fade-in');
      setIsAnimationPlaying(true);
    }, 500);
  };

  // Handle final animation completion
  const handleFinalAnimationComplete = useCallback(() => {
    setIsAnimationPlaying(false);
    const randomAnswer = fortuneAnswers[Math.floor(Math.random() * fortuneAnswers.length)];
    setAnswer(randomAnswer);
    setFadeState('fade-out');
    setTimeout(() => {
      setStage('answer');
      setFadeState('fade-in');
    }, 500);
  }, []);

  // Reset the game
  const resetGame = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setStage('question');
      setQuestion('');
      setAnswer('');
      setSelectedInnerColor(null);
      setFadeState('fade-in');
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1D4523] p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Question becomes heading after submission */}
        {stage !== 'question' && (
          <h1 className="text-3xl mb-6 text-center text-white">{question}</h1>
        )}
        
        <div className={`mb-8 p-6 bg-white rounded-lg shadow-md text-center w-full max-w-md transition-opacity duration-500 ${fadeState === 'fade-out' ? 'opacity-0' : 'opacity-100'}`}>
          {/* Question input stage */}
          {stage === 'question' && (
            <form onSubmit={handleQuestionSubmit} className="space-y-4">
              <h2 className="text-xl text-[#1D4523] mb-4">What question do you have for the fates?</h2>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 border-2 border-[#2D5533] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4523]"
                placeholder="Enter your question..."
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#2D5533] text-white rounded-lg shadow transition-all hover:bg-[#1D4523]"
              >
                Ask the Fates
              </button>
            </form>
          )}

          {/* Outer colors selection stage */}
          {stage === 'outerColors' && (
            <div className="space-y-4">
              <FortuneTeller 
                isPlaying={false} 
                cycleCount={0} 
                onAnimationComplete={() => {}} 
                speedMultiplier={2}
              />
              <div className="grid grid-cols-2 gap-3 mt-4">
                {outerColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleOuterColorSelect(color)}
                    className="p-3 text-white rounded-lg shadow transition-all hover:opacity-90"
                    style={{ backgroundColor: color.hex }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* First animation stage */}
          {stage === 'animation' && (
            <div>
              <FortuneTeller 
                isPlaying={isAnimationPlaying} 
                cycleCount={cycleCount} 
                onAnimationComplete={handleAnimationComplete}
                speedMultiplier={2} 
              />
              <p className="mt-4 text-[#1D4523]">The fates are considering your question...</p>
            </div>
          )}

          {/* Inner colors selection stage */}
          {stage === 'innerColors' && (
            <div className="space-y-4">
              <FortuneTeller 
                isPlaying={false} 
                cycleCount={0} 
                onAnimationComplete={() => {}}
                speedMultiplier={2} 
              />
              <div className="grid grid-cols-2 gap-3 mt-4">
                {innerColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleInnerColorSelect(color)}
                    className="p-3 text-white rounded-lg shadow transition-all hover:opacity-90"
                    style={{ backgroundColor: color.hex }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Final animation stage */}
          {stage === 'finalAnimation' && (
            <div>
              <FortuneTeller 
                isPlaying={isAnimationPlaying} 
                cycleCount={cycleCount} 
                onAnimationComplete={handleFinalAnimationComplete}
                speedMultiplier={3} 
              />
              <p className="mt-4 text-[#1D4523]">The fates are revealing your answer...</p>
            </div>
          )}

          {/* Answer stage */}
          {stage === 'answer' && (
            <div className="mt-4 p-4 bg-[#FDF7E4] rounded-lg border-2 border-[#2D5533]">
              <p className="text-xl text-[#1D4523] font-bold">{answer}</p>
              <button
                onClick={resetGame}
                className="mt-4 px-6 py-2 bg-[#2D5533] text-white rounded-lg shadow transition-all hover:bg-[#1D4523]"
              >
                Ask Another Question
              </button>
            </div>
          )}
        </div>
        
        <button 
          className="fortune-button"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Fortune;
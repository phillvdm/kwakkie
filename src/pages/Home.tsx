import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ImageOff } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1D4523] p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl mb-6 text-center text-white">JUDY SE KWAKKIE</h1>
        
        <div className="mb-8 w-full max-w-sm flex justify-center">
          {imageError ? (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg w-full h-64">
              <ImageOff size={48} className="text-gray-400 mb-2" />
              <p className="text-gray-600">Image could not be loaded</p>
            </div>
          ) : (
            <img 
              src="https://raw.githubusercontent.com/phillvdm/kwakkie/main/assets/judy_image.svg"
              alt="Judy illustration" 
              className="w-full h-auto rounded-lg"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        
        <button 
          className="fortune-button"
          onClick={() => navigate('/fortune')}
        >
          Learn your fortune
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Home;
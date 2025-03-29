import React, { useRef, useEffect, useState } from 'react';

interface FortuneTellerProps {
  isPlaying: boolean;
  cycleCount: number;
  onAnimationComplete: () => void;
  speedMultiplier?: number;
}

const FortuneTeller: React.FC<FortuneTellerProps> = ({ 
  isPlaying, 
  cycleCount, 
  onAnimationComplete,
  speedMultiplier = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const previousSineValueRef = useRef<number | null>(null);
  const quarterCyclesRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const width = 300;
    const height = 300;
    const w = 100;
    
    let animationFrameId: number;
    
    // Reset cycle counting when animation starts
    if (isPlaying) {
      setCyclesCompleted(0);
      quarterCyclesRef.current = 0;
      previousSineValueRef.current = null;
    }
    
    const draw = () => {
      // Calculate sin value for animation and cycle tracking
      // Use speedMultiplier to make the animation faster
      const timeScale = 666.67 / speedMultiplier;
      const sineValue = Math.sin(Date.now() / timeScale);
      
      // Detect cycles - focus only on positive-to-negative crossings
      // to count complete cycles more accurately
      if (previousSineValueRef.current !== null && isPlaying) {
        // Only count when crossing from positive to negative (one complete cycle)
        if (previousSineValueRef.current >= 0 && sineValue < 0) {
          setCyclesCompleted(prev => prev + 1);
        }
      }
      previousSineValueRef.current = sineValue;
      
      // Animation calculations
      let x = (Math.sin(Date.now() / timeScale) + 1) / 2 * w;
      x = Math.max(x, w / 2) - (w / 2);
      let y = (Math.sin(Date.now() / timeScale + Math.PI) + 1) / 2 * w;
      y = Math.max(y, w / 2) - (w / 2);
      
      context.clearRect(0, 0, width, height);
      
      // Inside triangles - soft, muted colors
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      
      // NE
      context.fillStyle = '#A8D8EA';  // Soft blue
      context.beginPath();
      context.moveTo(width/2 + x, height/2 - y);
      context.lineTo(width/2, height/2);
      context.lineTo(width/2 + w, height/2);
      context.fill();
      context.stroke();
      
      context.beginPath();
      context.moveTo(width/2 + x, height/2 - y);
      context.lineTo(width/2, height/2);
      context.lineTo(width/2, height/2 - w);
      context.fill();
      context.stroke();
      
      // SE
      context.fillStyle = '#AACDBE';  // Sage green
      context.beginPath();
      context.moveTo(width/2 + x, height/2 + y);
      context.lineTo(width/2, height/2);
      context.lineTo(width/2 + w, height/2);
      context.fill();
      context.stroke();
      
      context.beginPath();
      context.moveTo(width/2 + x, height/2 + y);
      context.lineTo(width/2, height/2);
      context.lineTo(width/2, height/2 + w);
      context.fill();
      context.stroke();
      
      // NW
      context.fillStyle = '#E6B0AA';  // Dusty rose
      context.beginPath();
      context.moveTo(width/2 - x, height/2 - y);
      context.lineTo(width/2, height/2);
      context.lineTo(width/2 - w, height/2);
      context.fill();
      context.stroke();
      
      context.beginPath();
      context.moveTo(width/2 - x, height/2 - y);
      context.lineTo(width/2, height/2);
      context.lineTo(width/2, height/2 - w);
      context.fill();
      context.stroke();
      
      // SW
      context.fillStyle = '#D7BDE2';  // Soft lavender
      context.beginPath();
      context.moveTo(width/2 - x, height/2 + y);
      context.lineTo(width/2, height/2);
      context.lineTo(width/2 - w, height/2);
      context.fill();
      context.stroke();
      
      context.beginPath();
      context.moveTo(width/2 - x, height/2 + y);
      context.lineTo(width/2, height/2);
      context.lineTo(width/2, height/2 + w);
      context.fill();
      context.stroke();
      
      // Outside quadrilaterals - brighter, complementary colors
      context.lineWidth = 2;
      context.strokeStyle = 'black';
      
      // NE
      context.fillStyle = '#FAD02E';  // Warm yellow
      context.beginPath();
      context.moveTo(width/2 + x, height/2 - y);
      context.lineTo(width/2 + w, height/2);
      context.lineTo(width/2 + w - x, height/2 - w + y);
      context.lineTo(width/2, height/2 - w);
      context.closePath();
      context.fill();
      context.stroke();
      
      // SE
      context.fillStyle = '#FF9A76';  // Peach
      context.beginPath();
      context.moveTo(width/2 + x, height/2 + y);
      context.lineTo(width/2 + w, height/2);
      context.lineTo(width/2 + w - x, height/2 + w - y);
      context.lineTo(width/2, height/2 + w);
      context.closePath();
      context.fill();
      context.stroke();
      
      // NW
      context.fillStyle = '#79A8A9';  // Teal
      context.beginPath();
      context.moveTo(width/2 - x, height/2 - y);
      context.lineTo(width/2 - w, height/2);
      context.lineTo(width/2 - w + x, height/2 - w + y);
      context.lineTo(width/2, height/2 - w);
      context.closePath();
      context.fill();
      context.stroke();
      
      // SW
      context.fillStyle = '#9B59B6';  // Amethyst purple
      context.beginPath();
      context.moveTo(width/2 - x, height/2 + y);
      context.lineTo(width/2 - w, height/2);
      context.lineTo(width/2 - w + x, height/2 + w - y);
      context.lineTo(width/2, height/2 + w);
      context.closePath();
      context.fill();
      context.stroke();
      
      if (isPlaying) {
        animationFrameId = window.requestAnimationFrame(draw);
      }
    };
    
    // Draw initial static state even if not playing
    draw();
    
    // Only continue animation loop if isPlaying is true
    if (isPlaying) {
      animationFrameId = window.requestAnimationFrame(draw);
    }
    
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, speedMultiplier]);
  
  // Check if we've completed the required number of cycles
  useEffect(() => {
    if (cyclesCompleted >= cycleCount && isPlaying) {
      onAnimationComplete();
    }
  }, [cyclesCompleted, cycleCount, isPlaying, onAnimationComplete]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={300} 
      className="mx-auto"
    />
  );
};

export default FortuneTeller;
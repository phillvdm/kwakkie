// Create and return a canvas element with the animation
export function createKwakkie(containerElement) {
    const width = 300;
    const height = 300;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    
    const w = 100; // Base size of each square section
    
    function animate() {
        let fold = (Math.sin(Date.now() / 1000) + 1) / 2; // Value between 0 and 1
        
        context.clearRect(0, 0, width, height);
        context.strokeStyle = '#000000';
        context.lineWidth = 2;
        
        // Center point of the fortune teller
        const centerX = width/2;
        const centerY = height/2;
        
        // Draw the base squares first
        function drawSquare(x, y, size, color) {
            context.fillStyle = color;
            context.beginPath();
            context.rect(x, y, size, size);
            context.fill();
            context.stroke();
        }
        
        // Draw a corner triangle
        function drawCornerTriangle(x, y, size, position, color) {
            context.fillStyle = color;
            context.beginPath();
            
            if (position === 'topLeft') {
                context.moveTo(x, y);
                context.lineTo(x + size, y);
                context.lineTo(x, y + size);
            } else if (position === 'topRight') {
                context.moveTo(x + size, y);
                context.lineTo(x + size, y + size);
                context.lineTo(x, y);
            } else if (position === 'bottomLeft') {
                context.moveTo(x, y + size);
                context.lineTo(x + size, y + size);
                context.lineTo(x, y);
            } else if (position === 'bottomRight') {
                context.moveTo(x + size, y + size);
                context.lineTo(x, y + size);
                context.lineTo(x + size, y);
            }
            
            context.closePath();
            context.fill();
            context.stroke();
        }
        
        // Draw the four main squares
        drawSquare(centerX - w, centerY - w, w, '#E6A4B4');  // Top Left (Pink)
        drawSquare(centerX, centerY - w, w, '#98C1D9');      // Top Right (Blue)
        drawSquare(centerX - w, centerY, w, '#A8D8EA');      // Bottom Left (Light Blue)
        drawSquare(centerX, centerY, w, '#B8E0D2');          // Bottom Right (Green)
        
        // Size of the corner triangles (scaled by animation)
        const triangleSize = w/3 * fold;
        
        // Draw the corner triangles
        // Top Left square
        drawCornerTriangle(centerX - w, centerY - w, triangleSize, 'topRight', '#45B7D1');
        
        // Top Right square
        drawCornerTriangle(centerX, centerY - w, triangleSize, 'topLeft', '#FF6B6B');
        
        // Bottom Left square
        drawCornerTriangle(centerX - w, centerY, triangleSize, 'bottomRight', '#96CEB4');
        
        // Bottom Right square
        drawCornerTriangle(centerX, centerY, triangleSize, 'bottomLeft', '#4ECDC4');
        
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate();
    
    // If a container element is provided, append the canvas to it
    if (containerElement) {
        containerElement.appendChild(canvas);
    }
    
    // Return the canvas element
    return canvas;
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const outputBox = document.getElementById('output-box');

    const getRandomColor = () => {
      // Improved color randomization for better visual appeal
      return `hsl(${Math.random() * 360}, 80%, 50%)`;
    };

    const disintegrateText = (text) => {
      outputBox.textContent = ''; // Clear previous content

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.style.color = getRandomColor(); // Set random color for each letter
        outputBox.appendChild(charSpan);

        // Improved timing and randomization for smoother animation
        setTimeout(() => {
          charSpan.style.visibility = 'hidden'; // Hide the character after a delay
          setTimeout(() => {
            charSpan.style.visibility = 'visible'; // Reveal the character after a delay
          }, Math.random() * 500 + 100); // Delay range: 100ms to 600ms
        }, i * 75); // Delay between characters: 75ms per character
      }

      // Restart animation with a controlled and randomized interval
      setTimeout(() => {
        disintegrateText(text);
      }, text.length * 75 + Math.random() * 1000); // Delay range: text length * 75ms to 1750ms
    };

    // Show buttons after 20 seconds, with slight randomization for variation
    setTimeout(() => {
      setShowButtons(true);
    }, 10000 + Math.random() * 500); // Delay range: 20s to 20.5s

    disintegrateText('Welcome');
  }, []);

  console.log('showButtons:', showButtons); // Check if showButtons is updating

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div id="output-box" style={{ fontSize: '10vw' }}></div>
      {showButtons && ( // Ensure conditional rendering to display buttons only when showButtons is true
        <div style={{ marginTop: '10vw', display: 'flex' }}>
          {/* Enhanced styling and customization for the buttons */}
          <button style={{ '--x': '50%',
              '--y': '50%',
              position: 'relative',
              '-webkit-appearance': 'none',
              '-moz-appearance': 'none',
              appearance: 'none',
              padding: '1em 2em',
              color: 'white',
              cursor: 'pointer',
              outline: 'none',
              borderRadius: '100px',
              width: '100px',
              border: '2px solid transparent',
              background:
                'linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box' }} 
                onClick={() => console.log('Button 1 clicked')}>Sign In</button>
                <Link to="/SignUp" style={{}}>
          <button style={{ '--x': '50%',
              '--y': '50%',
              position: 'relative',
              '-webkit-appearance': 'none',
              '-moz-appearance': 'none',
              appearance: 'none',
              padding: '1em 2em !important',
              color: 'white',
              cursor: 'pointer',
              outline: 'none',
              borderRadius: '100px',
              width: '100px',
              border: '2px solid transparent',
              background:
                'linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box',
              marginLeft: '10px' }} 
              onClick={() => console.log('Button 2 clicked')}>Sign Up
              </button>
              </Link>
        </div>
      )}
    </div>
  );
};

export default Welcome;

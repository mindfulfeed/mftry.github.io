import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './How.styles.css';

const How = () => {
  const navigate = useNavigate();
  const textElementRef = useRef(null);

  useEffect(() => {
    // Function to generate a random number within a range
    function getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Function to generate a random color
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      const colors = ['#00AAFF', '#FF9300', '#AD54FF', '#FE0050'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const transparency = 0.2; // Random value between 0 and 1
      const transparentColor = randomColor + Math.floor(transparency * 255).toString(16);
      return transparentColor;
    }

    // Create the canvas element and set its size
    const canvas = document.getElementById('background-canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';

    // Create an array to store the particles
    const particles = [];

    // Function to create a particle object
    function createParticle() {
      const x = getRandomNumber(0, canvas.width);
      const y = getRandomNumber(0, canvas.height);
      const radius = getRandomNumber(20, 50);
      const color = getRandomColor();
      const speedX = getRandomNumber(-1, 1) * (canvas.width / 500); // Adjust speed based on canvas width
      const speedY = getRandomNumber(-2, 2) * (canvas.height / 500); // Adjust speed based on canvas height

      return {
        x,
        y,
        radius,
        color,
        speedX,
        speedY,
      };
    }

    // Function to update and draw the particles
    function updateParticles() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.fill();
        context.closePath();

        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          particle.x = getRandomNumber(0, canvas.width);
          particle.y = getRandomNumber(0, canvas.height);
        }
      });

      requestAnimationFrame(updateParticles);
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      particles.push(createParticle());
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    updateParticles();
  }, []);

  useEffect(() => {
    const textElement = textElementRef.current;
    const text = "At MindfulFeed, we provide you with a transformative system that guides you in shifting your <social media consumption> habits towards a mindful and intentional approach.";
    let index = 0;
    let isInTag = 0;
    let typingTimer;

    function typeWriter() {
      if (index < text.length) {
        const currentChar = text.charAt(index);
        if (currentChar === '<') {
          isInTag = 1;
        } else if (isInTag === 1) {
          isInTag = 2;
        } else if (currentChar === '>') {
          isInTag = 3;
        } else if (isInTag === 3) {
          isInTag = 0;
        }

        if (isInTag === 0) {
          textElement.innerHTML += currentChar;
        } else if (isInTag === 2) {
          textElement.innerHTML += `<span style='color: ${currentChar === '#' ? '' : '#00AAFF'};'>${currentChar}</span>`;
        }

        index++;
        typingTimer = setTimeout(typeWriter, 35);
      } else {
        clearTimeout(typingTimer); // Clear the typing timer after the text is fully typed
      }
    }

    typingTimer = setTimeout(typeWriter, 1000); // Start the typewriter animation after a delay

    return () => {
      clearTimeout(typingTimer); // Clear the typing timer on unmount
      textElement.innerHTML = ''; // Clear the typing text on unmount
    };
  }, []);

  const handleArrowButtonClick = () => {
    navigate('/login'); // Replace 'landing' with the correct URL to go to the Landing page
  };

  const handleLeftArrowButtonClick = () => {
    navigate('/Why'); // Replace 'how' with the correct URL to go to the How page
  };

  return (
    <>
      <div className="container">
        <div className="how-rounded-rectangle">
          <span className="text">HOW?</span>
        </div>
        <div className="how-rectangle" style={{ backgroundColor: '#000', fontSize: '20px' }}>
          <p ref={textElementRef} id="typing-text"></p>
        </div>
        <div className="how-rectangle" style={{ flexGrow: 1 }}></div>
      </div>
      <canvas id="background-canvas" />
      <button className="arrow-button" onClick={handleArrowButtonClick}></button>
      <button className="arrow-button left" onClick={handleLeftArrowButtonClick}></button>
    </>
  );
};

export default How;

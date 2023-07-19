import React, { useEffect } from 'react';
import './Landing.styles.css';
import { Link, useNavigate } from 'react-router-dom';
import zen from "../../assets//zen.svg";
import logo from "../../assets//logo.svg";
import mobile from "../../assets//t1.png";

const Landing = () => {
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

  const navigate = useNavigate();

  const updateURL = () => {
    const url = window.location.href;
    if (url.includes('/why.html')) {
      navigate('/why.html');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className="landing-container">
        <img src={mobile} alt="Mobile Image" className="center-image" />
        <img src={logo} alt="Logo Image" className="logo-image" />
      </div>
      <canvas id="background-canvas" />
      <button className="arrow-button" onClick={() => navigate('/why')} />
    </>
  );
};

export default Landing;

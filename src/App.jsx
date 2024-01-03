import { useEffect, useState } from 'react';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateRandomHexCode = (currentColor) => {
  const hexCodes = [currentColor];

  // Add two more random colors
  for (let i = 0; i < 2; i++) {
    let randomHexCode;
    do {
      randomHexCode = generateRandomColor();
    } while (hexCodes.includes(randomHexCode));

    hexCodes.push(randomHexCode);
  }

  // Shuffle the hex codes array to randomize the order
  shuffleArray(hexCodes);

  return hexCodes;
};

const App = () => {
  const [currentColor, setCurrentColor] = useState(generateRandomColor());
  const [hexCodes, setHexCodes] = useState(generateRandomHexCode(currentColor));
  const [feedback, setFeedback] = useState('');

  const handleButtonClick = (selectedHexCode) => {
    setFeedback(selectedHexCode === currentColor ? 'Correct!' : 'Incorrect');

    // Show feedback for 2 seconds before generating a new color and hex codes
    setTimeout(() => {
      const newColor = generateRandomColor();
      setCurrentColor(newColor);
      setHexCodes(generateRandomHexCode(newColor));
      setFeedback('');
    }, 1000);
  };

  useEffect(() => {
    setFeedback('');
  }, [currentColor]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-2" style={{ backgroundColor: currentColor, width: '100px', height: '100px' }}></div>
      <div>
        {hexCodes.map((hexCode, index) => (
          <button
            key={index}
            className="text-[1em] font-medium bg-[#1a1a1a] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent m-1"
            onClick={() => handleButtonClick(hexCode)}>
            {hexCode}
          </button>
        ))}
      </div>
      <p>{feedback}</p>
    </div>
  );
};

export default App;

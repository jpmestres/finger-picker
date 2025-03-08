import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import handImage from './assets/hand.png';

function App() {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [history, setHistory] = useState(() => {
    const savedHistory = Cookies.get('history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    Cookies.set('history', JSON.stringify(history), { expires: 7 });
  }, [history]);

  const handlePick = () => {
    let randomCircle;
    do {
      randomCircle = Math.floor(Math.random() * 5) + 1;
    } while (history.includes(randomCircle));

    setSelectedCircle(randomCircle);
    setHistory(prevHistory => {
      const newHistory = [...prevHistory, randomCircle];
      if (newHistory.length > 4) {
        newHistory.shift();
      }
      return newHistory;
    });
  };

  return (
    <>
      <div className="background-image">
        <div className={`circle circle1 ${selectedCircle === 1 ? 'selected' : ''}`}></div>
        <div className={`circle circle2 ${selectedCircle === 2 ? 'selected' : ''}`}></div>
        <div className={`circle circle3 ${selectedCircle === 3 ? 'selected' : ''}`}></div>
        <div className={`circle circle4 ${selectedCircle === 4 ? 'selected' : ''}`}></div>
        <div className={`circle circle5 ${selectedCircle === 5 ? 'selected' : ''}`}></div>
        <button className="pick-button" onClick={handlePick}>PICK</button>
      </div>
    </>
  );
}

export default App;
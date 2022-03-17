import React, { useEffect, useState } from 'react';
import '../scss/main.scss';
import Loader from './loader';
import pizza from '../images/pizza.png';
import axios from 'axios';
const Main = () => {
  const [bugs, setBugs] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [dropArr, setDropArr] = useState([]);
  const [indicatorDeg, setIndicatorDeg] = useState(null);
  // Getting the amount of bugs from the API
  const getBugsAmount = () => {
    const url = 'https://random-number-node-ge.herokuapp.com/';
    axios
      .get(url)
      .then((response) => {
        setBugs(response?.data[0]);
        generateDrops(response?.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const generateDrops = (bugs) => {
    let temp = [...dropArr];
    for (let i = 0; i < bugs; i++) {
      temp.push({
        index: i,
        opacity: Math.random(),
        top: Math.floor(Math.random() * 500 + 1),
        left: Math.floor(Math.random() * (window.outerWidth - 100 - 50 + 1) + 50),
        height: Math.floor(Math.random() * (40 - 20 + 1) + 20),
        width: Math.floor(Math.random() * (18 - 15 + 1) + 15),
      });
    }
    setDropArr(temp);
  };
  // Calculating the number of minutes until 17:00
  const calcMinutes = () => {
    const now = new Date();
    const deadline = new Date();
    deadline.setHours(17, 0, 0);
    const total = Date.parse(deadline) - now;
    let minutesLeft = Math.floor((total / 1000 / 60) % 60);
    let hoursLeft = Math.floor((total / (1000 * 60 * 60)) % 24);
    let totalMinutes = hoursLeft * 60 + minutesLeft;
    setTimeLeft(totalMinutes);
  };

  const calcChance = () => {
    let percent = ((bugs * 7) / timeLeft) * 100;
    let indicatorTemp = percent * 1.6 + 273;
    setIndicatorDeg(indicatorTemp.toFixed(0) > 427 ? 427 : indicatorTemp.toFixed(0));
    setPercentage(percent > 100 ? 100 : percent.toFixed(0));
  };

  useEffect(() => {
    getBugsAmount();
    calcMinutes();
  }, []);

  useEffect(() => {
    if (bugs !== 0 && timeLeft !== 0) {
      calcChance();
    }
  }, [bugs, timeLeft]);
  return (
    <div className="main">
      <div className="titles">
        {loading ? (
          <div className="loading-title">Calculating...</div>
        ) : (
          <>
            <div className="main-title">{`Rainy with ${percentage}% for Pizza`}</div>
            <div className="sub-title">
              <div className="bugs-amount"> {bugs}</div>
              <div className="bugs-text">
                {bugs > 1
                  ? ` bugs found and ${timeLeft} minutes are left until 17:00`
                  : ` bug found and ${timeLeft} minutes are left until 17:00`}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="drops">
        {dropArr.map(({ index, top, left, opacity, height, width }) => (
          <div key={index} className="drop" style={{ top, left, opacity, height, width }}></div>
        ))}
      </div>
      <div className="pizza-img-wrap">
        <img className="pizza-img" src={pizza} alt="pizza" />
        <div
          className="percent-indicator"
          style={{ transform: `rotate(${indicatorDeg}deg)`, transition: ' transform 0.5s ease' }}
        ></div>
      </div>
    </div>
  );
};

export default Main;

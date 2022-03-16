import React, { useEffect, useState } from 'react';
import '../scss/main.scss';
import Loader from './loader';
import pizza from '../images/pizza.png';
import axios from 'axios';
const Main = () => {
  const [bugs, setBugs] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');
  const [dropArr, setDropArr] = useState([]);

  // Getting the amount of bugs from the API
  const getBugsAmount = () => {
    const url = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=99&count=1';
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
    console.log(temp);
    setDropArr(temp);
  };
  // Calculating the number of minutes until 17:00
  const calcMinutes = () => {
    const now = new Date();
    const deadline = new Date();
    deadline.setHours(17, 0, 0);
    const total = Date.parse(deadline) - now;
    let minutesLeft = Math.floor((total / 1000 / 60) % 60);

    setTimeLeft(`${minutesLeft} minutes`);
  };

  const calcChance = () => {};
  useEffect(() => {
    getBugsAmount();
    calcMinutes();
  }, []);
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
                  ? ` bugs found and ${timeLeft} are left until 17:00`
                  : ` bug found and ${timeLeft} are left until 17:00`}
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
      </div>
    </div>
  );
};

export default Main;

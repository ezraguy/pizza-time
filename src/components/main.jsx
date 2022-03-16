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
        opacity: 1,
        topPos: Math.floor(Math.random() * 10 + 1),
        left: Math.floor(Math.random() * window.innerWidth + 1),
      });
    }
    setDropArr(temp);
    console.log(temp);
  };
  // Calculating the number of minutes until 17:00
  const calcMinutes = () => {
    const now = new Date();
    const deadline = new Date();
    deadline.setHours(17, 0, 0);
    const total = Date.parse(deadline) - now;
    let minutesLeft = Math.floor((total / 1000 / 60) % 60);
    let hoursLeft = Math.floor((total / (1000 * 60 * 60)) % 24);

    setTimeLeft(
      `${hoursLeft > 0 ? hoursLeft : 0} hours and ${minutesLeft > 0 ? minutesLeft : 0} minutes`
    );
  };
  useEffect(() => {
    getBugsAmount();
    calcMinutes();
  }, []);
  return (
    <div className="main">
      <div className="drops">
        {dropArr.map(({ index, topPos, left, opacity }) => (
          <div key={index} className="drop" style={{ top: topPos }}></div>
        ))}
      </div>
      <div className="main-title">{`Rainy with ${percentage}% for Pizza`}</div>
      <div className="sub-title">
        <span>{loading ? <Loader /> : bugs}</span>
        {bugs > 1
          ? ` bugs found and ${timeLeft} are left untill 17:00`
          : ` bug found and ${timeLeft} are left untill 17:00`}
      </div>
      <div className="pizza-img-wrap">
        <img className="pizza-img" src={pizza} alt="pizza" />
      </div>
    </div>
  );
};

export default Main;

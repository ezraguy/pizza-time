import React, { useEffect, useState } from 'react';
import '../scss/main.scss';
import Loader from './loader';
import pizza from '../images/pizza.png';
import axios from 'axios';
const Main = () => {
  const [bugs, setBugs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');
  // Getting the amount of bugs from the API
  const getBugsAmount = () => {
    const url = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=99&count=1';
    axios
      .get(url)
      .then((response) => {
        // handle success
        setBugs(response?.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  // Calculating the number of minutes until 17:00
  const calcMinutes = () => {
    const now = new Date();
    const deadline = new Date();
    deadline.setHours(17, 0, 0);
    console.log(now);
    const total = Date.parse(deadline) - now;
    const minutesLeft = Math.floor((total / 1000 / 60) % 60);
    const hoursLeft = Math.floor((total / (1000 * 60 * 60)) % 24);
    setTimeLeft(`${hoursLeft} hours and ${minutesLeft} miutes`);
    // const diff = Math.abs(new Date(today.now()) - new Date('2011/10/09 00:00'));
  };
  useEffect(() => {
    getBugsAmount();
    calcMinutes();
  }, []);
  return (
    <div className="main">
      <div className="main-title">{`Rainy with 23% for Pizza`}</div>

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

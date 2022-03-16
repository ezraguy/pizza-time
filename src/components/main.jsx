import React, { useEffect, useState } from 'react';
import '../scss/main.scss';
import pizza from '../images/pizza.png';
import axios from 'axios';
const Main = () => {
  const [bugs, setBugs] = useState(0);

  // Getting the amount of bugs from the API
  const getBugsAmount = () => {
    const url = 'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=99&count=1';
    axios
      .get(url)
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getBugsAmount();
  }, []);
  return (
    <div className="main">
      <div className="main-title">{`Rainy with 23% for Pizza`}</div>
      <div className="sub-title">{`7 bugs found and 90 minutes until 17:00`}</div>
      <div className="pizza-img-wrap">
        <img className="pizza-img" src={pizza} alt="pizza" />
      </div>
    </div>
  );
};

export default Main;

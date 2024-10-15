import React, { useState } from "react";
import "../css/AlgoCard.style.css";
import { Link } from "react-router-dom";
import wheel from "../assets/Design.png";
import sound from "../assets/rotate-movement-whoosh-1-185335.mp3";
import buttonSound from "../assets/button-pressed-38129.mp3";

const AlgoCard = ({ heading, info, link, example, index }) => {
  const [isRotate, setIsRotate] = useState(false);
  const [change, setChange] = useState(false);

  const playSound = () => {
    setIsRotate(true);
    const audio = new Audio(sound); // Replace with the path to your sound file
    audio.play();

    setTimeout(() => {
      setIsRotate(false);
      setChange(!change);
    }, 3000);
  };

  const playButton = () => {
    const audio = new Audio(buttonSound); // Replace with the path to your sound file
    audio.play();
  };
  return (
    <div>
      <h1 className="algo-card-heading">{heading}</h1>
      <div
        className={`algo-card-container ${
          index % 2 == 1 ? "algo-card-reverse" : ""
        }`}
      >
        {change ? (
          <div className="algo-card-container-left">
            <h1>Example</h1>
            <p>{example[0]}</p>
            <p>{example[1]}</p>
            <div className="algo-card-link" onClick={playButton}>
              <Link to={link} className="algo-card-button">
                Try Visualization
              </Link>
            </div>
          </div>
        ) : (
          <div className="algo-card-container-left">
            <p className="algo-card-info">{info}</p>
            <div className="algo-card-link" onClick={playButton}>
              <Link to={link} className="algo-card-button">
                Try Visualization
              </Link>
            </div>
          </div>
        )}

        <div className="algo-card-container-right" onClick={playSound}>
          <img
            src={wheel}
            alt="NAN"
            className={`algo-Wheel ${isRotate ? "algo-rotate" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AlgoCard;

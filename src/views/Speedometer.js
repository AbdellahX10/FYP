import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const interpolateColor = (value, maxValue) => {
  const percentage = value / maxValue;

  const red = Math.floor((1 - percentage) * 255);
  const green = Math.floor(percentage * 255);
  const blue = 0;

  return `rgb(${red}, ${green}, ${blue})`;
};

const getGrade = (value) => {
    if (value >= 93) return 'Grade A+';
    if (value >= 86) return 'Grade A';
    if (value >= 79) return 'Grade A-';
    if (value >= 71) return 'Grade B+';
    if (value >= 64) return 'Grade B';
    if (value >= 57) return 'Grade B-';
    if (value >= 50) return 'Grade C+';
    if (value >= 43) return 'Grade C';
    if (value >= 36) return 'Grade C-';
    if (value >= 29) return 'Grade D+';
    if (value >= 22) return 'Grade D';
    if (value <= 21) return 'Grade D-';
    return ''; 
  };


const Speedometer = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  const color = interpolateColor(value, maxValue);
  const grade = getGrade(value);

  return (
    <div style={{ width: '200px', margin: 'auto' }}>
      <CircularProgressbar
        value={percentage}
        text={grade}
        styles={buildStyles({
          textSize: '15px',
          textColor: color,
          pathColor: color,
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};
export default Speedometer;

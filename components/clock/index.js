import React, { useEffect } from "react";
import Countdown from "react-countdown";
import cn from "classnames";
import styles from "./styles.module.css";
// Random component
const Completionist = ({finishedDate, startingDate}) => {

  var opt = {
    year: "numeric",
    month: "2-digit",
    day: "numeric"
};

  const start = new Date(startingDate*1000);
  const finish = new Date(finishedDate*1000);

  const startdate = start.toLocaleString("en-US", opt);
  const finishdate = finish.toLocaleString("en-US", opt);

  return (<div className={styles.darkBox}>
  <div className="text-white text-lg 2xl:text-2xl mb-2">Closed</div>
  <span className="text-sm">
    {startdate} - {finishdate}
  </span>
</div>)
};

// Renderer callback with condition
export const Renderer = ({ renderer, small, big, startingDate, finishedDate }) => {
  const { days, hours, minutes, seconds, completed } = renderer;

  if (completed) {
    // Render a completed state
    return <Completionist startingDate={startingDate} finishedDate={finishedDate} />;
  } else {
    // Render a countdown
    return (
      <div className="inline-flex items-center justify-center gap-2  text-goldMetallic text-xl">
        <span
          className={cn(
            styles.box,
            small && styles.boxSmall,
            big && styles.boxBig
          )}
        >
          {days}
        </span>
        :
        <span
          className={cn(
            styles.box,
            small && styles.boxSmall,
            big && styles.boxBig
          )}
        >
          {hours}
        </span>
        :
        <span
          className={cn(
            styles.box,
            small && styles.boxSmall,
            big && styles.boxBig
          )}
        >
          {minutes}
        </span>
        :
        <span
          className={cn(
            styles.box,
            small && styles.boxSmall,
            big && styles.boxBig
          )}
        >
          {seconds}
        </span>
      </div>
    );
  }
};
export default function Clock({ date, small, big, startingDate }) {
  return (
    <div>
      <Countdown
        date={date}
        renderer={(props) => (
          <Renderer renderer={props} startingDate={startingDate} finishedDate={date} small={small} big={big} />
        )}
      />
    </div>
  );
}
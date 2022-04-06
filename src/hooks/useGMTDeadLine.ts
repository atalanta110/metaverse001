import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { ContextSetState } from "../context";

export default function useGMTDeadLine() {
  const [deadTime, setDeadTime] = useState({
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
  });
  const setValue = useContext(ContextSetState);

  useEffect(() => {
    const deadLine = "21/02/2022 22:22:00";
    const formant = "DD/MM/YYYY HH:mm:ss";
    const setInterFunc = setInterval(getDeadLineTime, 1000);

    function getDeadLineTime() {
      const currentDate = moment.duration(
        moment.utc(deadLine, formant).diff(moment.utc())
      );

      let totalSeconds = currentDate.asSeconds();

      //! Check time to start buy lands
      if (totalSeconds <= 0) {
        setValue?.((data) => ({ ...data, isBuyEnable: true }));

        clearInterval(setInterFunc);
        return;
      }

      let days, hours, minutes, seconds;
      if (Math.floor(totalSeconds / 86400) < 10) {
        days = "0" + Math.floor(totalSeconds / 86400);
      } else {
        days = Math.floor(totalSeconds / 86400);
      }

      totalSeconds %= 86400;
      if (Math.floor(totalSeconds / 3600) < 10) {
        hours = "0" + Math.floor(totalSeconds / 3600);
      } else {
        hours = Math.floor(totalSeconds / 3600);
      }
      totalSeconds %= 3600;
      if (Math.floor(totalSeconds / 60) < 10) {
        minutes = "0" + Math.floor(totalSeconds / 60);
      } else {
        minutes = Math.floor(totalSeconds / 60);
      }
      seconds = totalSeconds % 60;
      seconds = Math.ceil(seconds);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      setDeadTime({
        days: String(days),
        hours: String(hours),
        minutes: String(minutes),
        seconds: String(seconds),
      });
    }

    return () => {
      clearInterval(setInterFunc);
    };
  }, []);

  return deadTime;
}

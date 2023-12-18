import { Box, useStatStyles } from "@chakra-ui/react";
import { useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

interface IProp {
  init: string;
  onComplete: () => void;
  onTick: (time:string) => void;
}

const CustomCountdown = ({ init, onComplete, onTick }: IProp) => {
  const setTime = (time: string) => {
    const t = parseInt(time) * 60 * 1000;
    return Date.now() + t;
  };

  const rendererCountdown = ({
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    if (completed) {
      onComplete();
    }
    return (
      <Box fontWeight={"700"} fontSize={"24px"}>
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </Box>
    );
  };

  return (
    <Countdown
      date={Date.now() + 120*60*1000}
      renderer={rendererCountdown}
    //   onTick={(e) =>onTick(e.total.toString())}
    />
  );
};

export default CustomCountdown;

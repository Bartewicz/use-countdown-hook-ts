import { useEffect, useState } from 'react';

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_MINUTE = 1000 * 60;
const MS_IN_SECOND = 1000;

type UseCountdownProps = {
  targetISODate: string;
  onComplete?: () => void;
};

type UseCountDownReturnValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
};

export const useCountdown = ({
  targetISODate,
  onComplete,
}: UseCountdownProps): UseCountDownReturnValue => {
  const targetDate = new Date(targetISODate).getTime();
  const initialDelay = targetDate - Date.now();

  const [isCompleted, setIsCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    initialDelay > 0 ? initialDelay : 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    if (remainingTime === 0) {
      setIsCompleted(true);
      onComplete?.();
    }
  }, [remainingTime, onComplete]);

  return {
    isCompleted,
    days: Math.floor(remainingTime / MS_IN_DAY),
    hours: Math.floor((remainingTime % MS_IN_DAY) / MS_IN_HOUR),
    minutes: Math.floor((remainingTime % MS_IN_HOUR) / MS_IN_MINUTE),
    seconds: Math.floor((remainingTime % MS_IN_MINUTE) / MS_IN_SECOND),
  };
};

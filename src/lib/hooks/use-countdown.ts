import { useEffect, useState } from "react";

export const useCountdown = (targetDate: Date, onComplete?: () => void) => {
  const [countdown, setCountdown] = useState<number | string>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days > 0) {
        setCountdown(`${days} hari ${hours}: ${minutes}: ${seconds}`);
      } else if (hours > 0) {
        setCountdown(`${hours}: ${minutes}: ${seconds}`);
      } else if (minutes > 0) {
        setCountdown(`${minutes} menit ${seconds} detik`);
      } else {
        setCountdown(
          `${
            seconds > 0 ? `${seconds} detik` : "Waktu pembayaran telah berakhir"
          }`
        );
      }
      if (distance <= 0) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  return countdown;
};

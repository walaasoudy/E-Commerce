import { useEffect, useState } from "react";

const TimerComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component Did Mount ✅");

    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      console.log("Interval Running: ", count);
    }, 1000);

    return () => {
      console.log("Component Will Unmount ❌");
      clearInterval(interval); // تنظيف الـ setInterval عند إلغاء التحميل
    };
  }, []); // مصفوفة فارغة لضمان التنفيذ مرة واحدة فقط

  return <div>Counter: {count}</div>;
};

export default TimerComponent;

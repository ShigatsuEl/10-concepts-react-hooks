import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// CSS opacitiy속성을 FadeIn처리하는 useFadeIn Hook
const useFadeIn = (duration = 1, delay = 0) => {
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);
  if (typeof duration !== "number" || typeof delay !== "number") {
    return;
  }
  return { ref: element, style: { opacity: 0 } };
};

// Network 변화를 감지하는 useNetwork Hook
const useNetwork = (onChange) => {
  const [state, setState] = useState(navigator.onLine);
  const handleConnet = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
    }
    setState(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", handleConnet);
    window.addEventListener("offline", handleConnet);
    return () => {
      window.removeEventListener("online", handleConnet);
      window.removeEventListener("offline", handleConnet);
    };
  }, []);
  return state;
};

// Nineth Component
const Nineth = () => {
  const fadeInH1 = useFadeIn(3, 1);
  const fadeInP = useFadeIn(3, 2);

  const handleNetworkChange = (online) =>
    console.log(online ? "We just went online" : "We are offline");
  const onLine = useNetwork(handleNetworkChange);
  return (
    <>
      <Link to="/">Back Home</Link>
      <div>
        <h1 {...fadeInH1}>Hello!</h1>
        <p {...fadeInP}>lolem ipsum blabla~~</p>
        <h1>Try turn on network or off network</h1>
        <h1>{onLine ? "Online" : "Offline"}</h1>
      </div>
    </>
  );
};

export default Nineth;

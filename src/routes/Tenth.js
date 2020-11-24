import React, { useEffect, useRef, useState } from "react";

// useScroll Hook
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = (e) => {
    setState({ x: window.scrollX, y: window.scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
};

// useFullScreen Hook
const useFullScreen = (callback) => {
  const element = useRef();
  const runCb = (isFull) => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  };
  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
      runCb(true);
    }
  };
  const exitFull = () => {
    document.exitFullscreen();
    runCb(false);
  };
  return { element, triggerFull, exitFull };
};

// Tenth Conmponent
const Tenth = () => {
  const { y } = useScroll();

  const isFullScr = (isFull) => {
    console.log(isFull ? "We are FullScr" : "We are smallScr");
  };
  const { element, triggerFull, exitFull } = useFullScreen(isFullScr);
  return (
    <>
      <div style={{ height: "1000vh" }}>
        <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
          Hi! Try to scroll down
        </h1>
        <div ref={element}>
          <img
            src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2020/0403/IE002625830_STD.jpg"
            alt=""
          />
          <button onClick={exitFull}>Make exitFullScreen</button>
        </div>
        <button onClick={triggerFull}>Make FullScreen</button>
      </div>
    </>
  );
};

export default Tenth;

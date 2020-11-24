import React from "react";
import { Link } from "react-router-dom";

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
  }

  const fireNotif = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
  };

  return fireNotif;
};

const Eleventh = () => {
  const triggerNotif = useNotification("Notification", {
    body: "Bottom Notification",
  });
  return (
    <>
      <Link to="/">Back Home</Link>
      <div>
        <button onClick={triggerNotif}>Hello!</button>
      </div>
    </>
  );
};

export default Eleventh;

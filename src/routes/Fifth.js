import React, { useEffect, useState } from "react";

const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.textContent = title;
  };
  useEffect(updateTitle);
  return setTitle;
};

const Fifth = () => {
  const titleUpdate = useTitle("Loading...");
  setTimeout(() => titleUpdate("useTitle Page"), 5000);
  return (
    <div>
      <h1>Hi! check your title~</h1>
    </div>
  );
};

export default Fifth;

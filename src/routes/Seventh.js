import React from "react";
import { Link } from "react-router-dom";

const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };
  return confirmAction;
};

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  return { enablePrevent, disablePrevent };
};

const Seventh = () => {
  const deleteWord = () => console.log("Delete the World hahahaha~~");
  const abortWord = () => console.log("Are you scared?");
  const confirmDelete = useConfirm("Sure?", deleteWord, abortWord);

  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <>
      <Link to="/">Back Home</Link>
      <h1>Click button and Check your console!</h1>
      <button onClick={confirmDelete}>Delete the World</button>
      <h1>Protect Or Unprotect</h1>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </>
  );
};

export default Seventh;

import React, { useEffect, useState } from "react";
import defaultAxios from "axios";

const useAxios = (options, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);

  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now());
  };

  useEffect(() => {
    axiosInstance(options)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  if (!options.url) return;

  return { ...state, refetch };
};

const Twelveth = () => {
  const { loading, error, data, refetch } = useAxios({
    url:
      "https://cors-anywhere.herokuapp.com/https://yts.am/api/v2/list_movies.json",
  });
  return (
    <>
      <div>
        <h1>{data && data.status}</h1>
        <h2>{loading && "Loading"}</h2>
        <button onClick={refetch}>Refetch</button>
      </div>
    </>
  );
};

export default Twelveth;

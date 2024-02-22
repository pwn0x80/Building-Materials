import { useEffect, useState } from 'react';

export const useFetch = ({ urls }: any) => {
  let url = urls;
  let [status, setStatus] = useState("pending");
  let [error, setError] = useState("");
  let [data, setData] = useState<any>(null);

  let suspender = () => {
    if (status === 'pending') {
      throw fetch(url)
        .then((res) => {
          setStatus("ok");
          return res.json();
        })
        .then((result) => {
          setData(result);
        })
        .catch((err) => {
          setStatus("error");
          setError(err.message || "An error occurred");
          console.error(err);
        });
    }

    if (status === 'error') {
      throw new Error(error);
    }

    return data;
  };

  useEffect(() => {
    suspender(); // Initial fetch
  }, [url]);

  return { read: suspender, status, error };
};

import { useErrorBoundary } from "react-error-boundary";
import wrapPromise from "./wrapPromise";

type Status = 'pending' | 'success' | 'error';

interface WrapPromiseResult<T> {
  read: () => T;
}



export let controller = new AbortController();
function fetchData<T>(url: string): WrapPromiseResult<T> {

  const promise: Promise<T> = fetch(url, {
  signal: controller.signal
})
    .then((res) => res.json())
    .then((res) => {console.log(res);return res;})

// setTimeout(() => controller.abort(), 1000);
  return wrapPromise(promise,controller);
}

export default fetchData;

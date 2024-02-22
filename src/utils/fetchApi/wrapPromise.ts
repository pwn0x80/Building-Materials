type Status = 'pending' | 'success' | 'error';

interface WrapPromiseResult<T> {
  read: () => T;
}

function wrapPromise<T>(promise: Promise<any>, controller: AbortController): WrapPromiseResult<any> {

  let status: Status = 'pending';
  let response: T;

  const suspender = promise.then(
    (res) => {
      status = res.status;
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    },
  );
  const read = () => {
    switch (status) {
      case 'pending':
        return { response: suspender, status: status,controller: controller };
      case 'error':
        return { response: response, status: status, controller: controller };
      default:
        return { response: response, status: status, controller: controller };
    }
  };

  return { read };
}

export default wrapPromise;

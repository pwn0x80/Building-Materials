export function pipe (...fns: Function[]) {
    return (x: any) => fns.reduce((y, fn) =>  fn(y), x)
}


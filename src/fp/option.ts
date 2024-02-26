export type Option<A> = Some<A> | None
interface Some<A> {
  _tag: 'Some',
  value: A
}
interface None {
  _tag: 'None'
}
export const some = <A,>(x: A): Option<A> => ({ _tag: 'Some', value: x });
export const none: Option<never> = { _tag: 'None' }
export const IsNoneAsync = async <A,>(X: Promise<Option<A>>) => {
  const response = await X;
  return (response._tag === "None") ? true : false
}
export const match = async(onNone: Function, onSome: Function) => async<A>(type: Option<A>) => {
  isNone(type) ? await onNone() : await onSome(type.value)
}


export const isNone = <A,>(x: Option<A>): x is None => x._tag === 'None';

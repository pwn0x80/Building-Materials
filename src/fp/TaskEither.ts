
interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
type Either<E, A> = Left<E> | Right<A>

interface Task<A> {
  (): Promise<A>
}
interface TaskEither<E, A> extends Task<Either<E, A>> { }
const left = <B, E = never>(e: B): Either<B, E> => ({ _tag: "Left", left: e })

const right = <A, E = never>(a: A): Either<E, A> => ({ _tag: "Right", right: a })

export const tryCatch = <E, A>(f: any, onReject: (reason: unknown) => E): TaskEither<E, A> =>
  async () => {
    try {
      return await f().then(right)
    } catch (reason) {
      return left(onReject(reason))
    }
  }


interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

interface Task<A> {
  (): Promise<A>
}

type Either<E, A> = Left<E> | Right<A>
interface TaskEither<E, A> extends Task<Either<E, A>> { }

const left = <B, E = never>(e: B): Either<B, E> => ({ _tag: "Left", left: e })

const right = <A, E = never>(a: A): Either<E, A> => ({ _tag: "Right", right: a })


export const mapLeft = <E, G>(f: (e: E) => G) => async <A>(fa: Promise<TaskEither<E, A>>) => {
  return  fa.then((either: any) => {
    return either._tag === "Left" ? left(f(either.left)) : right(either.right)
  })
}
export const map = <E, G>(f: (e: E) => G) => async <A>(fa: Promise<TaskEither<A, E>>) => {
  return fa.then((either: any) => {
    return either._tag === "Right" ? right(f(either.right)) : left(either.left)
  })
}


export const tryCatch = <E, A>(f: any, onReject: (reason: unknown) => E): TaskEither<E, A> =>
  async () => {
    try {
      return await f().then(right)
    } catch (reason) {
      return left(onReject(reason))
    }
  }

import {
  merge,
} from 'ix/asynciterable/index.js'

type ExecuterTask <S, T> = (value: S) => T | Promise<T>

const executeTask = <S, T> (task: ExecuterTask<S, T>) => async function * (
  iterator: IterableIterator<S>,
): AsyncIterableIterator<T> {
  for (const one of iterator) {
    const result = await task(one)
    yield result
  }
}

/**
 * Execute task with the concurrency on an iterator
 * The order will not be guaranteed. (mostly will be different)
 */
const concurrencyExecuter = (concurrency = 1) => <S, T>
  (task: ExecuterTask<S, T>) =>
    async function * (
      iterator: Array<S> | IterableIterator<S>,
    ): AsyncIterableIterator<T> {
      let iter: IterableIterator<S>
      if (Array.isArray(iterator)) {
        iter = iterator.values()
      } else {
        iter = iterator
      }

      const executer = executeTask(task)

      const resultIteratorList = new Array(concurrency)
        .fill(iter)
        .map(executer) as [AsyncIterableIterator<T>, ...AsyncIterableIterator<T>[]]

      yield * merge(...resultIteratorList)
    }

export {
  concurrencyExecuter,
}

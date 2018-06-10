import DelayQueue from './delay-queue'

interface ExecutionUnit<T = any> {
  fn:       () => T,
  resolve:  (value?: T | PromiseLike<T>) => void,
  reject:   (reason?: any) => void,
}

/**
 * DelayQueueExector calls functions one by one with a delay time period between calls.
 */
export class DelayQueueExector extends DelayQueue {
  /**
   *
   * @param period milliseconds
   */
  constructor(
    period: number,
  ) {
    super(period)

    this.subscribe(unit => {
      try {
        const ret = unit.fn()
        return unit.resolve(ret)
      } catch (e) {
        return unit.reject(e)
      }
    })
  }

  public async execute<T = any>(fn: () => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const unit: ExecutionUnit<T> = {
        fn,
        resolve,
        reject,
      }
      this.next(unit)
    })
  }
}

export default DelayQueueExector

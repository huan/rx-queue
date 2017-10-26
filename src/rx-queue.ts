import {
  log,
}         from 'brolog'

import {
  Subject,
}                   from 'rxjs/Subject'
import {
  Subscription,
}                   from 'rxjs/Subscription'
import {
  PartialObserver,
}                   from 'rxjs/Observer'

// https://codepen.io/maindg/pen/xRwGvL
export class RxQueue<T = any> extends Subject<T> {
  private items: T[] = []

  public next(item: T) {
      if (this.observers.length > 0) {
        this.next(item)
      } else {
        this.items.push(item)
      }
  }

  public subscribe(observer: PartialObserver<T>)                                                  : Subscription
  public subscribe(next: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription

  public subscribe(...args: never[]): never

  public subscribe(
    nextOrObserver: ((value: T) => void) | PartialObserver<T>,
    error?: (error: any) => void,
    complete?: () => void,
  ) {
      let s // TypeScript bug
      if (typeof nextOrObserver === 'function') {
        s = super.subscribe(nextOrObserver, error, complete)
      } else {
        s = super.subscribe(nextOrObserver)
      }
      this.items.forEach(item => this.next(item))
      this.items = []
      return s
  }
}

export class DelayQueue extends RxQueue {

}

interface ExecuteUnit<T = any> {
  fn:       () => T,
  resolve:  (value?: T | PromiseLike<T>) => void,
  reject:   (reason?: any) => void,
}

export class DelayedExector extends DelayQueue {
  constructor() {
    super()
    this.subscribe(exector => {
      try {
        const ret = exector.fn()
        return exector.resolve(ret)
      } catch (e) {
        return exector.reject(e)
      }
    })
  }

  public async execute<R>(fn: () => R): Promise<R> {
    const ret = await new Promise<R>((resolve, reject) => {
      const exector: ExecuteUnit<R> = {
        fn,
        resolve,
        reject,
      }
      this.next(exector)
    })
    return ret
  }
}

export class DebounceQueue extends RxQueue {
}

export class ThrottleQueue extends RxQueue {
}

export default RxQueue

//   let q = new Queue();
//   q.subscribe(item => console.log(item));

//   q.add('yo');
//   q.add('yo 2');

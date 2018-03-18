import {
  Subject,
}                   from 'rxjs/Subject'
import {
  Subscription,
}                   from 'rxjs/Subscription'
import {
  PartialObserver,
}                   from 'rxjs/Observer'

import {
  VERSION,
}         from './config'

// default set to 500 milliseconds
const DEFAULT_PERIOD_TIME = 500

// https://codepen.io/maindg/pen/xRwGvL
export class RxQueue<T = any> extends Subject<T> {
  private itemList: T[] = []

  constructor(
    public period = DEFAULT_PERIOD_TIME,
  ) {
    super()
  }

  public next(item: T) {
    if (this.observers.length > 0) {
      super.next(item)
    } else {
      this.itemList.push(item)
    }
  }

  public subscribe(observer: PartialObserver<T>)                                                  : Subscription
  public subscribe(next: (value: T) => void, error?: (error: any) => void, complete?: () => void) : Subscription

  public subscribe(...args: never[]): never

  public subscribe(
    nextOrObserver: ((value: T) => void) | PartialObserver<T>,
    error?:         (error: any) => void,
    complete?:      () => void,
  ) {
    let s: Subscription // TypeScript bug
    if (typeof nextOrObserver === 'function') {
      s = super.subscribe(nextOrObserver, error, complete)
    } else {
      s = super.subscribe(nextOrObserver)
    }
    this.itemList.forEach(item => this.next(item))
    this.itemList = []
    return s
  }

  public version(): string {
    return VERSION
  }
}

export default RxQueue

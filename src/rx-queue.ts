import {
  Subject,
  Subscription,
  PartialObserver,
}                   from 'rxjs'

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
    let subscription: Subscription // TypeScript strict require strong typing differenciation
    if (typeof nextOrObserver === 'function') {
      subscription = super.subscribe(nextOrObserver, error, complete)
    } else {
      subscription = super.subscribe(nextOrObserver)
    }
    this.itemList.forEach(item => this.next(item))
    this.itemList = []
    return subscription
  }

  public version(): string {
    return '0.4.31'
  }
}

export default RxQueue

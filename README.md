# RX-QUEUE

[![Greenkeeper badge](https://badges.greenkeeper.io/zixia/rx-queue.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.com/zixia/rx-queue.svg?branch=master)](https://travis-ci.com/zixia/rx-queue) [![Windows Build status](https://img.shields.io/appveyor/ci/zixia/rx-queue/master.svg?label=Windows)](https://ci.appveyor.com/project/zixia/rx-queue) [![NPM Version](https://badge.fury.io/js/rx-queue.svg)](https://badge.fury.io/js/rx-queue) [![Downloads](http://img.shields.io/npm/dm/rx-queue.svg?style=flat-square)](https://npmjs.org/package/rx-queue) [![Powered by TypeScript](https://img.shields.io/badge/Powered%20By-TypeScript-blue.svg)](https://www.typescriptlang.org/) 

Easy to Use ReactiveX Queue that Supports Delay/DelayExector/Throttle/Debounce Features Powered by RxJS.

![RxQueue](https://zixia.github.io/rx-queue/images/queue.png)
> Picture Credit: [Queues in JavaScript](https://www.kirupa.com/html5/queues_in_javascript.htm)

## CLASSES

1. <a href='#rxqueue'>RxQueue</a>
1. <a href='#delayqueue'>DelayQueue</a>
1. <a href='#throttlequeue'>ThrottleQueue</a>
1. <a href='#debouncequeue'>DebounceQueue</a>
1. <a href='#delayqueueexector'>DelayQueueExector</a>

### RxQueue

`RxQueue` is the base class of all other queues. It extends from RxJS Subject.

**Example:**

```ts
import { RxQueue } from 'rx-queue'

const queue = new RxQueue()
queue.next(1)
queue.next(2)
queue.next(3)

queue.subscribe(console.log)
// Output: 1
// Output: 2
// Output: 3
```

### DelayQueue

`DelayQueue` passes all the items and add delays between items.

![DelayQueue](https://zixia.github.io/rx-queue/images/delay.png)
> Picture Credit: [ReactiveX Single Operator Delay](http://reactivex.io/documentation/single.html)

Practical examples of `DelayQueue`:

1. We are calling a HTTP API which can only be called no more than ten times per second, or it will throw a `500` error.

**Example:**

```ts
import { DelayQueue } from 'rx-queue'

const delay = new DelayQueue(500)  // set delay period time to 500 milliseconds
delay.subscribe(console.log)

delay.next(1)
delay.next(2)
delay.next(3)

// Output: 1
// Paused 500 millisecond...
// Output: 2
// Paused 500 millisecond...
// Output: 3
```

### ThrottleQueue

`ThrottleQueue` passes one item and then drop all the following items in a period of time.

![ThrottleQueue](https://zixia.github.io/rx-queue/images/throttle.png)
> Picture Credit: [ReactiveX Observable Throttle](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttle)

By using throttle, we don't allow to our queue to pass more than once every X milliseconds.

Practical examples of `ThrottleQueue`:
1. User is typing text in a textarea. We want to call auto-save function when user is typing, and want it only run at most once every five minutes.

**Example:**

```ts
import { ThrottleQueue } from 'rx-queue'

const throttle = new ThrottleQueue(500)  // set period time to 500 milliseconds
throttle.subscribe(console.log)

throttle.next(1)
throttle.next(2)
throttle.next(3)

// Output: 1
```

### DebounceQueue

`DebounceQueue` drops a item if there's another one comes in a period of time.

![DebounceQueue](https://zixia.github.io/rx-queue/images/debounce.png)
> Picture Credit: [ReactiveX Observable Debounce](http://reactivex.io/documentation/operators/debounce.html)

The Debounce technique allow us to deal with multiple sequential items in a time period to only keep the last one.

Debouncing enforces that no more items will be passed again until a certain amount of time has passed without any new items coming.

Practical examples of `DebounceQueue`:
1. User is typing text in a search box. We want to make an auto-complete function call only after the user stop typing for 500 milliseconds.

**Example:**

```ts
import { DebounceQueue } from 'rx-queue'

const debounce = new DebounceQueue(500)  // set period time to 500 milliseconds
debounce.subscribe(console.log)

debounce.next(1)
debounce.next(2)
debounce.next(3)

// Paused 500 millisecond...
// Output: 3
```

### DelayQueueExector

`DelayQueueExector` calls functions one by one with a delay time period between calls.

![DelayQueueExector](https://zixia.github.io/rx-queue/images/delay.png)
> Picture Credit: [ReactiveX Single Operator Delay](http://reactivex.io/documentation/single.html)

Practical examples of `DelayQueueExector`:

1. We are calling a HTTP API which can only be called no more than ten times per second, or it will throw a `500` error.

**Example:**

```ts
import { DelayuQueueExector } from 'rx-queue'

const delay = new DelayuQueueExector(500)  // set delay period time to 500 milliseconds

delay.execute(() => console.log(1))
delay.execute(() => console.log(1))
delay.execute(() => console.log(1))

// Output: 1
// Paused 500 millisecond...
// Output: 2
// Paused 500 millisecond...
// Output: 3
```

## SEE ALSO

* [Writing Marble Tests](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md)

## CHANGELOG

### v0.4 - May 2018

1. Upgrade to RxJS 6
1. Moved CI from Travis-ci.org  to Travis-ci.com

### v0.2 - Oct 30, 2017

1. Support: `DelayQueue`, `ThrottleQueue`, `DebounceQueue`, `DelayQueueExector`.
1. first version

## AUTHOR

Huan LI \<zixia@zixia.net\> (http://linkedin.com/in/zixia)

<a href="http://stackoverflow.com/users/1123955/zixia">
  <img src="http://stackoverflow.com/users/flair/1123955.png" width="208" height="58" alt="profile for zixia at Stack Overflow, Q&amp;A for professional and enthusiast programmers" title="profile for zixia at Stack Overflow, Q&amp;A for professional and enthusiast programmers">
</a>

## COPYRIGHT & LICENSE

* Code & Docs © 2017-2018 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons

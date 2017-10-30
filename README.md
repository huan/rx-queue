RX-QUEUE
--------
[![Build Status](https://travis-ci.org/zixia/rx-queue.svg?branch=master)](https://travis-ci.org/zixia/rx-queue) [![NPM Version](https://badge.fury.io/js/rx-queue.svg)](https://badge.fury.io/js/rx-queue) [![Downloads](http://img.shields.io/npm/dm/rx-queue.svg?style=flat-square)](https://npmjs.org/package/rx-queue) [![Powered by TypeScript](https://img.shields.io/badge/Powered%20By-TypeScript-blue.svg)](https://www.typescriptlang.org/) 

Easy to Use ReactiveX Queues with Delay/DelayExector/Throttle/Debounce Features Powered by RxJS.

![RxQueue](https://zixia.github.io/rx-queue/images/queue.png)
> Picture Credit: [Queues in JavaScript](https://www.kirupa.com/html5/queues_in_javascript.htm)

CLASSES
-------

## RxQueue

RxQueue is the base class of DelayQueue/DebounceQueue/ThrottleQueue/DelayQueueExector, it extends from RxJS Subject which supports save values for the future subscription.

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

## DelayQueue

![DelayQueue](https://zixia.github.io/rx-queue/images/delay.png)
> Picture Credit: [ReactiveX Single Operator Delay](http://reactivex.io/documentation/single.html)

**Example:**
```ts
import { DelayQueue } from 'rx-queue'

const delay = new DelayQueue(1000)  // set delay period time to 1s
delay.subscribe(console.log)

delay.next(1)
delay.next(2)
delay.next(3)

// Output: 1
// Paused 1 second...
// Output: 2
// Paused 1 second...
// Output: 3
```

## ThrottleQueue

By using throttle, we don't allow to our function to execute more than once every X milliseconds.

Throttling enforces a maximum number of times a function can be called over time. As in "execute this function at most once every 100 milliseconds."

Throttling will delay executing a function. It will reduce the notifications of an event that fires multiple times.

Throttling restricts the frequency of calls that a function receives to a fixed time interval. It is used to ensuring that the target function is not invoked more often than the specified delay. Throttling is the reduction in rate of a repeating event.

Throttling will simply prevent a function from running if it has run recently, regardless of the call frequency. Practical examples of throttling:

Implementations of v-sync are based on throttling: the screen will only be drawn if 16ms elapsed since the last screen draw. No matter how many times the screen refresh functionality is called, it will only run at most once every 16ms.

![ThrottleQueue](https://zixia.github.io/rx-queue/images/throttle.png)
> Picture Credit: [ReactiveX Observable Throttle](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-throttle)

**Example:**
```ts
import { ThrottleQueue } from 'rx-queue'

const throttle = new ThrottleQueue(1000)  // set period time to 1s
throttle.subscribe(console.log)

throttle.next(1)
throttle.next(2)
throttle.next(3)

// Output: 1
```

## DebounceQueue

The Debounce technique allow us to "group" multiple sequential calls in a single one.

Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called. As in "execute this function only if 100 milliseconds have passed without it being called."

Debounce: Think of it as "grouping multiple events in one". Imagine that you go home, enter in the elevator, doors are closing... and suddenly your neighbor appears in the hall and tries to jump on the elevator. Be polite! and open the doors for him: you are debouncing the elevator departure. Consider that the same situation can happen again with a third person, and so on... probably delaying the departure several minutes.

Debouncing will bunch a series of sequential calls to a function into a single call to that function. It ensures that one notification is made for an event that fires multiple times.

Debouncing allows you to manage the frequency of calls that a function can receives. It combines multiple calls that happen on a given function so that repeated calls that occur before the expiration of a specific time duration are ignored. Basically debouncing ensures that exactly one signal is sent for an event that may be happening several times.

Debouncing will prevent a function from running while it is still being called frequently. A debounced function will only run after it has been determined that it is no longer being called, at which point it will run exactly once. Practical examples of debouncing:

Auto-saving or validating the contents of a text-field if the user "stopped typing": the operation will only be done once, AFTER it has been determined that the user is no longer typing (no longer pressing keys).
Logging where users rest their mouse: the user is no longer moving their mouse, so the (last) position can be logged.

![DebounceQueue](https://zixia.github.io/rx-queue/images/debounce.png)
> Picture Credit: [ReactiveX Observable Debounce](http://reactivex.io/documentation/operators/debounce.html)


**Example:**
```ts
import { DebounceQueue } from 'rx-queue'

const debounce = new DebounceQueue(1000)  // set period time to 1s
debounce.subscribe(console.log)

debounce.next(1)
debounce.next(2)
debounce.next(3)

// Paused 1 second...
// Output: 3
```

## DelayQueueExector

![DelayQueueExector](https://zixia.github.io/rx-queue/images/delay.png)
> Picture Credit: [ReactiveX Single Operator Delay](http://reactivex.io/documentation/single.html)

**Example:**
```ts
import { DelayuQueueExector } from 'rx-queue'

const delay = new DelayuQueueExector(1000)  // set delay period time to 1s

delay.execute(() => console.log(1))
delay.execute(() => console.log(1))
delay.execute(() => console.log(1))

// Output: 1
// Paused 1 second...
// Output: 2
// Paused 1 second...
// Output: 3
```

AUTHOR
------

Huan LI \<zixia@zixia.net\> (http://linkedin.com/in/zixia)

<a href="http://stackoverflow.com/users/1123955/zixia">
  <img src="http://stackoverflow.com/users/flair/1123955.png" width="208" height="58" alt="profile for zixia at Stack Overflow, Q&amp;A for professional and enthusiast programmers" title="profile for zixia at Stack Overflow, Q&amp;A for professional and enthusiast programmers">
</a>

COPYRIGHT & LICENSE
-------------------

* Code & Docs © 2017 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons



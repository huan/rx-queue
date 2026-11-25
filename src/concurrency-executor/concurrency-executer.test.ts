import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import { concurrencyExecuter } from './concurrency-executer.ts'

test('concurrencyExecuter() smoke testing', async () => {
  const INPUT_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const CONCURRENCY = 2
  const SLEEP_MS = 10

  const task = async (v: number) => {
    await new Promise(resolve => setTimeout(resolve, SLEEP_MS))
    return v * 10
  }

  const iterator = concurrencyExecuter(CONCURRENCY)(task)(INPUT_LIST)
  const outputList: number[] = []

  for await (const item of iterator) {
    outputList.push(item)
  }

  assert.equal(outputList.length, INPUT_LIST.length, 'all items should be processed')
  assert.deepEqual(outputList.sort((a, b) => a - b), INPUT_LIST.map(v => v * 10))
})

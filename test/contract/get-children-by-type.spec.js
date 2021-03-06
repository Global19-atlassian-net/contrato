/*
 * Copyright 2017 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const ava = require('ava')
const Contract = require('../../lib/contract')
const CONTRACTS = require('../contracts.json')

ava.test('should return all contracts of the type if the type exists', (test) => {
  const contract1 = new Contract(CONTRACTS['sw.os'].debian.wheezy.object)
  const contract2 = new Contract(CONTRACTS['sw.os'].debian.jessie.object)
  const contract3 = new Contract(CONTRACTS['sw.os'].fedora['25'].object)
  const contract4 = new Contract(CONTRACTS['sw.blob'].nodejs['4.8.0'].object)

  const container = new Contract({
    type: 'foo',
    slug: 'bar'
  })

  container.addChildren([ contract1, contract2, contract3, contract4 ])

  test.deepEqual(container.getChildrenByType('sw.os'), [
    contract1,
    contract2,
    contract3
  ])
})

ava.test('should always return the same results', (test) => {
  const contract1 = new Contract(CONTRACTS['sw.os'].debian.wheezy.object)
  const contract2 = new Contract(CONTRACTS['sw.os'].debian.jessie.object)
  const contract3 = new Contract(CONTRACTS['sw.os'].fedora['25'].object)
  const contract4 = new Contract(CONTRACTS['sw.blob'].nodejs['4.8.0'].object)

  const container = new Contract({
    type: 'foo',
    slug: 'bar'
  })

  container.addChildren([ contract1, contract2, contract3, contract4 ])

  test.deepEqual(container.getChildrenByType('sw.os'), [
    contract1,
    contract2,
    contract3
  ])

  test.deepEqual(container.getChildrenByType('sw.os'), [
    contract1,
    contract2,
    contract3
  ])

  test.deepEqual(container.getChildrenByType('sw.os'), [
    contract1,
    contract2,
    contract3
  ])
})

ava.test('should return nothing if the type does not exist', (test) => {
  const contract1 = new Contract(CONTRACTS['sw.os'].debian.wheezy.object)
  const contract2 = new Contract(CONTRACTS['sw.os'].debian.jessie.object)
  const contract3 = new Contract(CONTRACTS['sw.os'].fedora['25'].object)
  const contract4 = new Contract(CONTRACTS['sw.blob'].nodejs['4.8.0'].object)

  const container = new Contract({
    type: 'foo',
    slug: 'bar'
  })

  container.addChildren([ contract1, contract2, contract3, contract4 ])

  test.deepEqual(container.getChildrenByType('arch.sw'), [])
})

ava.test('should not return the same contract multiple times if it contains aliases', (test) => {
  const contract1 = new Contract(CONTRACTS['sw.blob'].nodejs['4.8.0'].object)
  const contract2 = new Contract({
    type: 'hw.device-type',
    name: 'Raspberry Pi',
    slug: 'raspberrypi',
    aliases: [ 'rpi', 'raspberry-pi' ]
  })

  const container = new Contract({
    type: 'foo',
    slug: 'bar'
  })

  container.addChildren([ contract1, contract2 ])

  test.deepEqual(container.getChildrenByType('hw.device-type'), [
    contract2
  ])
})

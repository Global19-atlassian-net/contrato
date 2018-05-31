/*
 * Copyright 2018 resin.io
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
const _ = require('lodash')
const validation = require('../../lib/validation')

const baseContract = require('./common/baseContract')

const taggedContract = _.merge({}, baseContract, {
  tags: [ 'valid' ]
})

ava.test('Should validate tagged contract', (test) => {
  test.deepEqual(
    {
      success: true,
      errors: []
    },
    validation.checkContract(taggedContract)
  )
})

ava.test('Should reject invalid tagged contract', (test) => {
  taggedContract.tags.push('valid')

  const result = validation.checkContract(taggedContract)
  test.is(false, result.success)
  test.is('data.tags should NOT have duplicate items (items ## 1 and 0 are identical)', result.errors[0])
})

ava.test('Should reject invalid tagged contract', (test) => {
  taggedContract.tags.push(' non valid ')

  const result = validation.checkContract(taggedContract)
  test.is(false, result.success)
  test.is('data.tags[2] should match pattern "^[\\S]+(?: [\\S]+)*$"', result.errors[0])
})
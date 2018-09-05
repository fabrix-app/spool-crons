/* eslint no-console: [0] */
'use strict'

const joi = require('joi')
import { cronsConfig } from './schemas'

export const Validator = {

  // Validate Engine Config
  validateCronsConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, cronsConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.crons: ' + err))
        }
        return resolve(value)
      })
    })
  }
}

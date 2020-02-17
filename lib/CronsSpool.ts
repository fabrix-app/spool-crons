import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import schedule from 'node-schedule'
import { Crons } from './Crons'
import { Validator } from './validator'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class CronsSpool extends ExtensionSpool {
  private _scheduler

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this._scheduler = schedule

    this.extensions = {
      scheduler: {
        get: () => {
          return this.scheduler
        },
        set: (newScheduler) => {
          throw new Error('scheduler can not be set through FabrixApp, check spool-crons instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  get scheduler () {
    return this._scheduler
  }

  /**
   * Validate Configuration
   */
  async validate () {
    // const requiredSpools = []
    // const spools = Object.keys(this.app.spools)
    //
    // if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
    //   return Promise.reject(new Error(`spool-crons requires spools: ${ requiredSpools.join(', ') }!`))
    // }

    if (!this.app.config.get('crons')) {
      return Promise.reject(new Error('No configuration found at config.crons!'))
    }

    return Promise.all([
      Validator.validateCronsConfig(this.app.config.get('crons'))
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }

  /**
   * Adds Routes, Policies, and Agenda
   */
  async configure () {

    return Promise.all([
      Crons.configure(this.app),
      Crons.copyDefaults(this.app)
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }

  /**
   * TODO document method
   */
  async initialize () {
    return Promise.all([
      Crons.addCrons(this.app)
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }

  /**
   * clear subscriptions
   */
  async unload() {
    return Promise.all([
      Crons.cancelCrons(this.app)
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

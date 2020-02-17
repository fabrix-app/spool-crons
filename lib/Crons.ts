import { FabrixApp } from '@fabrix/fabrix'
import { clone } from 'lodash'
import schedule from 'node-schedule'
import { Utils } from './utils'

export const Crons = {

  /**
   * configure - Configure the Engine
   * @param app
   */
  configure: (app) => {
    return
  },
  /**
   *
   * @param app
   * @returns {Promise.<T>}
   */
  cancelCrons: (app: FabrixApp) => {
    for (const j in app.scheduler.scheduledJobs) {
      if (app.scheduler.scheduledJobs.hasOwnProperty(j)) {
        const job = app.scheduler.scheduledJobs[j]
        job.cancel()
      }
    }
    return Promise.resolve()
  },

  /**
   * copyDefaults - Copies the default configuration so that it can be restored later
   * @param app
   * @returns {Promise.<{}>}
   */
  copyDefaults: (app: FabrixApp) => {
    app.config.set('cronsDefaults', clone(app.config.get('crons')))
    return Promise.resolve({})
  },
  // /**
  //  * Add Cron Jobs to Engine
  //  * @param app
  //  * @returns {Promise.<{}>}
  //  */
  addCrons: (app: FabrixApp) => {
    // Schedule the cron jobs
    // Then, allow the profile follow it's own pattern
    Object.keys(app.crons || {}).forEach(function(key) {
      const cron = app.crons[key]
      // Crons are now immutable
      cron.freeze()

      // Schedule the cron
      if (
        cron.methods && cron.methods.indexOf('schedule') > -1
        && app.config.get('crons.auto_schedule') !== false
      ) {
        cron.schedule()
        app.log.debug(`Engine auto scheduled ${ cron.name }: ${ cron.scheduledJobs.length } jobs`)
      }

      const profile = app.config.get('crons.profile')

      if (
        app.config.get('crons.profiles')
        && app.config.get('crons.profiles')[profile]
      ) {
        app.config.get('crons.profiles')[profile].forEach(allowed => {
          const allowedCron = allowed.split('.')[0]
          const allowedMethod = allowed.split('.')[1]
          if (allowedCron === key && cron.methods.indexOf(allowedMethod) > -1) {
            cron[allowedMethod]()
          }
        })
      }
    })

    return
  }
}

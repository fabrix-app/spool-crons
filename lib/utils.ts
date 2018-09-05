import { FabrixApp } from '@fabrix/fabrix'
import { remove, find } from 'lodash'

export const Utils = {
  /**
   * Get the profile for the current process
   * The profile contains a list that this process can work on
   * If there is no profile (ie the current process is not a worker process), this returns undefined
   */
  getWorkerProfile: (profileName, typeConfig) => {
    if (!profileName || !typeConfig.profiles[profileName]) {
      return []
    }

    return typeConfig.profiles[profileName]
  }
}

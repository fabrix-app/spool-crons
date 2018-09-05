/**
 * Crons Configuration
 *
 * @see {@link http://
 */
export const crons = {
  /**
   * If transactions are production
   */
  live_mode: process.env.LIVE_MODE || true,

  /**
   * If every event should be saved automatically in the database
   */
  auto_save: process.env.AUTO_SAVE || false,

  /**
   * Set profile to subscribe to crons in the matching profile (engine.<type>.profiles).
   * If process.env.PROFILE does not match a profile, the application will not subscribe to any crons
   */
  profile: process.env.CRONS_PROFILE,
  /**
   * Whether to run the schedule method on every Cron Class
   */
  auto_schedule: true,
  /**
   * Delay when crons will start running.
   */
  uptime_delay: process.env.CRONS_UPTIME_DELAY || 0,
  /**
   * Define worker profiles. Each profile of a given type listens for the
   * "crons" defined in its profile below. The cron names represent a Cron
   * defined in api.crons.
   * You can set these per environment in config/env
   * crons: { profiles: ... }
   */
  profiles: {}
}

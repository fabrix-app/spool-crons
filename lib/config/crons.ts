/**
 * Crons Configuration
 *
 * @see {@link http://
 */
export const crons = {
  prefix: null,
  live_mode: true,
  auto_save: false,
  enabled: true,
  auto_schedule: true,
  profile: process.env.CRONS_PROFILE || null,
  uptime_delay: process.env.CRONS_UPTIME_DELAY || 0,
  profiles: {}
}

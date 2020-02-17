import joi from 'joi'

export const cronsConfig = joi.object().keys({
  prefix: joi.string().allow('', null),
  live_mode: joi.boolean().required(),
  auto_save: joi.boolean().required(),
  enabled: joi.boolean(),
  auto_schedule: joi.boolean(),
  uptime_delay: joi.number(),
  profile: joi.string().allow(null).required(),
  profiles: joi.object().pattern(/^/, joi.array().items(joi.string().regex(/(.+)\.(.+)/)))
})

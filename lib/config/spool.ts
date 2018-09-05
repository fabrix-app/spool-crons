/**
 * Spool Configuration
 *
 * @see {@link http://fabrixjs.io/doc/spool/config
 */
export const spool = {
  type: 'extension',
  /**
   * API and config resources provided by this Spool.
   */
  provides: {
    resources: [ ],
    api: { },
    config: [ 'crons', 'routes' ]
  },
  /**
   * Configure the lifecycle of this pack; that is, how it boots up, and which
   * order it loads relative to other spools.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Spool
       */
      listen: ['spool:router:configured'],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: ['spool:crons:configured']
    },
    initialize: {
      emit: ['spool:crons:initialized']
    }
  }
}


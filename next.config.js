const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      env: {
        GREETING: process.env.GREETING,
        API_HOST: process.env.API_HOST,
      },
    }
  }

  return {
    /* config options for all phases except development here */
  }
}
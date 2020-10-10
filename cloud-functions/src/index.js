
/**
 * selection of functions
 * only load the function if after that particular one
 */
const functionName = process.env.TARGET_FUNCTION;
if (!functionName || functionName === 'getCrossfits'){
  exports.getCrossfits = require('./functions/getCrossfits').default;
}

if (!functionName || functionName === 'getZoopla'){
  exports.getZoopla = require('./functions/getZoopla').default;
}
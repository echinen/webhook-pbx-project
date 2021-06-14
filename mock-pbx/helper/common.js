const uuid1 = require('uuid/v1')

/**
 * Simple, fast generation of RFC4122 UUIDS.
 * This version of uuid generate from timestamp.
 */
const generateGuid = () => {
    return uuid1()
}
exports.generateGuid = generateGuid


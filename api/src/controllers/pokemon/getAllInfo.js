const getApiInfo = require('./getApiInfo')
const getDbInfo = require('./getDbInfo')

const getAllInfo = async () => {
    
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const allInfo = await apiInfo.concat(dbInfo)
    /* console.log(allInfo) */
    return allInfo;    
}

module.exports = getAllInfo;
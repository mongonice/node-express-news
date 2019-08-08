var path = require('path');

module.exports = {
    port: 9099,
    dataPath: path.join(__dirname, 'database', 'data.json'),
    publicPath: path.join(__dirname, 'public')
}
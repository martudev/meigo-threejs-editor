const path = require("path");

const ROOT = path.join(__dirname, '../')

module.exports = {
    resolve: {
        alias: {
            src: path.resolve(ROOT, 'src/'),
        }
    }
}
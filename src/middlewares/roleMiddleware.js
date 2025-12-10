const jwt = require('jsonwebtoken');

const roleChecking = (req, res, next) => {

    console.log(req.role);

}

module.exports = roleChecking;
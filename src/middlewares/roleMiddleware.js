//const jwt = require('jsonwebtoken');
const getUserDetail = require('../services/authService');

const roleChecking = async (req, res, next) => {
    try {
        const userRole = await getUserDetail.getUserDetailsByEmailId(req.email);
        if (userRole.role !== "admin") {
            return res.status(401).json({ status: false, message: "Access Denied" });
        } else { next(); }
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}

module.exports = roleChecking;
const getUserDetail = require('../services/auth.service');
const logger = require('../utils/logger');

const roleChecking = async (req, res, next) => {
    try {
        logger.info('Admin role checking section started.');
        const userRole = await getUserDetail.getUserDetailsByEmailId(req.user.email);
        if (userRole.role !== "admin") {
            logger.error('Admin-section: Access denied');
            return res.status(401).json({ status: false, message: "Access Denied" });
        } else { logger.info('Admin Section: Your are admin.'); next(); }
    } catch (error) {
        logger.error('Role Checking middleware Failed: ', error);
        res.status(500).json({ status: false, message: error });
    }
}

module.exports = roleChecking;
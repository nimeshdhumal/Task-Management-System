const buildActor = (req) => ({
    userId: req.user.id,
    userEmail: req.user.email,
    userRole: req.user.role,
});

module.exports = buildActor;
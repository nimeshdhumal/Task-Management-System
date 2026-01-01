const buildActor = (req) => ({
    userId: Number(req.user.id),
    userEmail: req.user.email,
    userRole: req.user.role,
    requestBody: req.body,
    page: Number(req.query.page),
    limit: Number(req.query.limit),
    sort: Number(req.query.sort),
    order: Number(req.query.order),
    id: Number(req.params.id)
});

module.exports = buildActor;
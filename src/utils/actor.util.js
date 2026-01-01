const buildActor = (req) => ({
    userId: Number(req.user.id),
    userEmail: req.user.email,
    userRole: req.user.role,
    requestBody: req.body,
    page: Number(req.query.page),
    limit: Number(req.query.limit),
    sort: req.query.sort,
    order: req.query.order,
    id: Number(req.params.id),
    force: req.query.force
});

module.exports = buildActor;
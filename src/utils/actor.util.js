const buildActor = (req) => ({
    userId: req.user.id,
    userEmail: req.user.email,
    userRole: req.user.role,
    requestBody: req.body,
    page: Number(req.query.page),
    limit: Number(req.query.limit),
    sort: req.query.sort,
    order: req.query.order,
    id: req.params.id
});

module.exports = buildActor;
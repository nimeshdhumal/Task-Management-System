const buildActor = (req) => ({
    page: req.query.page,
    limit: req.query.limit,
    sort: req.query.sort,
    order: req.query.order,
    userId: req.user.id,
    userEmail: req.user.email,
    userRole: req.user.role,
    id: req.params.id,
    force: req.query.force,
    body: req.body,
    authorization: req.headers.authorization
});

module.exports = buildActor;
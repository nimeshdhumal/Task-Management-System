const buildActor = (req) => ({
    page: req.query.page,
    limit: req.query.limit,
    sort: req.query.sort,
    order: req.query.order,
    userId: req.user.id,
    id: req.params.id,
    force: req.query.force
});

module.exports = buildActor;
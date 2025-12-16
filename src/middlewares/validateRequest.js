module.exports = ({ body, headers, query, params }) => {
    return (req, res, next) => {
        if (body) {
            const { error } = body.validate(req.body);
            if (error) return res.status(400).json({ message: error.message });
        }

        if (headers) {
            const { error } = headers.validate(req.headers);
            if (error) return res.status(401).json({ message: error.message });
        }

        if (query) {
            const { error } = query.validate(req.query);
            if (error) return res.status(400).json({ message: error.message });
        }

        if (params) {
            const { error } = params.validate(req.params);
            if (error) return res.status(400).json({ message: error.message });
        }

        next();
    };
};
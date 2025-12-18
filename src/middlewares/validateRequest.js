module.exports = ({ body, headers, query, params }) => {
    return (req, res, next) => {
        if (body) {
            const { error, value } = body.validate(req.body);
            if (error) return res.status(400).json({ message: error.message });
            req.body = value;
        }

        if (headers) {
            const { error, value } = headers.validate(req.headers);
            if (error) return res.status(401).json({ message: error.message });
            req.headers = value;
        }

        if (query) {
            const { error, value } = query.validate(req.query);
            if (error) return res.status(400).json({ message: error.message });
            req.query = value;
        }

        if (params) {
            const { error, value } = params.validate(req.params);
            if (error) return res.status(400).json({ message: error.message });
            req.params = value;
        }

        next();
    };
};
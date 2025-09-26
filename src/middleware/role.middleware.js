const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({ message: 'Role is required in the request body.' });
        }

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
        }

        next();
    };
};

module.exports = { checkRole };
const middlewareRole = (req, res, next) => {
    const { rol } = req.user;

    if (rol !== 'admin') return res.status(401).json({ message: 'User not authorized to make this request' });

    next();
};

export default middlewareRole;
export const middlewareRole = targetRole => (req, res, next) => {
    try {
        const { role } = req.user;
    
        if (role !== targetRole) throw { message: 'User not authorized to make this request', status: 401};
    
        next();
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message})
    }
};
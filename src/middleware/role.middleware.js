import { errorHandlerHttp } from "../utils/error.handler.js";

export const middlewareRole = (targetRole, targetRole2) => (req, res, next) => {
    try {
        const { role } = req.user;
    
        if (role !== targetRole && role !== targetRole2) throw { message: 'User not authorized to make this request', status: 401 };
    
        next();
    } catch (error) {
        errorHandlerHttp(res, error);
    }
};
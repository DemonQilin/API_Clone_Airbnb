import { Posts } from "./posts.model.js";
import { Users } from "./user.model.js";

export const initModels = () => {
    Users.hasMany(Posts),
    Posts.belongsTo(Users)
};
import bcrypt from 'bcrypt';

export const hashPassword = plainPassword => {
    return bcrypt.hashSync(plainPassword, 15);
};

export const comparePassword = (plainPassword, hashPass) => {
    return bcrypt.compareSync(plainPassword, hashPass);
};
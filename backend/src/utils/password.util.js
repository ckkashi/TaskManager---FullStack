import bcrypt from "bcrypt";

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const verifyPassword = async (password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword);
}

export {hashPassword, verifyPassword};
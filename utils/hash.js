import { compare } from "bcryptjs";

const compareWithHashed = async (plain, hashed) => {
    try {
        return await compare(plain, hashed);
    } catch(err) {
        return null;
    }
};

export { compareWithHashed };

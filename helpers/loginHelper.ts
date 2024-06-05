import bcrypt from "bcryptjs";

export const hashPassword = async (password: string, saltRounds = 10) => {
  try {
    const pepper = process.env.PEPPER;
    const pepperedPassword = password + pepper;
    return await bcrypt.hash(pepperedPassword, saltRounds);
  } catch (error) {
    return null;
  }
};

export const comparePassword = async (
  password: string | undefined,
  hash: string
) => {
  if (!password) {
    return false;
  }
  try {
    const pepper = process.env.PEPPER;
    const saltedInput = password + pepper;
    return await bcrypt.compare(saltedInput, hash);
  } catch (error) {
    return false;
  }
};

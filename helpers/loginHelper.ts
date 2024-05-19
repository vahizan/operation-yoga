import bcrypt from "bcryptjs";

export const hashPassword = async (password: string, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
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
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
};

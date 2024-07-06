export const isValidEmail = (email: string): boolean =>
  /^\S+@\S+\.\S+$/.test(email);

export const isValidPhone = (phoneNumber: string): boolean => {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  return /^\d{1,16}$/.test(cleanedPhoneNumber);
};

export const validateStartDate = () => {};

export const validateEndDate = () => {};

const isEmail = (val: string): boolean => {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return isValidEmail.test(val);
};

export default {
  isEmail,
};

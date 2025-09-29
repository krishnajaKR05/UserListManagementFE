const emailRegex = /^[a-zA-Z]+(?:\.[a-zA-Z]+)+@reqres\.in$/i;
const passRegex = /^.{10}$/;

export const validateEmail = (email: string) => {
  if (!emailRegex.test(email) || email === "") {
    return false;
  } else {
    return true;
  }
};

export const validatePassword = (pw: string) => {
  if (pw === "" || !passRegex.test(pw)) {
    return false;
  } else {
    return true;
  }
};

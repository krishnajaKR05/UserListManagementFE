import { Dispatch, SetStateAction } from "react";

export interface UserDetails {
  loginEmail: string;
  loginPassword: string;
  firstName?: string;
  lastname?: string;
  email?: string;
  image?: string;
}

export interface Errors {
  loginEmailError: boolean;
  passwordError: boolean;
  loginError:boolean;
  fNameError?: boolean;
  lNameError?: boolean;
  emailError?: boolean;
  imageLinkError?: boolean;
}

const emailRegex = /^[a-zA-Z]+(?:\.[a-zA-Z]+)+@reqres\.in$/i;
const passRegex = /^.{10}$/

export const validateFields = (
  e: React.ChangeEvent<HTMLInputElement>,
  setUserDetails: Dispatch<SetStateAction<UserDetails>>,
  setErrors: Dispatch<SetStateAction<Errors>>
) => {
  const { name, value } = e.target;

  switch (name) {
    case "loginEmail":
      setUserDetails((prev) => ({ ...prev, loginEmail: value }));
      setErrors((prev) => ({ ...prev, loginEmailError: !emailRegex.test(value) || value === "" }));
      break;

    case "loginPassword":
      setUserDetails((prev) => ({ ...prev, loginPassword: value }));
      setErrors((prev) => ({ ...prev, passwordError: !passRegex.test(value) || value === "" }));
      break;

    default:
      break;
  }
};

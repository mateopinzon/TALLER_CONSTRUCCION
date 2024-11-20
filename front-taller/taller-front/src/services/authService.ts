import { UserAccount } from "../interfaces/UserAccount";
import api from "./api/apiConfig";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
    userName: string,
    phone: number,
    email: string,
    password: string,
}

export interface UserTypeResponse {
  type: "Admin" | "Client" | "Worker";
}


export const login = async (loginData: LoginDTO): Promise<UserAccount> => {
  try {
    const response = await api.post<UserAccount>("/users/login", loginData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error en el inicio de sesión");
  }
};

export const registerUser = async (registrationData: RegisterDTO): Promise<void> => {
  try {
    await api.post("/users/register?userType=client", registrationData);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error en el registro");
  }
};

export const getUserType = async (userId: number): Promise<UserTypeResponse> => {
  try {
    const response = await api.get<string>(`users/${userId}/type`);
    const userType = response.data.trim();
    if (userType === "Admin" || userType === "Client" || userType === "Worker") {
      return { type: userType } as UserTypeResponse;
    } else {
      throw new Error("Tipo de usuario no reconocido");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al obtener el tipo de usuario");
  }
};

export interface LoginResponseDTO {
  token: string;
  user: {
    username: string;
    email: string;
    favorites: string[];
    role: string;
  };
}

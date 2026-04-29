export interface Usuario {
  id?: number;
  username: string;
  password?: string;
  role: string;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest"
}

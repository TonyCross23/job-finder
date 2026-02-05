export interface UserDTO {
  id: string;
  email: string;
  username: string;
  password: string;
  roleId: number;
  createdAt: Date;
}

export interface RefreshTokenDTO {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  roleId: number;
  username: string;
  code?: string;
}

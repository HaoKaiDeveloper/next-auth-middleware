export interface tokenType {
  name: string;
  email: string;
}

export interface userType {
  name: string;
  email: string;
  iat: number;
  exp: number;
  nbf: number;
}

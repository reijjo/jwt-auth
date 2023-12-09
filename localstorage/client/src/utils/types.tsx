export type Config = {
  PORT?: number;
  MONGO_URI?: string;
  JWT_SECRET?: string;
};

export type Login = {
  username: string;
  passwd: string;
};

export type Register = {
  username: string;
  passwd: string;
};

export type LoginUser = {
  id: string;
  username: string;
  passwd: string;
};

export type User = {
  id: string;
  username: string;
};

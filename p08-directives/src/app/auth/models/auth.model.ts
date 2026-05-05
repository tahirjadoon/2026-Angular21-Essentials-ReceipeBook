export const PERMISSION_TYPES = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
} as const;

export type Permission = typeof PERMISSION_TYPES[keyof typeof PERMISSION_TYPES];

//loopable list
export const PERMISSION_LIST: Permission[] = Object.values(PERMISSION_TYPES);

export interface DefaultUserInfo {
  user: UserAuth;
  admin: UserAuth;
  guest: UserAuth; 
}

export interface UserAuth{
  email: string;
  password: string;
}


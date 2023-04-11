type TypeRole = 'admin' | 'user';

export type TypeUser = {
  username: string;
  email: string;
  password: string;
  favorites: string[];
  role: TypeRole;
};

export class User {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly favorites: string[];
  readonly role: TypeRole;

  constructor({ username, email, password, favorites, role }: TypeUser) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.favorites = favorites;
    this.role = role;
  }
}

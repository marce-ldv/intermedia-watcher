export type TypeUser = {
  username: string;
  email: string;
  password: string;
  favorites: string[];
};

export class User {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly favorites: string[];

  constructor({ username, email, password, favorites }: TypeUser) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.favorites = favorites;
  }
}

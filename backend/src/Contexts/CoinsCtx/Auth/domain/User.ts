export type TypeUser = {
  username: string;
  email: string;
  password: string;
};

export class User {
  readonly username: string;
  readonly email: string;
  readonly password: string;

  constructor({ username, email, password }: TypeUser) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

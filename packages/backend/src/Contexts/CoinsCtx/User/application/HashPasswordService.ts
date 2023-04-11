export class HashPasswordService {
  // add salt to the password
  handleEncryptedPassword = (password: string): string => {
    const encryptedPassword = Buffer.from(password).toString('base64');
    return encryptedPassword;
  };

  // compare the password
  compare(password: string, hash: string): boolean {
    return this.handleEncryptedPassword(password) === hash;
  }
}

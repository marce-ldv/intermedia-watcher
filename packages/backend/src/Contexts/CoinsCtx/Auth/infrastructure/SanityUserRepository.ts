import axios from "axios";
import {User} from "../domain/User";
import {UserRepository} from "../domain/UserRepository";
import {JWTService} from "../application/JWTService";

const SANITY_TOKEN = process.env.SANITY_TOKEN;

export class SanityUserRepository implements UserRepository {
  async register(user: User): Promise<void> {

    const handleEncryptedPassword = (password: string): string => {
      const encryptedPassword = Buffer.from(password).toString('base64')
      return encryptedPassword
    }
    await axios.post('https://6fyyl8sn.api.sanity.io/v1/data/mutate/user', {
        mutations: [
          {
            create: {
              _type: 'user',
              email: user.email,
              username: user.username,
              password: handleEncryptedPassword(user.password),
            }
          },
        ],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SANITY_TOKEN}`,
        }
      }
    );
  }

  async findUserByEmail(user: { email: string }): Promise<User> {
    const response = await axios.get('https://6fyyl8sn.api.sanity.io/v1/data/query/user', {
      params: {
        query: `*[_type == "user" && email == "${user.email}"]`,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SANITY_TOKEN}`,
      }
    })
    console.log('response', response.data)

    const jwtService = new JWTService()
    jwtService.generateToken('password12345')


    return new User({ email: 'email', password: 'password', username: 'username' });
  }
}

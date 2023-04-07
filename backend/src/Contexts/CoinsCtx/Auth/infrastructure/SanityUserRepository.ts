import axios from "axios";
import {User} from "../domain/User";
import {UserRepository} from "../domain/UserRepository";

const SANITY_TOKEN = process.env.SANITY_TOKEN;

export class SanityUserRepository implements UserRepository {
  async register(user: User): Promise<void> {
    console.log(SANITY_TOKEN)

    const response = await axios.post('https://6fyyl8sn.api.sanity.io/v1/data/mutate/user', {
        mutations: [
          {
            create: {
              _type: 'user',
              email: user.email,
              username: user.username,
              password: user.password,
            }
          },
        ],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SANITY_TOKEN}`,
        }
      }
    )

    console.log(response)
  }
}

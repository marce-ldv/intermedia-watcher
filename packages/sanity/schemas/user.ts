export default {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    {
      name: 'username',
      type: 'string',
      title: 'Username',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'password',
      type: 'string',
      title: 'Password',
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role',
      options: {
        list: [
          {title: 'Admin', value: 'admin'},
          {title: 'User', value: 'user'},
        ],
      },
    },
    {
      name: 'favorites',
      type: 'array',
      title: 'Favorites',
      of: [
        {
          type: 'string',
        },
      ],
    },
  ],
}

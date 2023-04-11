export default {
  name: 'coin',
  type: 'document',
  title: 'Coin',
  fields: [
    {
      name: 'id',
      type: 'string',
      title: 'Id',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'symbol',
      type: 'string',
      title: 'Symbol',
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
    },
    {
      name: 'canFavorite',
      type: 'boolean',
      title: 'Can Favorite',
    }
  ]
}

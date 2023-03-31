import { CollectionConfig } from 'payload/types';

const Genres: CollectionConfig = {
  slug: 'genres',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: false,
}

export default Genres;
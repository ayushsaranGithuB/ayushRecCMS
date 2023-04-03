import { CollectionConfig } from "payload/types";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    defaultColumns: ["title", "imdbLink", "author", "tags", "status"],
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "imdbLink",
      type: "text",
    },
    {
      name: "imdbScore",
      type: "number",
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "yearRelease",
      type: "number",
    },
    {
      name: "countryRegion",
      type: "text",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "publishedDate",
      type: "date",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "genres",
      type: "relationship",
      relationTo: "genres",
      hasMany: true,
    },
    {
      name: "plotSynopsis",
      type: "textarea",
    },
    {
      name: "externalReviews",
      type: "textarea",
    },
    {
      name: "whyWatch",
      type: "textarea",
    },
    {
      name: "starVerdict",
      type: "number",
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          value: "draft",
          label: "Draft",
        },
        {
          value: "published",
          label: "Published",
        },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

export default Posts;

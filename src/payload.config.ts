import { buildConfig } from "payload/config";
import path from "path";
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { gcsAdapter } from '@payloadcms/plugin-cloud-storage/gcs';

import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import Genres from "./collections/Genres";

const adapter = gcsAdapter({
  options: {
    // you can choose any method for authentication, and authorization which is being provided by `@google-cloud/storage`
    keyFilename: path.resolve(__dirname, "../gcs-credentials.json"),
    },
  bucket: process.env.GCS_BUCKET,
})


export default buildConfig({
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter: adapter, // see docs for the adapter you want to use          
          disablePayloadAccessControl : true,
        },
      },
      
    }),
  ],
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, "../css/admin.css"),
  },
  collections: [Posts, Tags, Users, Media, Genres],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});

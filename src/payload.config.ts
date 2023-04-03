import { buildConfig } from "payload/config";
import path from "path";
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { gcsAdapter } from '@payloadcms/plugin-cloud-storage/gcs';

import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import Genres from "./collections/Genres";


process.env.GCS_CREDENTIALS = '{ "type": "service_account","project_id": "payload-382523","private_key_id": "bbf5b68ecac62aaef99254783c6202ce7c48b511","private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQza9sQyd6au+Z\\njDg7FWfclAbu+b8Byf1hSZaspHTR8F1Oeeui3HqvCrId2TRAAELM2CbvTgNUdPAz\\nmmYes56sB7gHujPUU8ioO+wZGE2Hd6mqt4VbkdC3S3ivhoGFw+hLxqg5Ul8ssCcj\\n09Bl933yePP9qC5r7Tj9uOLUeMi6v4BEAwreZ9nTuPewPnx3nQQYVeYql1tkMS3Q\\ntkrTRJlFQzRmHT4CXCBwNHFfzkBK7/S7CuOebnhKzes6hIWANz4wIVoGboUDVr+Q\\nIXl9tMswqUmSX53shWNg56b4wxYjFrSp67f1koyKyl40mQSQW1e28CPelC4KHK6L\\ngtQ4+FGnAgMBAAECggEATdVWPl98AFSLUuvjbBbLG/yr5vn+ut5+Dn1dZqZ5C2bz\\niRTGgvN34fb1NU4pfW/7dpteTBcDA8EBZuL3jRs8mvjXnz3IIy5GHnwTwrj98XDo\\nNIRreBpPOHwwFRHpByFjXpfDTnbHloNlW6QRy2ipsLBolxXRlBaeB2obV8NcY8vg\\ntljZZwlnOi5cSJoRhywq5n938KBJ4qvjaARsoR1j4KzYyQjzameTwZV2bTG6uW/f\\nykw0++E265Q+uLmoK/mBYe1D3iMEG0C/wVNiQywqSkRRIPLmuVjb8w2iUr38ge3g\\n+/fJYdqUC6EiPYuXONzUOfd/MqfD1q30A9xUQGhtnQKBgQD76V9HqrRIKT5za8TS\\nljO0S2y9GXKUB7cPetZ/OqblrTCKcDk3X4U3Cm5z5+0YLye1lzXCS4Drh9aWl4Tw\\nmnpiIoLBYYgWfvJsKd3BRWUqmEmSFH3L/+ScpBnRj0VdgLkm5OHJne2AbDHGsLuq\\n5syGuEINwLLi+vooEcro+KuQmwKBgQDUMTW1QWOkUrmzcz7DpsNKP//OdUj9QX7h\\nZSDb0/LcPJZ0hKaWV9yC2NkDzneLJ9JbS6yauqHx6zhRrToumUZeRzIQ51l6xQoI\\nQLi5NFRpVDdrnApuGkzrT4Qqp+glCrEQGwMS8csOZCz2SAEeMvBUO3+iytFNVsMN\\nmGnXzf3V5QKBgGjkxwjXetQlYFy9PiqV4perZG7lHsGm6MHoW1KFAKPYVsL+ccSt\\n4JGHpXBb3WzZjcZeXUM3H0pzuJXiJ7fsCxO73Qha7Ui4uYbyc+UbWUHAQbozECKW\\nvgG/jwSkjLSfeflJCv9h5Fg6NQvP4YULL5TVOqPxXkuHSAzRQ9V4XjALAoGBAJYS\\no8ipEZ7zfzFCzd40gKRv9S0A2Hl9rA4fpwiys24+T67i7qsgQu4sDfhaO0QpCubU\\n86OPYeAmm3Nwz9iLQTCGrAs2hJuG5hyGId+i+hxwmq2588qBQWuflntQu6gPEsGw\\nSRFJ/3ITOZWJwXipUD5SwmfRiAxp05Q2+ozNvLxdAoGBAOeanXOb69BQgILHuDzy\\nEaxwwvuHUg1NBmlj/qlqxmvY3yBIuzx7h9A5fINws3aYvQmaUJVscdt9ROptpZ4H\\nmdTNOKEc5eKJxOPS2dwKUZxBtslICX5RXVS54Itjpd1CRwBBCaPIp7BaU4xAPE63\\nyvb3MnDUMxBq5Byx5kt4OaII\\n-----END PRIVATE KEY-----\\n","client_email": "payloadservice@payload-382523.iam.gserviceaccount.com","client_id": "113997353051826269128","auth_uri": "https://accounts.google.com/o/oauth2/auth","token_uri": "https://oauth2.googleapis.com/token","auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/payloadservice%40payload-382523.iam.gserviceaccount.com"}'


const adapter = gcsAdapter({
  options: {
    // you can choose any method for authentication, and authorization which is being provided by `@google-cloud/storage`
    credentials: JSON.parse(process.env.GCS_CREDENTIALS || "{}"),
  },
  bucket: process.env.GCS_BUCKET,
})


export default buildConfig({
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter: adapter, // see docs for the adapter you want to use          
          disablePayloadAccessControl: true,
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

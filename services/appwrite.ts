import { Client, TablesDB } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://tor.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const tables = new TablesDB(client);

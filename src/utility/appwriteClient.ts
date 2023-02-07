import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

const APPWRITE_URL = "https://appwrite.kyeboard.me/v1";
const APPWRITE_PROJECT = "63df174eb4161f4803ca";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };

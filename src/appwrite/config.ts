import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}
type LoginUserAccount = {
    email: string,
    password: string,
}

const appwriteClient = new Client();
appwriteClient.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectID);

export const account = new Account(appwriteClient)

export class AppwriteService {
    // Create a new record of user inside appwrite
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);
            if (userAccount) return this.login({ email, password });
            else return userAccount

        } catch (error) {
            console.log('error caught in appwrite/config.ts: ', error)
            throw error
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createEmailSession(email, password)
        } catch (error) {
            console.log('caught error in config/login', error)
            throw error;
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) {
            console.log('caught error in config/isLogginIN', error)
        }
        return false;
    }

    async getCurrentUser() {
        try {
            return account.get();
        } catch (error) {
            console.log('caught error in config/getCurrentUser', error)
        }
        return null;
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
            console.log('caught error in config/logout', error)
        }
    }
}

const appwriteService = new AppwriteService(); //create instance of service Class

export default appwriteService; //export instance, so that single instance could be used for entire project.
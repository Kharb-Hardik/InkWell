import {Client,Account,Id} from "appwrite"
import conf from "../config/config.js"

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl) // Your API Endpoint
            .setProject(conf.appWriteProjectId) // Your project ID
            this.account = new Account(this.client);
    }

    async createAcc({email, password,name}) {
        try {
            const useracc=await this.account.create(Id.unique(),email, password, name);
            if(useracc)
                return this.login({email, password});
        } catch (error) {
            throw   error
        }
    }  
    
    async login({email, password}) {
        try {   
            return this.account.createEmailSession(email, password);
        } catch (error) {
            throw   error
        }
    }

    async getcurrentuser(){
        try {
            return this.account.get();
        } catch (error) {
            throw   error
        }
        return null
    }

    async logout(){
       try {
            return await this.account.deleteSessions();
       } catch (error) {
           console.log("Appwrite logout error",error)
           throw error
       }
    }
}


const authservice=new AuthService();
export default authservice
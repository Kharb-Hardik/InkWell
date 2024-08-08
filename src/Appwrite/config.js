import { Client,ID,Databases,Storage,Query} from "appwrite";
import conf from "../config/config.js";
class Services {
    client = new Client();
    database
    storage
    constructor() {
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createdoc({title,slug,content,image,status,userId}){
        try { 
            return await this.database.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    image,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite :: createdoc :: ",error);
            throw error;
        }
    }

    async updatedoc(slug,{title,content,image,status}){
        try{    
            return await this.database.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            )
        }catch(error){
            console.log("Appwrite :: updatedoc :: ",error);
            throw error
        }
    }

    async deletedoc(slug){
        try{    
            await this.database.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        }catch(error){
            console.log("Appwrite :: deletedoc :: ",error);
            return false
        }
    }

    async getdoc(slug){
        try{
            return await this.database.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
            )
        } catch(error){
            console.log("Appwrite :: getdoc :: ",error);
            throw error;
        }
    }

    async getdocs(query=[Query.equal("status","active")]){
        try{
            return await this.database.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                query,
            )
        }catch(error){
            console.log("Appwrite :: getdocs :: ",error);
            throw error;
        }
    }

    async uploadfile(file){
        try{
            return await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Appwrite :: uploadfile :: ",error);
            throw error;
        }
    }

    async getfilepreview(fileId){   
        try{    
            return await this.storage.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
        }catch(error){
            console.log("Appwrite :: getfilepreview :: ",error);
            throw error;
        }
    }

    async deletefile(fileId){
        try{
            await this.storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        }catch(error){
            console.log("Appwrite :: deletefile :: ",error);
            return false
        }
    }
}   

export default new Services();
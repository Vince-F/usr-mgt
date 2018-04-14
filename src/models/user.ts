import mongoose = require("mongoose");

export class User {
    login:string;
    password:string;
    email:string;

    private mongooseModelInstance:any;
    private static mongooseSchema:mongoose.Model<mongoose.Document>;

    constructor(login:string,password:string,email:string) {
        this.login = login;
        this.password = password;
        this.email = email;

        this.mongooseModelInstance = new (User.getMongooseModel())(this);
        Object.defineProperty(this,"mongooseModelInstance",{
            enumerable:false
        });
    }

    save():Promise<void> {
        return new Promise((resolve,reject) => {
            this.mongooseModelInstance.save((error:string) => {
                if(error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    static getMongooseModel():mongoose.Model<mongoose.Document> {
        if(this.mongooseSchema === undefined) {
            this.mongooseSchema = mongoose.model("AppUsers",this.getMongooseSchema());
        }
        return this.mongooseSchema;
    }

    static getMongooseSchema() {
        return new mongoose.Schema({
            login: {
                type:String,
                required:true
            },
            password: {
                type:String,
                required:true
            },
            email: {
                type: String,
                required:true
            }
        })
    }
}
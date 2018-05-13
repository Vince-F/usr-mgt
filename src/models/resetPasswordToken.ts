import mongoose = require("mongoose");

export class ResetPasswordToken {
    userId:string;
    token:string;
    expirationDate:Date;

    private mongooseModelInstance:any;
    private static mongooseSchema:mongoose.Model<mongoose.Document>;

    constructor(userId:string,token:string) {
        this.userId = userId;
        this.token = token;
        this.expirationDate = new Date(Date.now() + 24 * 60 *60 * 1000); // 24h

        this.mongooseModelInstance = new (ResetPasswordToken.getMongooseModel())(this);
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
            this.mongooseSchema = mongoose.model("ResetPasswordTokens",this.getMongooseSchema());
        }
        return this.mongooseSchema;
    }

    static getMongooseSchema() {
        return new mongoose.Schema({
            userId: {
                type:String,
                required:true
            },
            token: {
                type:String,
                required:true
            },
            expirationDate: {
                type: Date,
                required:true
            }
        });
    }
}
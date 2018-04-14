import {User} from "../models/user";

export class UserApiController {

    create(login:string,password:string,email:string):Promise<User> {
        // check that login doesn't exist
        return this.retrieveOne(login)
            .then(() => {
                return Promise.reject("Login is already taken");
            }).catch((error) => {
                if(error === "User doesn't exist") {
                    let user = new User(login,password,email);
                    return user.save()
                        .then(() => {
                            return user;  
                        });
                } else if (error === "Login is already taken") {
                    return Promise.reject(error);
                } else {
                    return Promise.reject("Fail to check login uniqueness");
                }
            });   
    }

    retrieveOne(login:string):Promise<User> {
        return new Promise((resolve,reject) => {
            User.getMongooseModel().findOne({login},(error:any,user:User) => {
                if(error) {
                    reject(error);
                } else if(!user) {
                    reject("User doesn't exist");
                } else {
                    resolve(user);
                }
            });
        });
    }

    retrieveAll():Promise<Array<User>> {
        return new Promise((resolve,reject) => {
            User.getMongooseModel().find((error:any,users:Array<User>) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(users);
                }
            });
        });
    }

    update(login:string,userData:User):Promise<User> {
        return new Promise((resolve,reject) => {
            User.getMongooseModel().findOne({login},(error:any,user:User) => {
                if(error) {
                    reject(error);
                } else if(user === undefined) {
                    reject("User doesn't exist");
                } else {
                    userData.login = user.login;
                    userData.password = user.password;
                    User.getMongooseModel().updateOne({login},userData,(error:any) => {
                        if(error) {
                            reject(error);
                        } else {
                            resolve(userData);
                        }
                    });
                }
            });
        });
    }

    delete(login:string) {
        return new Promise((resolve,reject) => {
            User.getMongooseModel().deleteOne({login:login},(error:any) => {
                if(error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    changePassword(login:string,oldPassword:string,newPassword:string):Promise<User> {
        return new Promise((resolve,reject) => {
            User.getMongooseModel().findOne({login},(error:any,user:User) => {
                if(error) {
                    reject(error);
                } else {
                    if(user.password === oldPassword) {
                        user.password = newPassword;
                        User.getMongooseModel().updateOne({login},user,(error:any) => {
                            if(error) {
                                reject(error);
                            } else {
                                resolve(user);
                            }
                        });
                    } else {
                        reject("Your current password is wrong.")
                    }
                }
            });
        });
    }

    /*requestPasswordReset(login:string,email:string):Promise<boolean> {
        var token = (Math.random() * 1000000000).toString(36);
        return Promise.reject("Not implemeted");
    }

    resetPassword(login:string,token:string,newPassword:string):Promise<boolean> {
        return Promise.reject("Not implemented")
    }*/
}
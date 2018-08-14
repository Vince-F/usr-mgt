

export class Options {
    database?: {
        url?:string;
        tableName?:string;
        auth?: {
            user:string;
            password:string;
        }
    };
    
}
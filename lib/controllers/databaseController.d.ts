export declare class DatabaseController {
    private db;
    private host;
    constructor(dbUrl: string);
    connect(): Promise<boolean>;
}

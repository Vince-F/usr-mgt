import { Options } from "../models/options";

export class OptionsManager {
    private currentOptions:Options;

    private getDefaultOptions() {
        return {
            database: {
                url:"localhost:27017",
                tableName:"AppUsers"
            }
        } as Options;
    }

    private mergeOptions(optionsMerged:Options,optionsToBeMerged:Options) {
        if(!optionsMerged.database) {
            optionsMerged.database = {};
        }
        optionsMerged.database.url = optionsToBeMerged.database.url || optionsMerged.database.url;
        optionsMerged.database.tableName = optionsToBeMerged.database.tableName || optionsMerged.database.tableName;
        return optionsMerged;
    }

    setCurrentOptions(options:Options) {
        this.currentOptions = this.mergeOptions(this.getDefaultOptions(), options);
    }

    getCurrentOptions() {
        return this.currentOptions;
    }
}

export let optionsManagerInstance = new OptionsManager();
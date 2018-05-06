"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OptionsManager {
    getDefaultOptions() {
        return {
            database: {
                url: "localhost:27017",
                tableName: "AppUsers"
            }
        };
    }
    mergeOptions(optionsMerged, optionsToBeMerged) {
        if (!optionsMerged.database) {
            optionsMerged.database = {};
        }
        optionsMerged.database.url = optionsToBeMerged.database.url || optionsMerged.database.url;
        optionsMerged.database.tableName = optionsToBeMerged.database.tableName || optionsMerged.database.tableName;
        return optionsMerged;
    }
    setCurrentOptions(options) {
        this.currentOptions = this.mergeOptions(options, this.getDefaultOptions());
    }
    getCurrentOptions() {
        return this.currentOptions;
    }
}
exports.OptionsManager = OptionsManager;
exports.optionsManagerInstance = new OptionsManager();

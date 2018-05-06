import { Options } from "../models/options";
export declare class OptionsManager {
    private currentOptions;
    private getDefaultOptions();
    private mergeOptions(optionsMerged, optionsToBeMerged);
    setCurrentOptions(options: Options): void;
    getCurrentOptions(): Options;
}
export declare let optionsManagerInstance: OptionsManager;

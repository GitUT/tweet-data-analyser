import promptMaker from 'prompt-sync';

import * as defs from "./definitions.js";
import Counter from "./counter.js";


const prompter = promptMaker();

export function actionPrompt(): defs.Action {
    message("Choose from actions: count, language, date, hashtags: ");
    const action: string = prompter("> ");
    if (!(action in defs.Action)) {
        message("Unknown action. Exiting program");
        process.exit(0);
    }

    message("Executing action: " + action);
    return action as defs.Action;
}

// Printer function
export function onEnd(action: defs.Action, counter: Counter, rowCount: number): void {
    function onLanguage(): void {
        message("Detected English: " + counter.enCount);
        message("Unknowns: " + counter.unknownCount);
    }

    function onDate(): void {
        message("Rows within dates: " + counter.rowsWithinDates);
    }

    function onCount(): void {

    }

    function onHashtags(): void {

    }

    const actionMapper = {
        [defs.Action.language]: onLanguage,
        [defs.Action.date]: onDate,
        [defs.Action.count]: onCount,
        [defs.Action.hashtags]: onHashtags
    }

    message(`Parsed ${rowCount} rows`);
    actionMapper[action]();
    message('Time elapsed: ');
    console.timeEnd('timer');
}

export function message(message) {
    console.log(message);
}
export function error(error: Error) {
    console.log(error);
}

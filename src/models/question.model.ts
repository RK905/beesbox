export interface SurveyOpt {
    
    icon: string;
    optVal: string;
}



export class Question {

    constructor(public query: string, public opts: SurveyOpt[]) {}
}


// export interface IVisibility{
//     ONLY_ME?: string;
//     ONLY_FRIENDS?: string;
//     PUBLIC?: string;
// }

// export class Visibility implements IVisibility {
//     constructor(
//         public ONLY_ME?: string,
//         public ONLY_FRIENDS?: string,
//         public PUBLIC?: string

//     ){

//     }
    
// }
export const enum Visibility {
    ONLY_ME = 'ONLY_ME',
    ONLY_FRIENDS = 'ONLY_FRIENDS',
    PUBLIC = 'PUBLIC'
}

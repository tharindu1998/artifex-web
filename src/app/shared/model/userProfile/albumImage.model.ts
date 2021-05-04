export interface IAlbumImage{
    imageUrl?: string[];
    description?: string[];
}

export class AlbumImage implements IAlbumImage{
    constructor(
        public imageUrl?: string[],
        public description?: string[]
    ){

    }
}
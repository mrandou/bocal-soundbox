export interface Sound {
    id: number
    title: string;
    pictureUrl: string;
    url: string;
    extended?: string;
    new?: boolean;
    nsfw?: boolean;
    tags?: string[];
}
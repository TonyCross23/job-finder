export class Location {
    id: string;
    name: string;
    description?: string | null;

    constructor(id: string, name: string, descriiption?: string) {
        this.id = id;
        this.name = name;
        this.description = descriiption
    }
}
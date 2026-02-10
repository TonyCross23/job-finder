export type Location = {
    id: string
    name: string
    description?: string
}

export interface CreateLocationInput {
    name: string;
    description?: string;
}
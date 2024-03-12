export interface UserTableView {
    id: number;
    name: string;
    email: string;    
}

export interface User {
    id: number;
    name: Name;
    fullname: string;
    email: string;
    phone: string;
    cell: string;
    birthdate: string;
    picture: Picture;
    location: Location;
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface Name {
    title: string;
    first: string;
    last: string;
}

export interface Location {
    country: string;
    state: string;
    city: string;
    postcode: string;
    street: Street;
    coordinates: any;
    timezone: any;
}

export interface Street {
    name: string;
    number: string;
}

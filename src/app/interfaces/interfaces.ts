export interface PostResponse {
    ok: boolean;
    pagina: number;
    posts: Post[];
}

export interface Post {
    img?: string[];
    _id?: string;
    mensaje?: string;
    coords?: string;
    user?: User;
    created?: string;
    position?: boolean;
}

export interface User {
    avatar?: string;
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
}
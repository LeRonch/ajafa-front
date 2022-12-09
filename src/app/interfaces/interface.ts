export interface User {
  username: string;
  email: string;
  profile_picture: ProfilePicture;
}

export interface ProfilePicture {
  id: number;
  profile_picture: string;
  user: number;
}

export interface TagsObject {
  count: number;
  next?: string;
  previous?: string;
  results: Tag[];
}

export interface Tag {
  id: number;
  label: string;
  count: number;
}

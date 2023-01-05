export interface User {
  id: number;
  username: string;
  email: string;
  profile_picture: ProfilePicture;
}

export interface ProfilePicture {
  id: number;
  profile_picture: string;
  user: number;
  paypal_link?: string;
  patreon_link?: string;
  twitter_link?: string;
  description?: string;
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

export interface Creation {
  creation: string;
  date: Date;
  description: string;
  download_count: number;
  fav_count: number;
  id: number;
  fav?: number[];
  tags?: number[];
  title: string;
  type: string;
  user: User;
}

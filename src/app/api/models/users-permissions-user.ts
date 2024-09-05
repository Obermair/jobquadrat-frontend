/* tslint:disable */
/* eslint-disable */
export interface UsersPermissionsUser {
  advertisements?: Array<{
'id': string;
'jobTitle'?: string;
'workingTime'?: string;
'location'?: string;
'salary'?: string;
'assignment'?: string;
'requirements'?: string;
'benefits'?: string;
'placementBonus'?: number;
'district'?: string;
'users_permissions_user'?: string;
'publishedAt'?: string;
'created_by'?: string;
'updated_by'?: string;
}>;
  blocked?: boolean;
  confirmed?: boolean;
  email: string;
  id: string;
  description: string;
  provider?: string;
  services?: string;
  profile_img?: string;
  profile_img_id?: string;
  public?: boolean;
  role?: {
'id': string;
'name': string;
'description'?: string;
'type'?: string;
'permissions'?: Array<string>;
'users'?: Array<string>;
'created_by'?: string;
'updated_by'?: string;
};
  username: string;
}

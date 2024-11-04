export interface Advertisement {
  assignment?: string;
  benefits?: string;
  district?: {
'id': string;
'name'?: string;
'advertisements'?: Array<string>;
'publishedAt'?: string;
'created_by'?: string;
'updated_by'?: string;
};
  id: string;
  jobTitle?: string;
  location?: string;
  placementBonus?: number;
  updatedAt?: string;
  createdAt?: string;
  publishedAt?: string;
  requirements?: string;
  salary?: string;
  currentPlacementBonus?: number;
  jobInfo?: string;
  users_permissions_user?: {
'id': string;
'username': string;
'email': string;
'provider'?: string;
'password'?: string;
'resetPasswordToken'?: string;
'confirmationToken'?: string;
'confirmed'?: boolean;
'blocked'?: boolean;
'role'?: string;
'advertisements'?: Array<string>;
'created_by'?: string;
'updated_by'?: string;
'description'?: string;
};
  workingTime?: string;
}

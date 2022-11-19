/* tslint:disable */
/* eslint-disable */
export interface UsersPermissionsRole {
  description?: string;
  id: string;
  name: string;
  permissions?: Array<{
'id': string;
'type': string;
'controller': string;
'action': string;
'enabled': boolean;
'policy'?: string;
'role'?: string;
'created_by'?: string;
'updated_by'?: string;
}>;
  type?: string;
  users?: Array<{
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
}>;
}

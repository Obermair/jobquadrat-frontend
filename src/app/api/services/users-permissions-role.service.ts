/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { NewUsersPermissionsRole } from '../models/new-users-permissions-role';
import { UsersPermissionsRole } from '../models/users-permissions-role';

@Injectable({
  providedIn: 'root',
})
export class UsersPermissionsRoleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation usersPermissionsRolesIdGet
   */
  static readonly UsersPermissionsRolesIdGetPath = '/users-permissions/roles/{id}';

  /**
   * Retrieve a role depending on its id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersPermissionsRolesIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersPermissionsRolesIdGet$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UsersPermissionsRole>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsRoleService.UsersPermissionsRolesIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UsersPermissionsRole>;
      })
    );
  }

  /**
   * Retrieve a role depending on its id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersPermissionsRolesIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersPermissionsRolesIdGet(params: {
    id: string;
    context?: HttpContext
  }
): Observable<UsersPermissionsRole> {

    return this.usersPermissionsRolesIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<UsersPermissionsRole>) => r.body as UsersPermissionsRole)
    );
  }

  /**
   * Path part for operation usersPermissionsRolesGet
   */
  static readonly UsersPermissionsRolesGetPath = '/users-permissions/roles';

  /**
   * Retrieve all role documents
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersPermissionsRolesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersPermissionsRolesGet$Response(params?: {

    /**
     * Maximum number of results possible
     */
    '_limit'?: number;

    /**
     * Sort according to a specific field.
     */
    '_sort'?: string;

    /**
     * Skip a specific number of entries (especially useful for pagination)
     */
    '_start'?: number;

    /**
     * Get entries that matches exactly your input
     */
    '='?: string;

    /**
     * Get records that are not equals to something
     */
    '_ne'?: string;

    /**
     * Get record that are lower than a value
     */
    '_lt'?: string;

    /**
     * Get records that are lower than or equal to a value
     */
    '_lte'?: string;

    /**
     * Get records that are greater than a value
     */
    '_gt'?: string;

    /**
     * Get records that are greater than  or equal a value
     */
    '_gte'?: string;

    /**
     * Get records that contains a value
     */
    '_contains'?: string;

    /**
     * Get records that contains (case sensitive) a value
     */
    '_containss'?: string;

    /**
     * Get records that matches any value in the array of values
     */
    '_in'?: Array<string>;

    /**
     * Get records that doesn&#x27;t match any value in the array of values
     */
    '_nin'?: Array<string>;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<UsersPermissionsRole>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsRoleService.UsersPermissionsRolesGetPath, 'get');
    if (params) {
      rb.query('_limit', params['_limit'], {});
      rb.query('_sort', params['_sort'], {});
      rb.query('_start', params['_start'], {});
      rb.query('=', params['='], {});
      rb.query('_ne', params['_ne'], {});
      rb.query('_lt', params['_lt'], {});
      rb.query('_lte', params['_lte'], {});
      rb.query('_gt', params['_gt'], {});
      rb.query('_gte', params['_gte'], {});
      rb.query('_contains', params['_contains'], {});
      rb.query('_containss', params['_containss'], {});
      rb.query('_in', params['_in'], {});
      rb.query('_nin', params['_nin'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UsersPermissionsRole>>;
      })
    );
  }

  /**
   * Retrieve all role documents
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersPermissionsRolesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersPermissionsRolesGet(params?: {

    /**
     * Maximum number of results possible
     */
    '_limit'?: number;

    /**
     * Sort according to a specific field.
     */
    '_sort'?: string;

    /**
     * Skip a specific number of entries (especially useful for pagination)
     */
    '_start'?: number;

    /**
     * Get entries that matches exactly your input
     */
    '='?: string;

    /**
     * Get records that are not equals to something
     */
    '_ne'?: string;

    /**
     * Get record that are lower than a value
     */
    '_lt'?: string;

    /**
     * Get records that are lower than or equal to a value
     */
    '_lte'?: string;

    /**
     * Get records that are greater than a value
     */
    '_gt'?: string;

    /**
     * Get records that are greater than  or equal a value
     */
    '_gte'?: string;

    /**
     * Get records that contains a value
     */
    '_contains'?: string;

    /**
     * Get records that contains (case sensitive) a value
     */
    '_containss'?: string;

    /**
     * Get records that matches any value in the array of values
     */
    '_in'?: Array<string>;

    /**
     * Get records that doesn&#x27;t match any value in the array of values
     */
    '_nin'?: Array<string>;
    context?: HttpContext
  }
): Observable<Array<UsersPermissionsRole>> {

    return this.usersPermissionsRolesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UsersPermissionsRole>>) => r.body as Array<UsersPermissionsRole>)
    );
  }

  /**
   * Path part for operation usersPermissionsRolesPost
   */
  static readonly UsersPermissionsRolesPostPath = '/users-permissions/roles';

  /**
   * Create a new role
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersPermissionsRolesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersPermissionsRolesPost$Response(params: {
    context?: HttpContext
    body: NewUsersPermissionsRole
  }
): Observable<StrictHttpResponse<UsersPermissionsRole>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsRoleService.UsersPermissionsRolesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UsersPermissionsRole>;
      })
    );
  }

  /**
   * Create a new role
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersPermissionsRolesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersPermissionsRolesPost(params: {
    context?: HttpContext
    body: NewUsersPermissionsRole
  }
): Observable<UsersPermissionsRole> {

    return this.usersPermissionsRolesPost$Response(params).pipe(
      map((r: StrictHttpResponse<UsersPermissionsRole>) => r.body as UsersPermissionsRole)
    );
  }

  /**
   * Path part for operation usersPermissionsRolesRolePut
   */
  static readonly UsersPermissionsRolesRolePutPath = '/users-permissions/roles/{role}';

  /**
   * Update a role
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersPermissionsRolesRolePut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersPermissionsRolesRolePut$Response(params: {
    role: string;
    context?: HttpContext
    body: NewUsersPermissionsRole
  }
): Observable<StrictHttpResponse<UsersPermissionsRole>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsRoleService.UsersPermissionsRolesRolePutPath, 'put');
    if (params) {
      rb.path('role', params.role, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UsersPermissionsRole>;
      })
    );
  }

  /**
   * Update a role
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersPermissionsRolesRolePut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersPermissionsRolesRolePut(params: {
    role: string;
    context?: HttpContext
    body: NewUsersPermissionsRole
  }
): Observable<UsersPermissionsRole> {

    return this.usersPermissionsRolesRolePut$Response(params).pipe(
      map((r: StrictHttpResponse<UsersPermissionsRole>) => r.body as UsersPermissionsRole)
    );
  }

  /**
   * Path part for operation usersPermissionsRolesRoleDelete
   */
  static readonly UsersPermissionsRolesRoleDeletePath = '/users-permissions/roles/{role}';

  /**
   * Delete a role
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersPermissionsRolesRoleDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersPermissionsRolesRoleDelete$Response(params: {
    role: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsRoleService.UsersPermissionsRolesRoleDeletePath, 'delete');
    if (params) {
      rb.path('role', params.role, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        'foo'?: string;
        }>;
      })
    );
  }

  /**
   * Delete a role
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersPermissionsRolesRoleDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersPermissionsRolesRoleDelete(params: {
    role: string;
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.usersPermissionsRolesRoleDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

}

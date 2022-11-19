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

import { NewUsersPermissionsUser } from '../models/new-users-permissions-user';
import { UsersPermissionsUser } from '../models/users-permissions-user';

@Injectable({
  providedIn: 'root',
})
export class UsersPermissionsUserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation usersPermissionsSearchIdGet
   */
  static readonly UsersPermissionsSearchIdGetPath = '/users-permissions/search/{id}';

  /**
   * Search for users
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersPermissionsSearchIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersPermissionsSearchIdGet$Response(params: {
    id: string;

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
): Observable<StrictHttpResponse<Array<UsersPermissionsUser>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.UsersPermissionsSearchIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
        return r as StrictHttpResponse<Array<UsersPermissionsUser>>;
      })
    );
  }

  /**
   * Search for users
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersPermissionsSearchIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersPermissionsSearchIdGet(params: {
    id: string;

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
): Observable<Array<UsersPermissionsUser>> {

    return this.usersPermissionsSearchIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UsersPermissionsUser>>) => r.body as Array<UsersPermissionsUser>)
    );
  }

  /**
   * Path part for operation connectGet
   */
  static readonly ConnectGetPath = '/connect/*';

  /**
   * Connect a provider
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `connectGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  connectGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.ConnectGetPath, 'get');
    if (params) {
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
   * Connect a provider
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `connectGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  connectGet(params?: {
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.connectGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation authLocalPost
   */
  static readonly AuthLocalPostPath = '/auth/local';

  /**
   * Login a user using the identifiers email and password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLocalPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authLocalPost$Response(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.AuthLocalPostPath, 'post');
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
        return r as StrictHttpResponse<{
        'foo'?: string;
        }>;
      })
    );
  }

  /**
   * Login a user using the identifiers email and password
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authLocalPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authLocalPost(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<{
'foo'?: string;
}> {

    return this.authLocalPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation authLocalRegisterPost
   */
  static readonly AuthLocalRegisterPostPath = '/auth/local/register';

  /**
   * Register a new user with the default role
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLocalRegisterPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authLocalRegisterPost$Response(params: {
    context?: HttpContext
    body: NewUsersPermissionsUser
  }
): Observable<StrictHttpResponse<UsersPermissionsUser>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.AuthLocalRegisterPostPath, 'post');
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
        return r as StrictHttpResponse<UsersPermissionsUser>;
      })
    );
  }

  /**
   * Register a new user with the default role
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authLocalRegisterPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authLocalRegisterPost(params: {
    context?: HttpContext
    body: NewUsersPermissionsUser
  }
): Observable<UsersPermissionsUser> {

    return this.authLocalRegisterPost$Response(params).pipe(
      map((r: StrictHttpResponse<UsersPermissionsUser>) => r.body as UsersPermissionsUser)
    );
  }

  /**
   * Path part for operation authProviderCallbackGet
   */
  static readonly AuthProviderCallbackGetPath = '/auth/{provider}/callback';

  /**
   * Successfull redirection after approving a provider
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authProviderCallbackGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderCallbackGet$Response(params: {
    provider: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.AuthProviderCallbackGetPath, 'get');
    if (params) {
      rb.path('provider', params.provider, {});
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
   * Successfull redirection after approving a provider
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authProviderCallbackGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authProviderCallbackGet(params: {
    provider: string;
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.authProviderCallbackGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation authForgotPasswordPost
   */
  static readonly AuthForgotPasswordPostPath = '/auth/forgot-password';

  /**
   * Send the reset password email link
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authForgotPasswordPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authForgotPasswordPost$Response(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.AuthForgotPasswordPostPath, 'post');
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
        return r as StrictHttpResponse<{
        'foo'?: string;
        }>;
      })
    );
  }

  /**
   * Send the reset password email link
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authForgotPasswordPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authForgotPasswordPost(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<{
'foo'?: string;
}> {

    return this.authForgotPasswordPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation authResetPasswordPost
   */
  static readonly AuthResetPasswordPostPath = '/auth/reset-password';

  /**
   * Reset user password with a code (resetToken)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authResetPasswordPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authResetPasswordPost$Response(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.AuthResetPasswordPostPath, 'post');
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
        return r as StrictHttpResponse<{
        'foo'?: string;
        }>;
      })
    );
  }

  /**
   * Reset user password with a code (resetToken)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authResetPasswordPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authResetPasswordPost(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<{
'foo'?: string;
}> {

    return this.authResetPasswordPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation authEmailConfirmationGet
   */
  static readonly AuthEmailConfirmationGetPath = '/auth/email-confirmation';

  /**
   * Validate a user account
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authEmailConfirmationGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  authEmailConfirmationGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.AuthEmailConfirmationGetPath, 'get');
    if (params) {
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
   * Validate a user account
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authEmailConfirmationGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authEmailConfirmationGet(params?: {
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.authEmailConfirmationGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation authSendEmailConfirmationPost
   */
  static readonly AuthSendEmailConfirmationPostPath = '/auth/send-email-confirmation';

  /**
   * Send a confirmation email to user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authSendEmailConfirmationPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authSendEmailConfirmationPost$Response(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.AuthSendEmailConfirmationPostPath, 'post');
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
        return r as StrictHttpResponse<{
        'foo'?: string;
        }>;
      })
    );
  }

  /**
   * Send a confirmation email to user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authSendEmailConfirmationPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authSendEmailConfirmationPost(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<{
'foo'?: string;
}> {

    return this.authSendEmailConfirmationPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation usersGet
   */
  static readonly UsersGetPath = '/users';

  /**
   * Retrieve all user documents
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersGet$Response(params?: {

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
): Observable<StrictHttpResponse<Array<UsersPermissionsUser>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.UsersGetPath, 'get');
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
        return r as StrictHttpResponse<Array<UsersPermissionsUser>>;
      })
    );
  }

  /**
   * Retrieve all user documents
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersGet(params?: {

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
): Observable<Array<UsersPermissionsUser>> {

    return this.usersGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UsersPermissionsUser>>) => r.body as Array<UsersPermissionsUser>)
    );
  }

  /**
   * Path part for operation usersMeGet
   */
  static readonly UsersMeGetPath = '/users/me';

  /**
   * Retrieve the logged in user information
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersMeGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersMeGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UsersPermissionsUser>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.UsersMeGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UsersPermissionsUser>;
      })
    );
  }

  /**
   * Retrieve the logged in user information
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersMeGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersMeGet(params?: {
    context?: HttpContext
  }
): Observable<UsersPermissionsUser> {

    return this.usersMeGet$Response(params).pipe(
      map((r: StrictHttpResponse<UsersPermissionsUser>) => r.body as UsersPermissionsUser)
    );
  }

  /**
   * Path part for operation usersIdGet
   */
  static readonly UsersIdGetPath = '/users/{id}';

  /**
   * Retrieve a single user depending on his id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersIdGet$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UsersPermissionsUser>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.UsersIdGetPath, 'get');
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
        return r as StrictHttpResponse<UsersPermissionsUser>;
      })
    );
  }

  /**
   * Retrieve a single user depending on his id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersIdGet(params: {
    id: string;
    context?: HttpContext
  }
): Observable<UsersPermissionsUser> {

    return this.usersIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<UsersPermissionsUser>) => r.body as UsersPermissionsUser)
    );
  }

  /**
   * Path part for operation usersIdPut
   */
  static readonly UsersIdPutPath = '/users/{id}';

  /**
   * Update an existing user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersIdPut$Response(params: {
    id: string;
    context?: HttpContext
    body: NewUsersPermissionsUser
  }
): Observable<StrictHttpResponse<UsersPermissionsUser>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.UsersIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UsersPermissionsUser>;
      })
    );
  }

  /**
   * Update an existing user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersIdPut(params: {
    id: string;
    context?: HttpContext
    body: NewUsersPermissionsUser
  }
): Observable<UsersPermissionsUser> {

    return this.usersIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<UsersPermissionsUser>) => r.body as UsersPermissionsUser)
    );
  }

  /**
   * Path part for operation usersIdDelete
   */
  static readonly UsersIdDeletePath = '/users/{id}';

  /**
   * Delete an existing user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersIdDelete$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UsersPermissionsUserService.UsersIdDeletePath, 'delete');
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
        return r as StrictHttpResponse<{
        'foo'?: string;
        }>;
      })
    );
  }

  /**
   * Delete an existing user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersIdDelete(params: {
    id: string;
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.usersIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

}

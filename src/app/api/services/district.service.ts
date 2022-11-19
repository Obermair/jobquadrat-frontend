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

import { District } from '../models/district';
import { NewDistrict } from '../models/new-district';

@Injectable({
  providedIn: 'root',
})
export class DistrictService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation districtsGet
   */
  static readonly DistrictsGetPath = '/districts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `districtsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  districtsGet$Response(params?: {

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
): Observable<StrictHttpResponse<Array<District>>> {

    const rb = new RequestBuilder(this.rootUrl, DistrictService.DistrictsGetPath, 'get');
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
        return r as StrictHttpResponse<Array<District>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `districtsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  districtsGet(params?: {

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
): Observable<Array<District>> {

    return this.districtsGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<District>>) => r.body as Array<District>)
    );
  }

  /**
   * Path part for operation districtsPost
   */
  static readonly DistrictsPostPath = '/districts';

  /**
   * Create a new record
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `districtsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  districtsPost$Response(params: {
    context?: HttpContext
    body: NewDistrict
  }
): Observable<StrictHttpResponse<District>> {

    const rb = new RequestBuilder(this.rootUrl, DistrictService.DistrictsPostPath, 'post');
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
        return r as StrictHttpResponse<District>;
      })
    );
  }

  /**
   * Create a new record
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `districtsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  districtsPost(params: {
    context?: HttpContext
    body: NewDistrict
  }
): Observable<District> {

    return this.districtsPost$Response(params).pipe(
      map((r: StrictHttpResponse<District>) => r.body as District)
    );
  }

  /**
   * Path part for operation districtsCountGet
   */
  static readonly DistrictsCountGetPath = '/districts/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `districtsCountGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  districtsCountGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'count'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, DistrictService.DistrictsCountGetPath, 'get');
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
        'count'?: number;
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `districtsCountGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  districtsCountGet(params?: {
    context?: HttpContext
  }
): Observable<{
'count'?: number;
}> {

    return this.districtsCountGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'count'?: number;
}>) => r.body as {
'count'?: number;
})
    );
  }

  /**
   * Path part for operation districtsIdGet
   */
  static readonly DistrictsIdGetPath = '/districts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `districtsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  districtsIdGet$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<District>> {

    const rb = new RequestBuilder(this.rootUrl, DistrictService.DistrictsIdGetPath, 'get');
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
        return r as StrictHttpResponse<District>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `districtsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  districtsIdGet(params: {
    id: string;
    context?: HttpContext
  }
): Observable<District> {

    return this.districtsIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<District>) => r.body as District)
    );
  }

  /**
   * Path part for operation districtsIdPut
   */
  static readonly DistrictsIdPutPath = '/districts/{id}';

  /**
   * Update a record
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `districtsIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  districtsIdPut$Response(params: {
    id: string;
    context?: HttpContext
    body: NewDistrict
  }
): Observable<StrictHttpResponse<District>> {

    const rb = new RequestBuilder(this.rootUrl, DistrictService.DistrictsIdPutPath, 'put');
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
        return r as StrictHttpResponse<District>;
      })
    );
  }

  /**
   * Update a record
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `districtsIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  districtsIdPut(params: {
    id: string;
    context?: HttpContext
    body: NewDistrict
  }
): Observable<District> {

    return this.districtsIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<District>) => r.body as District)
    );
  }

  /**
   * Path part for operation districtsIdDelete
   */
  static readonly DistrictsIdDeletePath = '/districts/{id}';

  /**
   * Delete a record
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `districtsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  districtsIdDelete$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, DistrictService.DistrictsIdDeletePath, 'delete');
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
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Delete a record
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `districtsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  districtsIdDelete(params: {
    id: string;
    context?: HttpContext
  }
): Observable<number> {

    return this.districtsIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}

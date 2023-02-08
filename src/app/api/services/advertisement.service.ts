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

import { Advertisement } from '../models/advertisement';
import { NewAdvertisement } from '../models/new-advertisement';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation advertisementsGet
   */
  static readonly AdvertisementsGetPath = '/advertisements';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertisementsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertisementsGet$Response(params?: {

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
): Observable<StrictHttpResponse<Array<Advertisement>>> {

    const rb = new RequestBuilder(this.rootUrl, AdvertisementService.AdvertisementsGetPath, 'get');
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
        return r as StrictHttpResponse<Array<Advertisement>>;
      })
    );
  }


  advertisementsCustomFilterGet(filterParams: string){
    //send a get request to the server with the filter params
    return this.http.get(this.rootUrl + AdvertisementService.AdvertisementsGetPath + filterParams);
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `advertisementsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertisementsGet(params?: {

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
): Observable<Array<Advertisement>> {

    return this.advertisementsGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Advertisement>>) => r.body as Array<Advertisement>)
    );
  }



 


  /**
   * Path part for operation advertisementsPost
   */
  static readonly AdvertisementsPostPath = '/advertisements';

  /**
   * Create a new record
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertisementsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertisementsPost$Response(params: {
    context?: HttpContext
    body: NewAdvertisement
  }
): Observable<StrictHttpResponse<Advertisement>> {

    const rb = new RequestBuilder(this.rootUrl, AdvertisementService.AdvertisementsPostPath, 'post');
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
        return r as StrictHttpResponse<Advertisement>;
      })
    );
  }

  /**
   * Create a new record
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `advertisementsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertisementsPost(params: {
    context?: HttpContext
    body: NewAdvertisement
  }
): Observable<Advertisement> {

    return this.advertisementsPost$Response(params).pipe(
      map((r: StrictHttpResponse<Advertisement>) => r.body as Advertisement)
    );
  }

  /**
   * Path part for operation advertisementsCountGet
   */
  static readonly AdvertisementsCountGetPath = '/advertisements/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertisementsCountGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertisementsCountGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'count'?: number;
}>> {

    const rb = new RequestBuilder(this.rootUrl, AdvertisementService.AdvertisementsCountGetPath, 'get');
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
   * To access the full response (for headers, for example), `advertisementsCountGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertisementsCountGet(params?: {
    context?: HttpContext
  }
): Observable<{
'count'?: number;
}> {

    return this.advertisementsCountGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'count'?: number;
}>) => r.body as {
'count'?: number;
})
    );
  }

  /**
   * Path part for operation advertisementsIdGet
   */
  static readonly AdvertisementsIdGetPath = '/advertisements/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertisementsIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertisementsIdGet$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Advertisement>> {

    const rb = new RequestBuilder(this.rootUrl, AdvertisementService.AdvertisementsIdGetPath, 'get');
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
        return r as StrictHttpResponse<Advertisement>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `advertisementsIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertisementsIdGet(params: {
    id: string;
    context?: HttpContext
  }
): Observable<Advertisement> {

    return this.advertisementsIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Advertisement>) => r.body as Advertisement)
    );
  }

  /**
   * Path part for operation advertisementsIdPut
   */
  static readonly AdvertisementsIdPutPath = '/advertisements/{id}';

  /**
   * Update a record
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertisementsIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertisementsIdPut$Response(params: {
    id: string;
    context?: HttpContext
    body: NewAdvertisement
  }
): Observable<StrictHttpResponse<Advertisement>> {

    const rb = new RequestBuilder(this.rootUrl, AdvertisementService.AdvertisementsIdPutPath, 'put');
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
        return r as StrictHttpResponse<Advertisement>;
      })
    );
  }

  /**
   * Update a record
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `advertisementsIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  advertisementsIdPut(params: {
    id: string;
    context?: HttpContext
    body: NewAdvertisement
  }
): Observable<Advertisement> {

    return this.advertisementsIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<Advertisement>) => r.body as Advertisement)
    );
  }

  /**
   * Path part for operation advertisementsIdDelete
   */
  static readonly AdvertisementsIdDeletePath = '/advertisements/{id}';

  /**
   * Delete a record
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `advertisementsIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertisementsIdDelete$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, AdvertisementService.AdvertisementsIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `advertisementsIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  advertisementsIdDelete(params: {
    id: string;
    context?: HttpContext
  }
): Observable<number> {

    return this.advertisementsIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}

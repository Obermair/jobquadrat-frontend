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


@Injectable({
  providedIn: 'root',
})
export class UploadFileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation uploadPost
   */
  static readonly UploadPostPath = '/upload/';

  /**
   * Upload a file
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadPost$Response(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UploadFileService.UploadPostPath, 'post');
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
   * Upload a file
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadPost(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<{
'foo'?: string;
}> {

    return this.uploadPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation uploadFilesCountGet
   */
  static readonly UploadFilesCountGetPath = '/upload/files/count';

  /**
   * Retrieve the total number of uploaded files
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFilesCountGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFilesCountGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UploadFileService.UploadFilesCountGetPath, 'get');
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
   * Retrieve the total number of uploaded files
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFilesCountGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFilesCountGet(params?: {
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.uploadFilesCountGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation uploadFilesGet
   */
  static readonly UploadFilesGetPath = '/upload/files';

  /**
   * Retrieve all file documents
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFilesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFilesGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UploadFileService.UploadFilesGetPath, 'get');
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
   * Retrieve all file documents
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFilesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFilesGet(params?: {
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.uploadFilesGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation uploadFilesIdGet
   */
  static readonly UploadFilesIdGetPath = '/upload/files/{id}';

  /**
   * Retrieve a single file depending on its id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFilesIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFilesIdGet$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UploadFileService.UploadFilesIdGetPath, 'get');
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
   * Retrieve a single file depending on its id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFilesIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFilesIdGet(params: {
    id: string;
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.uploadFilesIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation uploadFilesIdDelete
   */
  static readonly UploadFilesIdDeletePath = '/upload/files/{id}';

  /**
   * Delete an uploaded file
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFilesIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFilesIdDelete$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UploadFileService.UploadFilesIdDeletePath, 'delete');
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
   * Delete an uploaded file
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFilesIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadFilesIdDelete(params: {
    id: string;
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.uploadFilesIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation uploadSearchIdGet
   */
  static readonly UploadSearchIdGetPath = '/upload/search/{id}';

  /**
   * Search for an uploaded file
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadSearchIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadSearchIdGet$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, UploadFileService.UploadSearchIdGetPath, 'get');
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
   * Search for an uploaded file
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadSearchIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  uploadSearchIdGet(params: {
    id: string;
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.uploadSearchIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

}

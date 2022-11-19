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
export class EmailEmailService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation emailPost
   */
  static readonly EmailPostPath = '/email/';

  /**
   * Send an email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `emailPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  emailPost$Response(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, EmailEmailService.EmailPostPath, 'post');
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
   * Send an email
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `emailPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  emailPost(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<{
'foo'?: string;
}> {

    return this.emailPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation emailTestPost
   */
  static readonly EmailTestPostPath = '/email/test';

  /**
   * Send an test email
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `emailTestPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  emailTestPost$Response(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, EmailEmailService.EmailTestPostPath, 'post');
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
   * Send an test email
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `emailTestPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  emailTestPost(params: {
    context?: HttpContext
    body: {
'foo'?: string;
}
  }
): Observable<{
'foo'?: string;
}> {

    return this.emailTestPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

  /**
   * Path part for operation emailSettingsGet
   */
  static readonly EmailSettingsGetPath = '/email/settings';

  /**
   * Get the email settings
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `emailSettingsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  emailSettingsGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
'foo'?: string;
}>> {

    const rb = new RequestBuilder(this.rootUrl, EmailEmailService.EmailSettingsGetPath, 'get');
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
   * Get the email settings
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `emailSettingsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  emailSettingsGet(params?: {
    context?: HttpContext
  }
): Observable<{
'foo'?: string;
}> {

    return this.emailSettingsGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
'foo'?: string;
}>) => r.body as {
'foo'?: string;
})
    );
  }

}

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Admin {
  id?: string;
  username?: string;
  passwordhash?: string;
  role?: string;
}

export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface SuperUser {
  id?: string;
  username?: string;
  passwordhash?: string;
  role?: string;
}

export interface User {
  id?: string;
  username?: string;
  passwordhash?: string;
  role?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:5000";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title My Title
 * @version 1.0.0
 * @baseUrl http://localhost:5000
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name AdminGetAllAdmins
     * @request GET:/Admin/GetAllAdmins
     */
    adminGetAllAdmins: (params: RequestParams = {}) =>
      this.request<Admin[], any>({
        path: `/Admin/GetAllAdmins`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminPostAdmin
     * @request POST:/Admin/PostAdmin
     */
    adminPostAdmin: (data: Admin, params: RequestParams = {}) =>
      this.request<Blob, any>({
        path: `/Admin/PostAdmin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminDeleteAdmin
     * @request DELETE:/Admin/DeleteAdmin
     */
    adminDeleteAdmin: (
      query?: {
        adminId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/Admin/DeleteAdmin`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags Login
     * @name LoginLogin
     * @request POST:/Login
     */
    loginLogin: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<Blob, any>({
        path: `/Login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  superUser = {
    /**
     * No description
     *
     * @tags SuperUser
     * @name SuperUserGetAllSuperUsers
     * @request GET:/SuperUser/GetAllSuperUsers
     */
    superUserGetAllSuperUsers: (params: RequestParams = {}) =>
      this.request<SuperUser[], any>({
        path: `/SuperUser/GetAllSuperUsers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SuperUser
     * @name SuperUserPostSuperUser
     * @request POST:/SuperUser/PostSuperUser
     */
    superUserPostSuperUser: (data: SuperUser, params: RequestParams = {}) =>
      this.request<Blob, any>({
        path: `/SuperUser/PostSuperUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags SuperUser
     * @name SuperUserDeleteSuperUser
     * @request DELETE:/SuperUser/DeleteSuperUser
     */
    superUserDeleteSuperUser: (
      query?: {
        superUserId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/SuperUser/DeleteSuperUser`,
        method: "DELETE",
        query: query,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name UserGetAllUsers
     * @request GET:/User/GetAllUsers
     */
    userGetAllUsers: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/User/GetAllUsers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserPostUser
     * @request POST:/User/PostUser
     */
    userPostUser: (data: User, params: RequestParams = {}) =>
      this.request<Blob, any>({
        path: `/User/PostUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserDeleteUser
     * @request DELETE:/User/DeleteUser
     */
    userDeleteUser: (
      query?: {
        userId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/User/DeleteUser`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserEditUser
     * @request PUT:/User/EditUser
     */
    userEditUser: (
      query?: {
        userId?: string;
        newUsername?: string;
        newPassword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/User/EditUser`,
        method: "PUT",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserEditAdmin
     * @request PUT:/User/EditAdmin
     */
    userEditAdmin: (
      query?: {
        adminId?: string;
        newUsername?: string;
        newPassword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/User/EditAdmin`,
        method: "PUT",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserEditSuperUser
     * @request PUT:/User/EditSuperUser
     */
    userEditSuperUser: (
      query?: {
        superuserId?: string;
        newUsername?: string;
        newPassword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/User/EditSuperUser`,
        method: "PUT",
        query: query,
        ...params,
      }),
  };
}

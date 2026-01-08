/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
import "api-typing"
export interface paths {
    "/pets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * @description Returns all pets from the system that the user has access to
         *     Nam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.
         *
         *     Sed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.
         */
        get: operations["findPets"];
        put?: never;
        /** @description Creates a new pet in the store. Duplicates are allowed */
        post: operations["addPet"];
        /** @description 通过查询参数删除宠物 */
        delete: operations["deletePetByQuery"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pets/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Returns a user based on a single ID, if the user does not have access to the pet */
        get: operations["find pet by id"];
        /** @description 更新已存在的宠物信息 */
        put: operations["updatePet"];
        post?: never;
        /** @description deletes a single pet based on the ID supplied */
        delete: operations["deletePet"];
        options?: never;
        head?: never;
        /** @description 部分更新宠物信息 */
        patch: operations["patchPet"];
        trace?: never;
    };
    "/pets/paramsOrQuery/{testParam}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Returns a user based on a single ID, if the user does not have access to the pet */
        get: operations["test pets get params or query"];
        /** @description Returns a user based on a single ID, if the user does not have access to the pet */
        put: operations["test pets put params or query"];
        /** @description Returns a user based on a single ID, if the user does not have access to the pet */
        post: operations["test pets post params or query"];
        /** @description Returns a user based on a single ID, if the user does not have access to the pet */
        delete: operations["test pets delete params or query"];
        options?: never;
        /** @description Returns a user based on a single ID, if the user does not have access to the pet */
        head: operations["test pets head params or query"];
        /** @description Returns a user based on a single ID, if the user does not have access to the pet */
        patch: operations["test pets patch params or query"];
        trace?: never;
    };
    "/absolute-redirect/{n}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Absolutely 302 Redirects n times. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    n: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/redirect-to": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 302/3XX Redirects to the given URL. */
        get: {
            parameters: {
                query: {
                    /** @example  */
                    url: string;
                    /** @example  */
                    status_code?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** 302/3XX Redirects to the given URL. */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/x-www-form-urlencoded": {
                        url: string;
                        status_code?: number;
                    };
                };
            };
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** 302/3XX Redirects to the given URL. */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/x-www-form-urlencoded": {
                        url: string;
                        status_code?: number;
                    };
                };
            };
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** 302/3XX Redirects to the given URL. */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** 302/3XX Redirects to the given URL. */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** 302/3XX Redirects to the given URL. */
        trace: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
    };
    "/redirect/{n}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 302 Redirects n times. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    n: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/relative-redirect/{n}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Relatively 302 Redirects n times. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    n: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A redirection. */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/anything": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns anything passed in request data. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns anything passed in request data. */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns anything passed in request data. */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns anything passed in request data. */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Returns anything passed in request data. */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns anything passed in request data. */
        trace: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
    };
    "/anything/{anything}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns anything passed in request data. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    anything: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns anything passed in request data. */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    anything: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns anything passed in request data. */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    anything: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns anything passed in request data. */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    anything: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Returns anything passed in request data. */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    anything: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns anything passed in request data. */
        trace: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    anything: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Anything passed in request */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
    };
    "/base64/{value}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Decodes base64url-encoded string. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    value: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Decoded base64 content. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/bytes/{n}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns n random bytes generated with given seed */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    n: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Bytes. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/delay/{delay}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a delayed response (max of 10 seconds). */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    delay: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A delayed response. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns a delayed response (max of 10 seconds). */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    delay: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A delayed response. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns a delayed response (max of 10 seconds). */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    delay: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A delayed response. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns a delayed response (max of 10 seconds). */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    delay: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A delayed response. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Returns a delayed response (max of 10 seconds). */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    delay: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A delayed response. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Returns a delayed response (max of 10 seconds). */
        trace: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    delay: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A delayed response. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
    };
    "/drip": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Drips data over a duration after an optional initial delay. */
        get: {
            parameters: {
                query?: {
                    /**
                     * @description The amount of time (in seconds) over which to drip each byte
                     * @example
                     */
                    duration?: number;
                    /**
                     * @description The number of bytes to respond with
                     * @example
                     */
                    numbytes?: number;
                    /**
                     * @description The response code that will be returned
                     * @example
                     */
                    code?: number;
                    /**
                     * @description The amount of time (in seconds) to delay before responding
                     * @example
                     */
                    delay?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A dripped response. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/links/{n}/{offset}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Generate a page containing n links to other pages which do the same. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    n: number;
                    /** @example  */
                    offset: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description HTML links. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/range/{numbytes}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Streams n random bytes generated with given seed, at given chunk size per packet. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    numbytes: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Bytes. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/stream-bytes/{n}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Streams n random bytes generated with given seed, at given chunk size per packet. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    n: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Bytes. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/stream/{n}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Stream n JSON responses */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    n: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Streamed JSON responses. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/uuid": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a UUID4. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A UUID4. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/basic-auth/{user}/{passwd}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Prompts the user for authorization using HTTP Basic Auth. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    user: string;
                    /** @example  */
                    passwd: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Sucessful authentication. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Unsuccessful authentication. */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/bearer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Prompts the user for authorization using bearer authentication. */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @example  */
                    Authorization?: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Sucessful authentication. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Unsuccessful authentication. */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/digest-auth/{qop}/{user}/{passwd}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Prompts the user for authorization using Digest Auth. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /**
                     * @description auth or auth-int
                     * @example
                     */
                    qop: string;
                    /** @example  */
                    user: string;
                    /** @example  */
                    passwd: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Sucessful authentication. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Unsuccessful authentication. */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/digest-auth/{qop}/{user}/{passwd}/{algorithm}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Prompts the user for authorization using Digest Auth + Algorithm. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /**
                     * @description auth or auth-int
                     * @example
                     */
                    qop: string;
                    /** @example  */
                    user: string;
                    /** @example  */
                    passwd: string;
                    /**
                     * @description MD5, SHA-256, SHA-512
                     * @example
                     */
                    algorithm: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Sucessful authentication. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Unsuccessful authentication. */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/digest-auth/{qop}/{user}/{passwd}/{algorithm}/{stale_after}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Prompts the user for authorization using Digest Auth + Algorithm.
         * @description allow settings the stale_after argument.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /**
                     * @description auth or auth-int
                     * @example
                     */
                    qop: string;
                    /** @example  */
                    user: string;
                    /** @example  */
                    passwd: string;
                    /**
                     * @description MD5, SHA-256, SHA-512
                     * @example
                     */
                    algorithm: string;
                    /** @example  */
                    stale_after: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Sucessful authentication. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Unsuccessful authentication. */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/hidden-basic-auth/{user}/{passwd}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Prompts the user for authorization using HTTP Basic Auth. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    user: string;
                    /** @example  */
                    passwd: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Sucessful authentication. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Unsuccessful authentication. */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/brotli": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns Brotli-encoded data. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Brotli-encoded data. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/deflate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns Deflate-encoded data. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Defalte-encoded data. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/deny": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns page denied by robots.txt rules. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Denied message */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/encoding/utf8": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a UTF-8 encoded body. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Encoded UTF-8 content. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/gzip": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns GZip-encoded data. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description GZip-encoded data. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/html": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a simple HTML document. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An HTML page. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/json": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a simple JSON document. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An JSON document. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/robots.txt": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns some robots.txt rules. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Robots file */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/xml": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a simple XML document. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An XML document. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cache": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a 304 if an If-Modified-Since header or If-None-Match is present. Returns the same as a GET otherwise. */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @example  */
                    "If-Modified-Since"?: string;
                    /** @example  */
                    "If-None-Match"?: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Cached response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Modified */
                304: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cache/{value}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sets a Cache-Control header for n seconds. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    value: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Cache control set */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/etag/{etag}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Assumes the resource has the given etag and responds to If-None-Match and If-Match headers appropriately. */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @example  */
                    "If-None-Match"?: string;
                    /** @example  */
                    "If-Match"?: string;
                };
                path: {
                    /** @example  */
                    etag: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Normal response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description match */
                412: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/response-headers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a set of response headers from the query string. */
        get: {
            parameters: {
                query?: {
                    /** @example  */
                    freeform?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Response headers */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        /** Returns a set of response headers from the query string. */
        post: {
            parameters: {
                query?: {
                    /** @example  */
                    freeform?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Response headers */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cookies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns cookie data. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Set cookies. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cookies/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Deletes cookie(s) as provided by the query string and redirects to cookie list. */
        get: {
            parameters: {
                query?: {
                    /** @example  */
                    freeform?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Redirect to cookie list */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cookies/set": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sets cookie(s) as provided by the query string and redirects to cookie list. */
        get: {
            parameters: {
                query?: {
                    /** @example  */
                    freeform?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Redirect to cookie list */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cookies/set/{name}/{value}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Sets a cookie and redirects to cookie list. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    name: string;
                    /** @example  */
                    value: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Set cookies and redirects to cookie list. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** The request's DELETE parameters. */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request's DELETE parameters. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/get": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** The request's query parameters. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request's query parameters. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/patch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** The request's PATCH parameters. */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request's PATCH parameters. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        trace?: never;
    };
    "/post": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** The request's POST parameters. */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request's POST parameters. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/put": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** The request's PUT parameters. */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request's PUT parameters. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/headers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the incoming request's HTTP headers. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request's headers. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ip": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns the requester's IP Address. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The Requester's IP Address. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user-agent": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the incoming requests's User-Agent header. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The request's User-Agent header. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/image": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a simple image of the type suggest by the Accept header. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An image. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/image/jpeg": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a simple JPEG image. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A JPEG image. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/image/png": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a simple PNG image. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A PNG image. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/image/svg": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a simple SVG image. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description An SVG image. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/image/webp": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Returns a simple WEBP image. */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A WEBP image. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/status/{codes}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return status code or random status code if more than one are given */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    codes: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Informational responses */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Redirection */
                300: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Client Errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Server Errors */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Success */
                "x-200:Success": {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Return status code or random status code if more than one are given */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    codes: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Informational responses */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Redirection */
                300: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Client Errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Server Errors */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Success */
                "x-200:Success": {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Return status code or random status code if more than one are given */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    codes: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Informational responses */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Redirection */
                300: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Client Errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Server Errors */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Success */
                "x-200:Success": {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Return status code or random status code if more than one are given */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    codes: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Informational responses */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Redirection */
                300: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Client Errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Server Errors */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Success */
                "x-200:Success": {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Return status code or random status code if more than one are given */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    codes: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Informational responses */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Redirection */
                300: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Client Errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Server Errors */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Success */
                "x-200:Success": {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        /** Return status code or random status code if more than one are given */
        trace: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @example  */
                    codes: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Informational responses */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Redirection */
                300: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Client Errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Server Errors */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Success */
                "x-200:Success": {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Pet: components["schemas"]["NewPet"] & {
            /** Format: int64 */
            id: number;
        };
        NewPet: {
            name: string;
            tag?: string;
        };
        Error: {
            /** Format: int32 */
            code: number;
            message: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    findPets: {
        parameters: {
            query?: {
                /** @description tags to filter by */
                tags?: string[];
                /** @description maximum number of results to return */
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"][];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    addPet: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pet to add to the store */
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewPet"];
            };
        };
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description params error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    deletePetByQuery: {
        parameters: {
            query: {
                /** @description 要删除的宠物ID */
                id: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet deleted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: int64 */
                        id?: number;
                    };
                };
            };
            /** @description 宠物删除成功 */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description 宠物不存在 */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description 意外错误 */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    "find pet by id": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet to fetch */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    updatePet: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 要更新的宠物ID */
                id: number;
            };
            cookie?: never;
        };
        /** @description 更新的宠物信息 */
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewPet"];
            };
        };
        responses: {
            /** @description 宠物信息已更新 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description 宠物不存在 */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description 意外错误 */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    deletePet: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of pet to delete */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet deleted */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: int64 */
                        id?: number;
                    };
                };
            };
            /** @description pet deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    patchPet: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 要更新的宠物ID */
                id: number;
            };
            cookie?: never;
        };
        /** @description 需要更新的宠物信息字段 */
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    tag?: string;
                };
            };
        };
        responses: {
            /** @description 宠物信息已部分更新 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description 宠物不存在 */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description 意外错误 */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    "test pets get params or query": {
        parameters: {
            query?: {
                /** @description ID of pet to fetch */
                id?: number;
                /** @description Name of pet to fetch */
                name?: string;
            };
            header?: never;
            path: {
                /** @description testParam */
                testParam: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    "test pets put params or query": {
        parameters: {
            query?: {
                /** @description ID of pet to fetch */
                id?: number;
                /** @description Name of pet to fetch */
                name?: string;
            };
            header?: never;
            path: {
                /** @description testParam */
                testParam: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    "test pets post params or query": {
        parameters: {
            query?: {
                /** @description ID of pet to fetch */
                id?: number;
                /** @description Name of pet to fetch */
                name?: string;
            };
            header?: never;
            path: {
                /** @description testParam */
                testParam: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    "test pets delete params or query": {
        parameters: {
            query?: {
                /** @description ID of pet to fetch */
                id?: number;
                /** @description Name of pet to fetch */
                name?: string;
            };
            header?: never;
            path: {
                /** @description testParam */
                testParam: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    "test pets head params or query": {
        parameters: {
            query?: {
                /** @description ID of pet to fetch */
                id?: number;
                /** @description Name of pet to fetch */
                name?: string;
            };
            header?: never;
            path: {
                /** @description testParam */
                testParam: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    "test pets patch params or query": {
        parameters: {
            query?: {
                /** @description ID of pet to fetch */
                id?: number;
                /** @description Name of pet to fetch */
                name?: string;
            };
            header?: never;
            path: {
                /** @description testParam */
                testParam: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description pet response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Pet"];
                };
            };
            /** @description unexpected error */
            default: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
}


export interface ApiTypingMeta {
  paths: paths;
  components: components;
  operations: operations;
  external: external;
}

declare module "api-typing" {
  export interface ApiTypingMeta {
    paths: paths;
    components: components;
    operations: operations;
    external: external;
  }
}

export {}
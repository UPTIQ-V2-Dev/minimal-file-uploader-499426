
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model FileUpload
 * 
 */
export type FileUpload = $Result.DefaultSelection<Prisma.$FileUploadPayload>
/**
 * Model MCPResource
 * 
 */
export type MCPResource = $Result.DefaultSelection<Prisma.$MCPResourcePayload>
/**
 * Model MCPOperation
 * 
 */
export type MCPOperation = $Result.DefaultSelection<Prisma.$MCPOperationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TokenType: {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH',
  RESET_PASSWORD: 'RESET_PASSWORD',
  VERIFY_EMAIL: 'VERIFY_EMAIL'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]


export const FileUploadStatus: {
  INITIATED: 'INITIATED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type FileUploadStatus = (typeof FileUploadStatus)[keyof typeof FileUploadStatus]


export const MCPResourceType: {
  PROCESS: 'PROCESS',
  DATA: 'DATA',
  TOOL: 'TOOL',
  CONTEXT: 'CONTEXT'
};

export type MCPResourceType = (typeof MCPResourceType)[keyof typeof MCPResourceType]


export const MCPResourceStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED'
};

export type MCPResourceStatus = (typeof MCPResourceStatus)[keyof typeof MCPResourceStatus]


export const MCPOperationStatus: {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type MCPOperationStatus = (typeof MCPOperationStatus)[keyof typeof MCPOperationStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TokenType = $Enums.TokenType

export const TokenType: typeof $Enums.TokenType

export type FileUploadStatus = $Enums.FileUploadStatus

export const FileUploadStatus: typeof $Enums.FileUploadStatus

export type MCPResourceType = $Enums.MCPResourceType

export const MCPResourceType: typeof $Enums.MCPResourceType

export type MCPResourceStatus = $Enums.MCPResourceStatus

export const MCPResourceStatus: typeof $Enums.MCPResourceStatus

export type MCPOperationStatus = $Enums.MCPOperationStatus

export const MCPOperationStatus: typeof $Enums.MCPOperationStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fileUpload`: Exposes CRUD operations for the **FileUpload** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FileUploads
    * const fileUploads = await prisma.fileUpload.findMany()
    * ```
    */
  get fileUpload(): Prisma.FileUploadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mCPResource`: Exposes CRUD operations for the **MCPResource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MCPResources
    * const mCPResources = await prisma.mCPResource.findMany()
    * ```
    */
  get mCPResource(): Prisma.MCPResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mCPOperation`: Exposes CRUD operations for the **MCPOperation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MCPOperations
    * const mCPOperations = await prisma.mCPOperation.findMany()
    * ```
    */
  get mCPOperation(): Prisma.MCPOperationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Token: 'Token',
    FileUpload: 'FileUpload',
    MCPResource: 'MCPResource',
    MCPOperation: 'MCPOperation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "token" | "fileUpload" | "mCPResource" | "mCPOperation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      FileUpload: {
        payload: Prisma.$FileUploadPayload<ExtArgs>
        fields: Prisma.FileUploadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileUploadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileUploadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          findFirst: {
            args: Prisma.FileUploadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileUploadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          findMany: {
            args: Prisma.FileUploadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>[]
          }
          create: {
            args: Prisma.FileUploadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          createMany: {
            args: Prisma.FileUploadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileUploadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>[]
          }
          delete: {
            args: Prisma.FileUploadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          update: {
            args: Prisma.FileUploadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          deleteMany: {
            args: Prisma.FileUploadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileUploadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FileUploadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>[]
          }
          upsert: {
            args: Prisma.FileUploadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileUploadPayload>
          }
          aggregate: {
            args: Prisma.FileUploadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFileUpload>
          }
          groupBy: {
            args: Prisma.FileUploadGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileUploadGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileUploadCountArgs<ExtArgs>
            result: $Utils.Optional<FileUploadCountAggregateOutputType> | number
          }
        }
      }
      MCPResource: {
        payload: Prisma.$MCPResourcePayload<ExtArgs>
        fields: Prisma.MCPResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MCPResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MCPResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>
          }
          findFirst: {
            args: Prisma.MCPResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MCPResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>
          }
          findMany: {
            args: Prisma.MCPResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>[]
          }
          create: {
            args: Prisma.MCPResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>
          }
          createMany: {
            args: Prisma.MCPResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MCPResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>[]
          }
          delete: {
            args: Prisma.MCPResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>
          }
          update: {
            args: Prisma.MCPResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>
          }
          deleteMany: {
            args: Prisma.MCPResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MCPResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MCPResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>[]
          }
          upsert: {
            args: Prisma.MCPResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPResourcePayload>
          }
          aggregate: {
            args: Prisma.MCPResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMCPResource>
          }
          groupBy: {
            args: Prisma.MCPResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<MCPResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.MCPResourceCountArgs<ExtArgs>
            result: $Utils.Optional<MCPResourceCountAggregateOutputType> | number
          }
        }
      }
      MCPOperation: {
        payload: Prisma.$MCPOperationPayload<ExtArgs>
        fields: Prisma.MCPOperationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MCPOperationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MCPOperationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>
          }
          findFirst: {
            args: Prisma.MCPOperationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MCPOperationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>
          }
          findMany: {
            args: Prisma.MCPOperationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>[]
          }
          create: {
            args: Prisma.MCPOperationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>
          }
          createMany: {
            args: Prisma.MCPOperationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MCPOperationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>[]
          }
          delete: {
            args: Prisma.MCPOperationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>
          }
          update: {
            args: Prisma.MCPOperationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>
          }
          deleteMany: {
            args: Prisma.MCPOperationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MCPOperationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MCPOperationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>[]
          }
          upsert: {
            args: Prisma.MCPOperationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCPOperationPayload>
          }
          aggregate: {
            args: Prisma.MCPOperationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMCPOperation>
          }
          groupBy: {
            args: Prisma.MCPOperationGroupByArgs<ExtArgs>
            result: $Utils.Optional<MCPOperationGroupByOutputType>[]
          }
          count: {
            args: Prisma.MCPOperationCountArgs<ExtArgs>
            result: $Utils.Optional<MCPOperationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    token?: TokenOmit
    fileUpload?: FileUploadOmit
    mCPResource?: MCPResourceOmit
    mCPOperation?: MCPOperationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Token: number
    FileUpload: number
    MCPResource: number
    MCPOperation: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Token?: boolean | UserCountOutputTypeCountTokenArgs
    FileUpload?: boolean | UserCountOutputTypeCountFileUploadArgs
    MCPResource?: boolean | UserCountOutputTypeCountMCPResourceArgs
    MCPOperation?: boolean | UserCountOutputTypeCountMCPOperationArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFileUploadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileUploadWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMCPResourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCPResourceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMCPOperationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCPOperationWhereInput
  }


  /**
   * Count Type MCPResourceCountOutputType
   */

  export type MCPResourceCountOutputType = {
    operations: number
  }

  export type MCPResourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    operations?: boolean | MCPResourceCountOutputTypeCountOperationsArgs
  }

  // Custom InputTypes
  /**
   * MCPResourceCountOutputType without action
   */
  export type MCPResourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResourceCountOutputType
     */
    select?: MCPResourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MCPResourceCountOutputType without action
   */
  export type MCPResourceCountOutputTypeCountOperationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCPOperationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.Role | null
    isEmailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: $Enums.Role | null
    isEmailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    isEmailVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string | null
    password: string
    role: $Enums.Role
    isEmailVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Token?: boolean | User$TokenArgs<ExtArgs>
    FileUpload?: boolean | User$FileUploadArgs<ExtArgs>
    MCPResource?: boolean | User$MCPResourceArgs<ExtArgs>
    MCPOperation?: boolean | User$MCPOperationArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "role" | "isEmailVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Token?: boolean | User$TokenArgs<ExtArgs>
    FileUpload?: boolean | User$FileUploadArgs<ExtArgs>
    MCPResource?: boolean | User$MCPResourceArgs<ExtArgs>
    MCPOperation?: boolean | User$MCPOperationArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Token: Prisma.$TokenPayload<ExtArgs>[]
      FileUpload: Prisma.$FileUploadPayload<ExtArgs>[]
      MCPResource: Prisma.$MCPResourcePayload<ExtArgs>[]
      MCPOperation: Prisma.$MCPOperationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
      password: string
      role: $Enums.Role
      isEmailVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Token<T extends User$TokenArgs<ExtArgs> = {}>(args?: Subset<T, User$TokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    FileUpload<T extends User$FileUploadArgs<ExtArgs> = {}>(args?: Subset<T, User$FileUploadArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    MCPResource<T extends User$MCPResourceArgs<ExtArgs> = {}>(args?: Subset<T, User$MCPResourceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    MCPOperation<T extends User$MCPOperationArgs<ExtArgs> = {}>(args?: Subset<T, User$MCPOperationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Token
   */
  export type User$TokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    cursor?: TokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * User.FileUpload
   */
  export type User$FileUploadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    where?: FileUploadWhereInput
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    cursor?: FileUploadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileUploadScalarFieldEnum | FileUploadScalarFieldEnum[]
  }

  /**
   * User.MCPResource
   */
  export type User$MCPResourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    where?: MCPResourceWhereInput
    orderBy?: MCPResourceOrderByWithRelationInput | MCPResourceOrderByWithRelationInput[]
    cursor?: MCPResourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MCPResourceScalarFieldEnum | MCPResourceScalarFieldEnum[]
  }

  /**
   * User.MCPOperation
   */
  export type User$MCPOperationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    where?: MCPOperationWhereInput
    orderBy?: MCPOperationOrderByWithRelationInput | MCPOperationOrderByWithRelationInput[]
    cursor?: MCPOperationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MCPOperationScalarFieldEnum | MCPOperationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TokenMinAggregateOutputType = {
    id: number | null
    token: string | null
    type: $Enums.TokenType | null
    expires: Date | null
    blacklisted: boolean | null
    createdAt: Date | null
    userId: number | null
  }

  export type TokenMaxAggregateOutputType = {
    id: number | null
    token: string | null
    type: $Enums.TokenType | null
    expires: Date | null
    blacklisted: boolean | null
    createdAt: Date | null
    userId: number | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    token: number
    type: number
    expires: number
    blacklisted: number
    createdAt: number
    userId: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TokenMinAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: number
    token: string
    type: $Enums.TokenType
    expires: Date
    blacklisted: boolean
    createdAt: Date
    userId: number
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "type" | "expires" | "blacklisted" | "createdAt" | "userId", ExtArgs["result"]["token"]>
  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      token: string
      type: $Enums.TokenType
      expires: Date
      blacklisted: boolean
      createdAt: Date
      userId: number
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'Int'>
    readonly token: FieldRef<"Token", 'String'>
    readonly type: FieldRef<"Token", 'TokenType'>
    readonly expires: FieldRef<"Token", 'DateTime'>
    readonly blacklisted: FieldRef<"Token", 'Boolean'>
    readonly createdAt: FieldRef<"Token", 'DateTime'>
    readonly userId: FieldRef<"Token", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
  }


  /**
   * Model FileUpload
   */

  export type AggregateFileUpload = {
    _count: FileUploadCountAggregateOutputType | null
    _avg: FileUploadAvgAggregateOutputType | null
    _sum: FileUploadSumAggregateOutputType | null
    _min: FileUploadMinAggregateOutputType | null
    _max: FileUploadMaxAggregateOutputType | null
  }

  export type FileUploadAvgAggregateOutputType = {
    id: number | null
    fileSize: number | null
    userId: number | null
  }

  export type FileUploadSumAggregateOutputType = {
    id: number | null
    fileSize: number | null
    userId: number | null
  }

  export type FileUploadMinAggregateOutputType = {
    id: number | null
    uploadId: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    status: $Enums.FileUploadStatus | null
    signedUrl: string | null
    fileUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    userId: number | null
  }

  export type FileUploadMaxAggregateOutputType = {
    id: number | null
    uploadId: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    status: $Enums.FileUploadStatus | null
    signedUrl: string | null
    fileUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    userId: number | null
  }

  export type FileUploadCountAggregateOutputType = {
    id: number
    uploadId: number
    fileName: number
    fileType: number
    fileSize: number
    status: number
    signedUrl: number
    fileUrl: number
    createdAt: number
    updatedAt: number
    completedAt: number
    userId: number
    _all: number
  }


  export type FileUploadAvgAggregateInputType = {
    id?: true
    fileSize?: true
    userId?: true
  }

  export type FileUploadSumAggregateInputType = {
    id?: true
    fileSize?: true
    userId?: true
  }

  export type FileUploadMinAggregateInputType = {
    id?: true
    uploadId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    status?: true
    signedUrl?: true
    fileUrl?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    userId?: true
  }

  export type FileUploadMaxAggregateInputType = {
    id?: true
    uploadId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    status?: true
    signedUrl?: true
    fileUrl?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    userId?: true
  }

  export type FileUploadCountAggregateInputType = {
    id?: true
    uploadId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    status?: true
    signedUrl?: true
    fileUrl?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    userId?: true
    _all?: true
  }

  export type FileUploadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileUpload to aggregate.
     */
    where?: FileUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileUploads to fetch.
     */
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FileUploads
    **/
    _count?: true | FileUploadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileUploadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileUploadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileUploadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileUploadMaxAggregateInputType
  }

  export type GetFileUploadAggregateType<T extends FileUploadAggregateArgs> = {
        [P in keyof T & keyof AggregateFileUpload]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFileUpload[P]>
      : GetScalarType<T[P], AggregateFileUpload[P]>
  }




  export type FileUploadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileUploadWhereInput
    orderBy?: FileUploadOrderByWithAggregationInput | FileUploadOrderByWithAggregationInput[]
    by: FileUploadScalarFieldEnum[] | FileUploadScalarFieldEnum
    having?: FileUploadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileUploadCountAggregateInputType | true
    _avg?: FileUploadAvgAggregateInputType
    _sum?: FileUploadSumAggregateInputType
    _min?: FileUploadMinAggregateInputType
    _max?: FileUploadMaxAggregateInputType
  }

  export type FileUploadGroupByOutputType = {
    id: number
    uploadId: string
    fileName: string
    fileType: string
    fileSize: number
    status: $Enums.FileUploadStatus
    signedUrl: string
    fileUrl: string
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    userId: number
    _count: FileUploadCountAggregateOutputType | null
    _avg: FileUploadAvgAggregateOutputType | null
    _sum: FileUploadSumAggregateOutputType | null
    _min: FileUploadMinAggregateOutputType | null
    _max: FileUploadMaxAggregateOutputType | null
  }

  type GetFileUploadGroupByPayload<T extends FileUploadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileUploadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileUploadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileUploadGroupByOutputType[P]>
            : GetScalarType<T[P], FileUploadGroupByOutputType[P]>
        }
      >
    >


  export type FileUploadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uploadId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    status?: boolean
    signedUrl?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileUpload"]>

  export type FileUploadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uploadId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    status?: boolean
    signedUrl?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileUpload"]>

  export type FileUploadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uploadId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    status?: boolean
    signedUrl?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileUpload"]>

  export type FileUploadSelectScalar = {
    id?: boolean
    uploadId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    status?: boolean
    signedUrl?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    userId?: boolean
  }

  export type FileUploadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uploadId" | "fileName" | "fileType" | "fileSize" | "status" | "signedUrl" | "fileUrl" | "createdAt" | "updatedAt" | "completedAt" | "userId", ExtArgs["result"]["fileUpload"]>
  export type FileUploadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileUploadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileUploadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FileUploadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FileUpload"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uploadId: string
      fileName: string
      fileType: string
      fileSize: number
      status: $Enums.FileUploadStatus
      signedUrl: string
      fileUrl: string
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
      userId: number
    }, ExtArgs["result"]["fileUpload"]>
    composites: {}
  }

  type FileUploadGetPayload<S extends boolean | null | undefined | FileUploadDefaultArgs> = $Result.GetResult<Prisma.$FileUploadPayload, S>

  type FileUploadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FileUploadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FileUploadCountAggregateInputType | true
    }

  export interface FileUploadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FileUpload'], meta: { name: 'FileUpload' } }
    /**
     * Find zero or one FileUpload that matches the filter.
     * @param {FileUploadFindUniqueArgs} args - Arguments to find a FileUpload
     * @example
     * // Get one FileUpload
     * const fileUpload = await prisma.fileUpload.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileUploadFindUniqueArgs>(args: SelectSubset<T, FileUploadFindUniqueArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FileUpload that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FileUploadFindUniqueOrThrowArgs} args - Arguments to find a FileUpload
     * @example
     * // Get one FileUpload
     * const fileUpload = await prisma.fileUpload.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileUploadFindUniqueOrThrowArgs>(args: SelectSubset<T, FileUploadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileUpload that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadFindFirstArgs} args - Arguments to find a FileUpload
     * @example
     * // Get one FileUpload
     * const fileUpload = await prisma.fileUpload.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileUploadFindFirstArgs>(args?: SelectSubset<T, FileUploadFindFirstArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileUpload that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadFindFirstOrThrowArgs} args - Arguments to find a FileUpload
     * @example
     * // Get one FileUpload
     * const fileUpload = await prisma.fileUpload.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileUploadFindFirstOrThrowArgs>(args?: SelectSubset<T, FileUploadFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FileUploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FileUploads
     * const fileUploads = await prisma.fileUpload.findMany()
     * 
     * // Get first 10 FileUploads
     * const fileUploads = await prisma.fileUpload.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileUploadWithIdOnly = await prisma.fileUpload.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileUploadFindManyArgs>(args?: SelectSubset<T, FileUploadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FileUpload.
     * @param {FileUploadCreateArgs} args - Arguments to create a FileUpload.
     * @example
     * // Create one FileUpload
     * const FileUpload = await prisma.fileUpload.create({
     *   data: {
     *     // ... data to create a FileUpload
     *   }
     * })
     * 
     */
    create<T extends FileUploadCreateArgs>(args: SelectSubset<T, FileUploadCreateArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FileUploads.
     * @param {FileUploadCreateManyArgs} args - Arguments to create many FileUploads.
     * @example
     * // Create many FileUploads
     * const fileUpload = await prisma.fileUpload.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileUploadCreateManyArgs>(args?: SelectSubset<T, FileUploadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FileUploads and returns the data saved in the database.
     * @param {FileUploadCreateManyAndReturnArgs} args - Arguments to create many FileUploads.
     * @example
     * // Create many FileUploads
     * const fileUpload = await prisma.fileUpload.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FileUploads and only return the `id`
     * const fileUploadWithIdOnly = await prisma.fileUpload.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileUploadCreateManyAndReturnArgs>(args?: SelectSubset<T, FileUploadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FileUpload.
     * @param {FileUploadDeleteArgs} args - Arguments to delete one FileUpload.
     * @example
     * // Delete one FileUpload
     * const FileUpload = await prisma.fileUpload.delete({
     *   where: {
     *     // ... filter to delete one FileUpload
     *   }
     * })
     * 
     */
    delete<T extends FileUploadDeleteArgs>(args: SelectSubset<T, FileUploadDeleteArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FileUpload.
     * @param {FileUploadUpdateArgs} args - Arguments to update one FileUpload.
     * @example
     * // Update one FileUpload
     * const fileUpload = await prisma.fileUpload.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileUploadUpdateArgs>(args: SelectSubset<T, FileUploadUpdateArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FileUploads.
     * @param {FileUploadDeleteManyArgs} args - Arguments to filter FileUploads to delete.
     * @example
     * // Delete a few FileUploads
     * const { count } = await prisma.fileUpload.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileUploadDeleteManyArgs>(args?: SelectSubset<T, FileUploadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FileUploads
     * const fileUpload = await prisma.fileUpload.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileUploadUpdateManyArgs>(args: SelectSubset<T, FileUploadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileUploads and returns the data updated in the database.
     * @param {FileUploadUpdateManyAndReturnArgs} args - Arguments to update many FileUploads.
     * @example
     * // Update many FileUploads
     * const fileUpload = await prisma.fileUpload.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FileUploads and only return the `id`
     * const fileUploadWithIdOnly = await prisma.fileUpload.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FileUploadUpdateManyAndReturnArgs>(args: SelectSubset<T, FileUploadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FileUpload.
     * @param {FileUploadUpsertArgs} args - Arguments to update or create a FileUpload.
     * @example
     * // Update or create a FileUpload
     * const fileUpload = await prisma.fileUpload.upsert({
     *   create: {
     *     // ... data to create a FileUpload
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FileUpload we want to update
     *   }
     * })
     */
    upsert<T extends FileUploadUpsertArgs>(args: SelectSubset<T, FileUploadUpsertArgs<ExtArgs>>): Prisma__FileUploadClient<$Result.GetResult<Prisma.$FileUploadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FileUploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadCountArgs} args - Arguments to filter FileUploads to count.
     * @example
     * // Count the number of FileUploads
     * const count = await prisma.fileUpload.count({
     *   where: {
     *     // ... the filter for the FileUploads we want to count
     *   }
     * })
    **/
    count<T extends FileUploadCountArgs>(
      args?: Subset<T, FileUploadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileUploadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FileUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileUploadAggregateArgs>(args: Subset<T, FileUploadAggregateArgs>): Prisma.PrismaPromise<GetFileUploadAggregateType<T>>

    /**
     * Group by FileUpload.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUploadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileUploadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileUploadGroupByArgs['orderBy'] }
        : { orderBy?: FileUploadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileUploadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileUploadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FileUpload model
   */
  readonly fields: FileUploadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FileUpload.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileUploadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FileUpload model
   */
  interface FileUploadFieldRefs {
    readonly id: FieldRef<"FileUpload", 'Int'>
    readonly uploadId: FieldRef<"FileUpload", 'String'>
    readonly fileName: FieldRef<"FileUpload", 'String'>
    readonly fileType: FieldRef<"FileUpload", 'String'>
    readonly fileSize: FieldRef<"FileUpload", 'Int'>
    readonly status: FieldRef<"FileUpload", 'FileUploadStatus'>
    readonly signedUrl: FieldRef<"FileUpload", 'String'>
    readonly fileUrl: FieldRef<"FileUpload", 'String'>
    readonly createdAt: FieldRef<"FileUpload", 'DateTime'>
    readonly updatedAt: FieldRef<"FileUpload", 'DateTime'>
    readonly completedAt: FieldRef<"FileUpload", 'DateTime'>
    readonly userId: FieldRef<"FileUpload", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * FileUpload findUnique
   */
  export type FileUploadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUpload to fetch.
     */
    where: FileUploadWhereUniqueInput
  }

  /**
   * FileUpload findUniqueOrThrow
   */
  export type FileUploadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUpload to fetch.
     */
    where: FileUploadWhereUniqueInput
  }

  /**
   * FileUpload findFirst
   */
  export type FileUploadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUpload to fetch.
     */
    where?: FileUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileUploads to fetch.
     */
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileUploads.
     */
    cursor?: FileUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileUploads.
     */
    distinct?: FileUploadScalarFieldEnum | FileUploadScalarFieldEnum[]
  }

  /**
   * FileUpload findFirstOrThrow
   */
  export type FileUploadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUpload to fetch.
     */
    where?: FileUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileUploads to fetch.
     */
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileUploads.
     */
    cursor?: FileUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileUploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileUploads.
     */
    distinct?: FileUploadScalarFieldEnum | FileUploadScalarFieldEnum[]
  }

  /**
   * FileUpload findMany
   */
  export type FileUploadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter, which FileUploads to fetch.
     */
    where?: FileUploadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileUploads to fetch.
     */
    orderBy?: FileUploadOrderByWithRelationInput | FileUploadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FileUploads.
     */
    cursor?: FileUploadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileUploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileUploads.
     */
    skip?: number
    distinct?: FileUploadScalarFieldEnum | FileUploadScalarFieldEnum[]
  }

  /**
   * FileUpload create
   */
  export type FileUploadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * The data needed to create a FileUpload.
     */
    data: XOR<FileUploadCreateInput, FileUploadUncheckedCreateInput>
  }

  /**
   * FileUpload createMany
   */
  export type FileUploadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FileUploads.
     */
    data: FileUploadCreateManyInput | FileUploadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FileUpload createManyAndReturn
   */
  export type FileUploadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * The data used to create many FileUploads.
     */
    data: FileUploadCreateManyInput | FileUploadCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileUpload update
   */
  export type FileUploadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * The data needed to update a FileUpload.
     */
    data: XOR<FileUploadUpdateInput, FileUploadUncheckedUpdateInput>
    /**
     * Choose, which FileUpload to update.
     */
    where: FileUploadWhereUniqueInput
  }

  /**
   * FileUpload updateMany
   */
  export type FileUploadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FileUploads.
     */
    data: XOR<FileUploadUpdateManyMutationInput, FileUploadUncheckedUpdateManyInput>
    /**
     * Filter which FileUploads to update
     */
    where?: FileUploadWhereInput
    /**
     * Limit how many FileUploads to update.
     */
    limit?: number
  }

  /**
   * FileUpload updateManyAndReturn
   */
  export type FileUploadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * The data used to update FileUploads.
     */
    data: XOR<FileUploadUpdateManyMutationInput, FileUploadUncheckedUpdateManyInput>
    /**
     * Filter which FileUploads to update
     */
    where?: FileUploadWhereInput
    /**
     * Limit how many FileUploads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileUpload upsert
   */
  export type FileUploadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * The filter to search for the FileUpload to update in case it exists.
     */
    where: FileUploadWhereUniqueInput
    /**
     * In case the FileUpload found by the `where` argument doesn't exist, create a new FileUpload with this data.
     */
    create: XOR<FileUploadCreateInput, FileUploadUncheckedCreateInput>
    /**
     * In case the FileUpload was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileUploadUpdateInput, FileUploadUncheckedUpdateInput>
  }

  /**
   * FileUpload delete
   */
  export type FileUploadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
    /**
     * Filter which FileUpload to delete.
     */
    where: FileUploadWhereUniqueInput
  }

  /**
   * FileUpload deleteMany
   */
  export type FileUploadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileUploads to delete
     */
    where?: FileUploadWhereInput
    /**
     * Limit how many FileUploads to delete.
     */
    limit?: number
  }

  /**
   * FileUpload without action
   */
  export type FileUploadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileUpload
     */
    select?: FileUploadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileUpload
     */
    omit?: FileUploadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileUploadInclude<ExtArgs> | null
  }


  /**
   * Model MCPResource
   */

  export type AggregateMCPResource = {
    _count: MCPResourceCountAggregateOutputType | null
    _avg: MCPResourceAvgAggregateOutputType | null
    _sum: MCPResourceSumAggregateOutputType | null
    _min: MCPResourceMinAggregateOutputType | null
    _max: MCPResourceMaxAggregateOutputType | null
  }

  export type MCPResourceAvgAggregateOutputType = {
    userId: number | null
  }

  export type MCPResourceSumAggregateOutputType = {
    userId: number | null
  }

  export type MCPResourceMinAggregateOutputType = {
    id: string | null
    type: $Enums.MCPResourceType | null
    name: string | null
    description: string | null
    status: $Enums.MCPResourceStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type MCPResourceMaxAggregateOutputType = {
    id: string | null
    type: $Enums.MCPResourceType | null
    name: string | null
    description: string | null
    status: $Enums.MCPResourceStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type MCPResourceCountAggregateOutputType = {
    id: number
    type: number
    name: number
    description: number
    data: number
    status: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type MCPResourceAvgAggregateInputType = {
    userId?: true
  }

  export type MCPResourceSumAggregateInputType = {
    userId?: true
  }

  export type MCPResourceMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type MCPResourceMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    description?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type MCPResourceCountAggregateInputType = {
    id?: true
    type?: true
    name?: true
    description?: true
    data?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type MCPResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MCPResource to aggregate.
     */
    where?: MCPResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCPResources to fetch.
     */
    orderBy?: MCPResourceOrderByWithRelationInput | MCPResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MCPResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCPResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCPResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MCPResources
    **/
    _count?: true | MCPResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MCPResourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MCPResourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MCPResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MCPResourceMaxAggregateInputType
  }

  export type GetMCPResourceAggregateType<T extends MCPResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateMCPResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMCPResource[P]>
      : GetScalarType<T[P], AggregateMCPResource[P]>
  }




  export type MCPResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCPResourceWhereInput
    orderBy?: MCPResourceOrderByWithAggregationInput | MCPResourceOrderByWithAggregationInput[]
    by: MCPResourceScalarFieldEnum[] | MCPResourceScalarFieldEnum
    having?: MCPResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MCPResourceCountAggregateInputType | true
    _avg?: MCPResourceAvgAggregateInputType
    _sum?: MCPResourceSumAggregateInputType
    _min?: MCPResourceMinAggregateInputType
    _max?: MCPResourceMaxAggregateInputType
  }

  export type MCPResourceGroupByOutputType = {
    id: string
    type: $Enums.MCPResourceType
    name: string
    description: string | null
    data: JsonValue | null
    status: $Enums.MCPResourceStatus
    createdAt: Date
    updatedAt: Date
    userId: number
    _count: MCPResourceCountAggregateOutputType | null
    _avg: MCPResourceAvgAggregateOutputType | null
    _sum: MCPResourceSumAggregateOutputType | null
    _min: MCPResourceMinAggregateOutputType | null
    _max: MCPResourceMaxAggregateOutputType | null
  }

  type GetMCPResourceGroupByPayload<T extends MCPResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MCPResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MCPResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MCPResourceGroupByOutputType[P]>
            : GetScalarType<T[P], MCPResourceGroupByOutputType[P]>
        }
      >
    >


  export type MCPResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    data?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    operations?: boolean | MCPResource$operationsArgs<ExtArgs>
    _count?: boolean | MCPResourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCPResource"]>

  export type MCPResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    data?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCPResource"]>

  export type MCPResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    data?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCPResource"]>

  export type MCPResourceSelectScalar = {
    id?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    data?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type MCPResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "name" | "description" | "data" | "status" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["mCPResource"]>
  export type MCPResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    operations?: boolean | MCPResource$operationsArgs<ExtArgs>
    _count?: boolean | MCPResourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MCPResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MCPResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MCPResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MCPResource"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      operations: Prisma.$MCPOperationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.MCPResourceType
      name: string
      description: string | null
      data: Prisma.JsonValue | null
      status: $Enums.MCPResourceStatus
      createdAt: Date
      updatedAt: Date
      userId: number
    }, ExtArgs["result"]["mCPResource"]>
    composites: {}
  }

  type MCPResourceGetPayload<S extends boolean | null | undefined | MCPResourceDefaultArgs> = $Result.GetResult<Prisma.$MCPResourcePayload, S>

  type MCPResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MCPResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MCPResourceCountAggregateInputType | true
    }

  export interface MCPResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MCPResource'], meta: { name: 'MCPResource' } }
    /**
     * Find zero or one MCPResource that matches the filter.
     * @param {MCPResourceFindUniqueArgs} args - Arguments to find a MCPResource
     * @example
     * // Get one MCPResource
     * const mCPResource = await prisma.mCPResource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MCPResourceFindUniqueArgs>(args: SelectSubset<T, MCPResourceFindUniqueArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MCPResource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MCPResourceFindUniqueOrThrowArgs} args - Arguments to find a MCPResource
     * @example
     * // Get one MCPResource
     * const mCPResource = await prisma.mCPResource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MCPResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, MCPResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MCPResource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPResourceFindFirstArgs} args - Arguments to find a MCPResource
     * @example
     * // Get one MCPResource
     * const mCPResource = await prisma.mCPResource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MCPResourceFindFirstArgs>(args?: SelectSubset<T, MCPResourceFindFirstArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MCPResource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPResourceFindFirstOrThrowArgs} args - Arguments to find a MCPResource
     * @example
     * // Get one MCPResource
     * const mCPResource = await prisma.mCPResource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MCPResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, MCPResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MCPResources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MCPResources
     * const mCPResources = await prisma.mCPResource.findMany()
     * 
     * // Get first 10 MCPResources
     * const mCPResources = await prisma.mCPResource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mCPResourceWithIdOnly = await prisma.mCPResource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MCPResourceFindManyArgs>(args?: SelectSubset<T, MCPResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MCPResource.
     * @param {MCPResourceCreateArgs} args - Arguments to create a MCPResource.
     * @example
     * // Create one MCPResource
     * const MCPResource = await prisma.mCPResource.create({
     *   data: {
     *     // ... data to create a MCPResource
     *   }
     * })
     * 
     */
    create<T extends MCPResourceCreateArgs>(args: SelectSubset<T, MCPResourceCreateArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MCPResources.
     * @param {MCPResourceCreateManyArgs} args - Arguments to create many MCPResources.
     * @example
     * // Create many MCPResources
     * const mCPResource = await prisma.mCPResource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MCPResourceCreateManyArgs>(args?: SelectSubset<T, MCPResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MCPResources and returns the data saved in the database.
     * @param {MCPResourceCreateManyAndReturnArgs} args - Arguments to create many MCPResources.
     * @example
     * // Create many MCPResources
     * const mCPResource = await prisma.mCPResource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MCPResources and only return the `id`
     * const mCPResourceWithIdOnly = await prisma.mCPResource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MCPResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, MCPResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MCPResource.
     * @param {MCPResourceDeleteArgs} args - Arguments to delete one MCPResource.
     * @example
     * // Delete one MCPResource
     * const MCPResource = await prisma.mCPResource.delete({
     *   where: {
     *     // ... filter to delete one MCPResource
     *   }
     * })
     * 
     */
    delete<T extends MCPResourceDeleteArgs>(args: SelectSubset<T, MCPResourceDeleteArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MCPResource.
     * @param {MCPResourceUpdateArgs} args - Arguments to update one MCPResource.
     * @example
     * // Update one MCPResource
     * const mCPResource = await prisma.mCPResource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MCPResourceUpdateArgs>(args: SelectSubset<T, MCPResourceUpdateArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MCPResources.
     * @param {MCPResourceDeleteManyArgs} args - Arguments to filter MCPResources to delete.
     * @example
     * // Delete a few MCPResources
     * const { count } = await prisma.mCPResource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MCPResourceDeleteManyArgs>(args?: SelectSubset<T, MCPResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MCPResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MCPResources
     * const mCPResource = await prisma.mCPResource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MCPResourceUpdateManyArgs>(args: SelectSubset<T, MCPResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MCPResources and returns the data updated in the database.
     * @param {MCPResourceUpdateManyAndReturnArgs} args - Arguments to update many MCPResources.
     * @example
     * // Update many MCPResources
     * const mCPResource = await prisma.mCPResource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MCPResources and only return the `id`
     * const mCPResourceWithIdOnly = await prisma.mCPResource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MCPResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, MCPResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MCPResource.
     * @param {MCPResourceUpsertArgs} args - Arguments to update or create a MCPResource.
     * @example
     * // Update or create a MCPResource
     * const mCPResource = await prisma.mCPResource.upsert({
     *   create: {
     *     // ... data to create a MCPResource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MCPResource we want to update
     *   }
     * })
     */
    upsert<T extends MCPResourceUpsertArgs>(args: SelectSubset<T, MCPResourceUpsertArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MCPResources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPResourceCountArgs} args - Arguments to filter MCPResources to count.
     * @example
     * // Count the number of MCPResources
     * const count = await prisma.mCPResource.count({
     *   where: {
     *     // ... the filter for the MCPResources we want to count
     *   }
     * })
    **/
    count<T extends MCPResourceCountArgs>(
      args?: Subset<T, MCPResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MCPResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MCPResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MCPResourceAggregateArgs>(args: Subset<T, MCPResourceAggregateArgs>): Prisma.PrismaPromise<GetMCPResourceAggregateType<T>>

    /**
     * Group by MCPResource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPResourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MCPResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MCPResourceGroupByArgs['orderBy'] }
        : { orderBy?: MCPResourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MCPResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMCPResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MCPResource model
   */
  readonly fields: MCPResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MCPResource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MCPResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    operations<T extends MCPResource$operationsArgs<ExtArgs> = {}>(args?: Subset<T, MCPResource$operationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MCPResource model
   */
  interface MCPResourceFieldRefs {
    readonly id: FieldRef<"MCPResource", 'String'>
    readonly type: FieldRef<"MCPResource", 'MCPResourceType'>
    readonly name: FieldRef<"MCPResource", 'String'>
    readonly description: FieldRef<"MCPResource", 'String'>
    readonly data: FieldRef<"MCPResource", 'Json'>
    readonly status: FieldRef<"MCPResource", 'MCPResourceStatus'>
    readonly createdAt: FieldRef<"MCPResource", 'DateTime'>
    readonly updatedAt: FieldRef<"MCPResource", 'DateTime'>
    readonly userId: FieldRef<"MCPResource", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MCPResource findUnique
   */
  export type MCPResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * Filter, which MCPResource to fetch.
     */
    where: MCPResourceWhereUniqueInput
  }

  /**
   * MCPResource findUniqueOrThrow
   */
  export type MCPResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * Filter, which MCPResource to fetch.
     */
    where: MCPResourceWhereUniqueInput
  }

  /**
   * MCPResource findFirst
   */
  export type MCPResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * Filter, which MCPResource to fetch.
     */
    where?: MCPResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCPResources to fetch.
     */
    orderBy?: MCPResourceOrderByWithRelationInput | MCPResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MCPResources.
     */
    cursor?: MCPResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCPResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCPResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MCPResources.
     */
    distinct?: MCPResourceScalarFieldEnum | MCPResourceScalarFieldEnum[]
  }

  /**
   * MCPResource findFirstOrThrow
   */
  export type MCPResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * Filter, which MCPResource to fetch.
     */
    where?: MCPResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCPResources to fetch.
     */
    orderBy?: MCPResourceOrderByWithRelationInput | MCPResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MCPResources.
     */
    cursor?: MCPResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCPResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCPResources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MCPResources.
     */
    distinct?: MCPResourceScalarFieldEnum | MCPResourceScalarFieldEnum[]
  }

  /**
   * MCPResource findMany
   */
  export type MCPResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * Filter, which MCPResources to fetch.
     */
    where?: MCPResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCPResources to fetch.
     */
    orderBy?: MCPResourceOrderByWithRelationInput | MCPResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MCPResources.
     */
    cursor?: MCPResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCPResources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCPResources.
     */
    skip?: number
    distinct?: MCPResourceScalarFieldEnum | MCPResourceScalarFieldEnum[]
  }

  /**
   * MCPResource create
   */
  export type MCPResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a MCPResource.
     */
    data: XOR<MCPResourceCreateInput, MCPResourceUncheckedCreateInput>
  }

  /**
   * MCPResource createMany
   */
  export type MCPResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MCPResources.
     */
    data: MCPResourceCreateManyInput | MCPResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MCPResource createManyAndReturn
   */
  export type MCPResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * The data used to create many MCPResources.
     */
    data: MCPResourceCreateManyInput | MCPResourceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MCPResource update
   */
  export type MCPResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a MCPResource.
     */
    data: XOR<MCPResourceUpdateInput, MCPResourceUncheckedUpdateInput>
    /**
     * Choose, which MCPResource to update.
     */
    where: MCPResourceWhereUniqueInput
  }

  /**
   * MCPResource updateMany
   */
  export type MCPResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MCPResources.
     */
    data: XOR<MCPResourceUpdateManyMutationInput, MCPResourceUncheckedUpdateManyInput>
    /**
     * Filter which MCPResources to update
     */
    where?: MCPResourceWhereInput
    /**
     * Limit how many MCPResources to update.
     */
    limit?: number
  }

  /**
   * MCPResource updateManyAndReturn
   */
  export type MCPResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * The data used to update MCPResources.
     */
    data: XOR<MCPResourceUpdateManyMutationInput, MCPResourceUncheckedUpdateManyInput>
    /**
     * Filter which MCPResources to update
     */
    where?: MCPResourceWhereInput
    /**
     * Limit how many MCPResources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MCPResource upsert
   */
  export type MCPResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the MCPResource to update in case it exists.
     */
    where: MCPResourceWhereUniqueInput
    /**
     * In case the MCPResource found by the `where` argument doesn't exist, create a new MCPResource with this data.
     */
    create: XOR<MCPResourceCreateInput, MCPResourceUncheckedCreateInput>
    /**
     * In case the MCPResource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MCPResourceUpdateInput, MCPResourceUncheckedUpdateInput>
  }

  /**
   * MCPResource delete
   */
  export type MCPResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    /**
     * Filter which MCPResource to delete.
     */
    where: MCPResourceWhereUniqueInput
  }

  /**
   * MCPResource deleteMany
   */
  export type MCPResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MCPResources to delete
     */
    where?: MCPResourceWhereInput
    /**
     * Limit how many MCPResources to delete.
     */
    limit?: number
  }

  /**
   * MCPResource.operations
   */
  export type MCPResource$operationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    where?: MCPOperationWhereInput
    orderBy?: MCPOperationOrderByWithRelationInput | MCPOperationOrderByWithRelationInput[]
    cursor?: MCPOperationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MCPOperationScalarFieldEnum | MCPOperationScalarFieldEnum[]
  }

  /**
   * MCPResource without action
   */
  export type MCPResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
  }


  /**
   * Model MCPOperation
   */

  export type AggregateMCPOperation = {
    _count: MCPOperationCountAggregateOutputType | null
    _avg: MCPOperationAvgAggregateOutputType | null
    _sum: MCPOperationSumAggregateOutputType | null
    _min: MCPOperationMinAggregateOutputType | null
    _max: MCPOperationMaxAggregateOutputType | null
  }

  export type MCPOperationAvgAggregateOutputType = {
    userId: number | null
  }

  export type MCPOperationSumAggregateOutputType = {
    userId: number | null
  }

  export type MCPOperationMinAggregateOutputType = {
    id: string | null
    operation: string | null
    status: $Enums.MCPOperationStatus | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    userId: number | null
    resourceId: string | null
  }

  export type MCPOperationMaxAggregateOutputType = {
    id: string | null
    operation: string | null
    status: $Enums.MCPOperationStatus | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
    userId: number | null
    resourceId: string | null
  }

  export type MCPOperationCountAggregateOutputType = {
    id: number
    operation: number
    data: number
    result: number
    status: number
    error: number
    createdAt: number
    updatedAt: number
    completedAt: number
    userId: number
    resourceId: number
    _all: number
  }


  export type MCPOperationAvgAggregateInputType = {
    userId?: true
  }

  export type MCPOperationSumAggregateInputType = {
    userId?: true
  }

  export type MCPOperationMinAggregateInputType = {
    id?: true
    operation?: true
    status?: true
    error?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    userId?: true
    resourceId?: true
  }

  export type MCPOperationMaxAggregateInputType = {
    id?: true
    operation?: true
    status?: true
    error?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    userId?: true
    resourceId?: true
  }

  export type MCPOperationCountAggregateInputType = {
    id?: true
    operation?: true
    data?: true
    result?: true
    status?: true
    error?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    userId?: true
    resourceId?: true
    _all?: true
  }

  export type MCPOperationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MCPOperation to aggregate.
     */
    where?: MCPOperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCPOperations to fetch.
     */
    orderBy?: MCPOperationOrderByWithRelationInput | MCPOperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MCPOperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCPOperations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCPOperations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MCPOperations
    **/
    _count?: true | MCPOperationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MCPOperationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MCPOperationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MCPOperationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MCPOperationMaxAggregateInputType
  }

  export type GetMCPOperationAggregateType<T extends MCPOperationAggregateArgs> = {
        [P in keyof T & keyof AggregateMCPOperation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMCPOperation[P]>
      : GetScalarType<T[P], AggregateMCPOperation[P]>
  }




  export type MCPOperationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCPOperationWhereInput
    orderBy?: MCPOperationOrderByWithAggregationInput | MCPOperationOrderByWithAggregationInput[]
    by: MCPOperationScalarFieldEnum[] | MCPOperationScalarFieldEnum
    having?: MCPOperationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MCPOperationCountAggregateInputType | true
    _avg?: MCPOperationAvgAggregateInputType
    _sum?: MCPOperationSumAggregateInputType
    _min?: MCPOperationMinAggregateInputType
    _max?: MCPOperationMaxAggregateInputType
  }

  export type MCPOperationGroupByOutputType = {
    id: string
    operation: string
    data: JsonValue | null
    result: JsonValue | null
    status: $Enums.MCPOperationStatus
    error: string | null
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    userId: number
    resourceId: string | null
    _count: MCPOperationCountAggregateOutputType | null
    _avg: MCPOperationAvgAggregateOutputType | null
    _sum: MCPOperationSumAggregateOutputType | null
    _min: MCPOperationMinAggregateOutputType | null
    _max: MCPOperationMaxAggregateOutputType | null
  }

  type GetMCPOperationGroupByPayload<T extends MCPOperationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MCPOperationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MCPOperationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MCPOperationGroupByOutputType[P]>
            : GetScalarType<T[P], MCPOperationGroupByOutputType[P]>
        }
      >
    >


  export type MCPOperationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    operation?: boolean
    data?: boolean
    result?: boolean
    status?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    userId?: boolean
    resourceId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | MCPOperation$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["mCPOperation"]>

  export type MCPOperationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    operation?: boolean
    data?: boolean
    result?: boolean
    status?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    userId?: boolean
    resourceId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | MCPOperation$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["mCPOperation"]>

  export type MCPOperationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    operation?: boolean
    data?: boolean
    result?: boolean
    status?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    userId?: boolean
    resourceId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | MCPOperation$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["mCPOperation"]>

  export type MCPOperationSelectScalar = {
    id?: boolean
    operation?: boolean
    data?: boolean
    result?: boolean
    status?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    userId?: boolean
    resourceId?: boolean
  }

  export type MCPOperationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "operation" | "data" | "result" | "status" | "error" | "createdAt" | "updatedAt" | "completedAt" | "userId" | "resourceId", ExtArgs["result"]["mCPOperation"]>
  export type MCPOperationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | MCPOperation$resourceArgs<ExtArgs>
  }
  export type MCPOperationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | MCPOperation$resourceArgs<ExtArgs>
  }
  export type MCPOperationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | MCPOperation$resourceArgs<ExtArgs>
  }

  export type $MCPOperationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MCPOperation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      resource: Prisma.$MCPResourcePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      operation: string
      data: Prisma.JsonValue | null
      result: Prisma.JsonValue | null
      status: $Enums.MCPOperationStatus
      error: string | null
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
      userId: number
      resourceId: string | null
    }, ExtArgs["result"]["mCPOperation"]>
    composites: {}
  }

  type MCPOperationGetPayload<S extends boolean | null | undefined | MCPOperationDefaultArgs> = $Result.GetResult<Prisma.$MCPOperationPayload, S>

  type MCPOperationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MCPOperationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MCPOperationCountAggregateInputType | true
    }

  export interface MCPOperationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MCPOperation'], meta: { name: 'MCPOperation' } }
    /**
     * Find zero or one MCPOperation that matches the filter.
     * @param {MCPOperationFindUniqueArgs} args - Arguments to find a MCPOperation
     * @example
     * // Get one MCPOperation
     * const mCPOperation = await prisma.mCPOperation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MCPOperationFindUniqueArgs>(args: SelectSubset<T, MCPOperationFindUniqueArgs<ExtArgs>>): Prisma__MCPOperationClient<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MCPOperation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MCPOperationFindUniqueOrThrowArgs} args - Arguments to find a MCPOperation
     * @example
     * // Get one MCPOperation
     * const mCPOperation = await prisma.mCPOperation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MCPOperationFindUniqueOrThrowArgs>(args: SelectSubset<T, MCPOperationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MCPOperationClient<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MCPOperation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPOperationFindFirstArgs} args - Arguments to find a MCPOperation
     * @example
     * // Get one MCPOperation
     * const mCPOperation = await prisma.mCPOperation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MCPOperationFindFirstArgs>(args?: SelectSubset<T, MCPOperationFindFirstArgs<ExtArgs>>): Prisma__MCPOperationClient<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MCPOperation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPOperationFindFirstOrThrowArgs} args - Arguments to find a MCPOperation
     * @example
     * // Get one MCPOperation
     * const mCPOperation = await prisma.mCPOperation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MCPOperationFindFirstOrThrowArgs>(args?: SelectSubset<T, MCPOperationFindFirstOrThrowArgs<ExtArgs>>): Prisma__MCPOperationClient<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MCPOperations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPOperationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MCPOperations
     * const mCPOperations = await prisma.mCPOperation.findMany()
     * 
     * // Get first 10 MCPOperations
     * const mCPOperations = await prisma.mCPOperation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mCPOperationWithIdOnly = await prisma.mCPOperation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MCPOperationFindManyArgs>(args?: SelectSubset<T, MCPOperationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MCPOperation.
     * @param {MCPOperationCreateArgs} args - Arguments to create a MCPOperation.
     * @example
     * // Create one MCPOperation
     * const MCPOperation = await prisma.mCPOperation.create({
     *   data: {
     *     // ... data to create a MCPOperation
     *   }
     * })
     * 
     */
    create<T extends MCPOperationCreateArgs>(args: SelectSubset<T, MCPOperationCreateArgs<ExtArgs>>): Prisma__MCPOperationClient<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MCPOperations.
     * @param {MCPOperationCreateManyArgs} args - Arguments to create many MCPOperations.
     * @example
     * // Create many MCPOperations
     * const mCPOperation = await prisma.mCPOperation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MCPOperationCreateManyArgs>(args?: SelectSubset<T, MCPOperationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MCPOperations and returns the data saved in the database.
     * @param {MCPOperationCreateManyAndReturnArgs} args - Arguments to create many MCPOperations.
     * @example
     * // Create many MCPOperations
     * const mCPOperation = await prisma.mCPOperation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MCPOperations and only return the `id`
     * const mCPOperationWithIdOnly = await prisma.mCPOperation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MCPOperationCreateManyAndReturnArgs>(args?: SelectSubset<T, MCPOperationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MCPOperation.
     * @param {MCPOperationDeleteArgs} args - Arguments to delete one MCPOperation.
     * @example
     * // Delete one MCPOperation
     * const MCPOperation = await prisma.mCPOperation.delete({
     *   where: {
     *     // ... filter to delete one MCPOperation
     *   }
     * })
     * 
     */
    delete<T extends MCPOperationDeleteArgs>(args: SelectSubset<T, MCPOperationDeleteArgs<ExtArgs>>): Prisma__MCPOperationClient<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MCPOperation.
     * @param {MCPOperationUpdateArgs} args - Arguments to update one MCPOperation.
     * @example
     * // Update one MCPOperation
     * const mCPOperation = await prisma.mCPOperation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MCPOperationUpdateArgs>(args: SelectSubset<T, MCPOperationUpdateArgs<ExtArgs>>): Prisma__MCPOperationClient<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MCPOperations.
     * @param {MCPOperationDeleteManyArgs} args - Arguments to filter MCPOperations to delete.
     * @example
     * // Delete a few MCPOperations
     * const { count } = await prisma.mCPOperation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MCPOperationDeleteManyArgs>(args?: SelectSubset<T, MCPOperationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MCPOperations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPOperationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MCPOperations
     * const mCPOperation = await prisma.mCPOperation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MCPOperationUpdateManyArgs>(args: SelectSubset<T, MCPOperationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MCPOperations and returns the data updated in the database.
     * @param {MCPOperationUpdateManyAndReturnArgs} args - Arguments to update many MCPOperations.
     * @example
     * // Update many MCPOperations
     * const mCPOperation = await prisma.mCPOperation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MCPOperations and only return the `id`
     * const mCPOperationWithIdOnly = await prisma.mCPOperation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MCPOperationUpdateManyAndReturnArgs>(args: SelectSubset<T, MCPOperationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MCPOperation.
     * @param {MCPOperationUpsertArgs} args - Arguments to update or create a MCPOperation.
     * @example
     * // Update or create a MCPOperation
     * const mCPOperation = await prisma.mCPOperation.upsert({
     *   create: {
     *     // ... data to create a MCPOperation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MCPOperation we want to update
     *   }
     * })
     */
    upsert<T extends MCPOperationUpsertArgs>(args: SelectSubset<T, MCPOperationUpsertArgs<ExtArgs>>): Prisma__MCPOperationClient<$Result.GetResult<Prisma.$MCPOperationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MCPOperations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPOperationCountArgs} args - Arguments to filter MCPOperations to count.
     * @example
     * // Count the number of MCPOperations
     * const count = await prisma.mCPOperation.count({
     *   where: {
     *     // ... the filter for the MCPOperations we want to count
     *   }
     * })
    **/
    count<T extends MCPOperationCountArgs>(
      args?: Subset<T, MCPOperationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MCPOperationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MCPOperation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPOperationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MCPOperationAggregateArgs>(args: Subset<T, MCPOperationAggregateArgs>): Prisma.PrismaPromise<GetMCPOperationAggregateType<T>>

    /**
     * Group by MCPOperation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCPOperationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MCPOperationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MCPOperationGroupByArgs['orderBy'] }
        : { orderBy?: MCPOperationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MCPOperationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMCPOperationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MCPOperation model
   */
  readonly fields: MCPOperationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MCPOperation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MCPOperationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    resource<T extends MCPOperation$resourceArgs<ExtArgs> = {}>(args?: Subset<T, MCPOperation$resourceArgs<ExtArgs>>): Prisma__MCPResourceClient<$Result.GetResult<Prisma.$MCPResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MCPOperation model
   */
  interface MCPOperationFieldRefs {
    readonly id: FieldRef<"MCPOperation", 'String'>
    readonly operation: FieldRef<"MCPOperation", 'String'>
    readonly data: FieldRef<"MCPOperation", 'Json'>
    readonly result: FieldRef<"MCPOperation", 'Json'>
    readonly status: FieldRef<"MCPOperation", 'MCPOperationStatus'>
    readonly error: FieldRef<"MCPOperation", 'String'>
    readonly createdAt: FieldRef<"MCPOperation", 'DateTime'>
    readonly updatedAt: FieldRef<"MCPOperation", 'DateTime'>
    readonly completedAt: FieldRef<"MCPOperation", 'DateTime'>
    readonly userId: FieldRef<"MCPOperation", 'Int'>
    readonly resourceId: FieldRef<"MCPOperation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MCPOperation findUnique
   */
  export type MCPOperationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * Filter, which MCPOperation to fetch.
     */
    where: MCPOperationWhereUniqueInput
  }

  /**
   * MCPOperation findUniqueOrThrow
   */
  export type MCPOperationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * Filter, which MCPOperation to fetch.
     */
    where: MCPOperationWhereUniqueInput
  }

  /**
   * MCPOperation findFirst
   */
  export type MCPOperationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * Filter, which MCPOperation to fetch.
     */
    where?: MCPOperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCPOperations to fetch.
     */
    orderBy?: MCPOperationOrderByWithRelationInput | MCPOperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MCPOperations.
     */
    cursor?: MCPOperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCPOperations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCPOperations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MCPOperations.
     */
    distinct?: MCPOperationScalarFieldEnum | MCPOperationScalarFieldEnum[]
  }

  /**
   * MCPOperation findFirstOrThrow
   */
  export type MCPOperationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * Filter, which MCPOperation to fetch.
     */
    where?: MCPOperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCPOperations to fetch.
     */
    orderBy?: MCPOperationOrderByWithRelationInput | MCPOperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MCPOperations.
     */
    cursor?: MCPOperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCPOperations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCPOperations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MCPOperations.
     */
    distinct?: MCPOperationScalarFieldEnum | MCPOperationScalarFieldEnum[]
  }

  /**
   * MCPOperation findMany
   */
  export type MCPOperationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * Filter, which MCPOperations to fetch.
     */
    where?: MCPOperationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCPOperations to fetch.
     */
    orderBy?: MCPOperationOrderByWithRelationInput | MCPOperationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MCPOperations.
     */
    cursor?: MCPOperationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCPOperations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCPOperations.
     */
    skip?: number
    distinct?: MCPOperationScalarFieldEnum | MCPOperationScalarFieldEnum[]
  }

  /**
   * MCPOperation create
   */
  export type MCPOperationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * The data needed to create a MCPOperation.
     */
    data: XOR<MCPOperationCreateInput, MCPOperationUncheckedCreateInput>
  }

  /**
   * MCPOperation createMany
   */
  export type MCPOperationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MCPOperations.
     */
    data: MCPOperationCreateManyInput | MCPOperationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MCPOperation createManyAndReturn
   */
  export type MCPOperationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * The data used to create many MCPOperations.
     */
    data: MCPOperationCreateManyInput | MCPOperationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MCPOperation update
   */
  export type MCPOperationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * The data needed to update a MCPOperation.
     */
    data: XOR<MCPOperationUpdateInput, MCPOperationUncheckedUpdateInput>
    /**
     * Choose, which MCPOperation to update.
     */
    where: MCPOperationWhereUniqueInput
  }

  /**
   * MCPOperation updateMany
   */
  export type MCPOperationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MCPOperations.
     */
    data: XOR<MCPOperationUpdateManyMutationInput, MCPOperationUncheckedUpdateManyInput>
    /**
     * Filter which MCPOperations to update
     */
    where?: MCPOperationWhereInput
    /**
     * Limit how many MCPOperations to update.
     */
    limit?: number
  }

  /**
   * MCPOperation updateManyAndReturn
   */
  export type MCPOperationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * The data used to update MCPOperations.
     */
    data: XOR<MCPOperationUpdateManyMutationInput, MCPOperationUncheckedUpdateManyInput>
    /**
     * Filter which MCPOperations to update
     */
    where?: MCPOperationWhereInput
    /**
     * Limit how many MCPOperations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MCPOperation upsert
   */
  export type MCPOperationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * The filter to search for the MCPOperation to update in case it exists.
     */
    where: MCPOperationWhereUniqueInput
    /**
     * In case the MCPOperation found by the `where` argument doesn't exist, create a new MCPOperation with this data.
     */
    create: XOR<MCPOperationCreateInput, MCPOperationUncheckedCreateInput>
    /**
     * In case the MCPOperation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MCPOperationUpdateInput, MCPOperationUncheckedUpdateInput>
  }

  /**
   * MCPOperation delete
   */
  export type MCPOperationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
    /**
     * Filter which MCPOperation to delete.
     */
    where: MCPOperationWhereUniqueInput
  }

  /**
   * MCPOperation deleteMany
   */
  export type MCPOperationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MCPOperations to delete
     */
    where?: MCPOperationWhereInput
    /**
     * Limit how many MCPOperations to delete.
     */
    limit?: number
  }

  /**
   * MCPOperation.resource
   */
  export type MCPOperation$resourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPResource
     */
    select?: MCPResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPResource
     */
    omit?: MCPResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPResourceInclude<ExtArgs> | null
    where?: MCPResourceWhereInput
  }

  /**
   * MCPOperation without action
   */
  export type MCPOperationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCPOperation
     */
    select?: MCPOperationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCPOperation
     */
    omit?: MCPOperationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCPOperationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    isEmailVerified: 'isEmailVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    type: 'type',
    expires: 'expires',
    blacklisted: 'blacklisted',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const FileUploadScalarFieldEnum: {
    id: 'id',
    uploadId: 'uploadId',
    fileName: 'fileName',
    fileType: 'fileType',
    fileSize: 'fileSize',
    status: 'status',
    signedUrl: 'signedUrl',
    fileUrl: 'fileUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt',
    userId: 'userId'
  };

  export type FileUploadScalarFieldEnum = (typeof FileUploadScalarFieldEnum)[keyof typeof FileUploadScalarFieldEnum]


  export const MCPResourceScalarFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    description: 'description',
    data: 'data',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type MCPResourceScalarFieldEnum = (typeof MCPResourceScalarFieldEnum)[keyof typeof MCPResourceScalarFieldEnum]


  export const MCPOperationScalarFieldEnum: {
    id: 'id',
    operation: 'operation',
    data: 'data',
    result: 'result',
    status: 'status',
    error: 'error',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt',
    userId: 'userId',
    resourceId: 'resourceId'
  };

  export type MCPOperationScalarFieldEnum = (typeof MCPOperationScalarFieldEnum)[keyof typeof MCPOperationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TokenType'
   */
  export type EnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType'>
    


  /**
   * Reference to a field of type 'TokenType[]'
   */
  export type ListEnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType[]'>
    


  /**
   * Reference to a field of type 'FileUploadStatus'
   */
  export type EnumFileUploadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileUploadStatus'>
    


  /**
   * Reference to a field of type 'FileUploadStatus[]'
   */
  export type ListEnumFileUploadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileUploadStatus[]'>
    


  /**
   * Reference to a field of type 'MCPResourceType'
   */
  export type EnumMCPResourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MCPResourceType'>
    


  /**
   * Reference to a field of type 'MCPResourceType[]'
   */
  export type ListEnumMCPResourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MCPResourceType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'MCPResourceStatus'
   */
  export type EnumMCPResourceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MCPResourceStatus'>
    


  /**
   * Reference to a field of type 'MCPResourceStatus[]'
   */
  export type ListEnumMCPResourceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MCPResourceStatus[]'>
    


  /**
   * Reference to a field of type 'MCPOperationStatus'
   */
  export type EnumMCPOperationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MCPOperationStatus'>
    


  /**
   * Reference to a field of type 'MCPOperationStatus[]'
   */
  export type ListEnumMCPOperationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MCPOperationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Token?: TokenListRelationFilter
    FileUpload?: FileUploadListRelationFilter
    MCPResource?: MCPResourceListRelationFilter
    MCPOperation?: MCPOperationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Token?: TokenOrderByRelationAggregateInput
    FileUpload?: FileUploadOrderByRelationAggregateInput
    MCPResource?: MCPResourceOrderByRelationAggregateInput
    MCPOperation?: MCPOperationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Token?: TokenListRelationFilter
    FileUpload?: FileUploadListRelationFilter
    MCPResource?: MCPResourceListRelationFilter
    MCPOperation?: MCPOperationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: IntFilter<"Token"> | number
    token?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expires?: DateTimeFilter<"Token"> | Date | string
    blacklisted?: BoolFilter<"Token"> | boolean
    createdAt?: DateTimeFilter<"Token"> | Date | string
    userId?: IntFilter<"Token"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    token?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expires?: DateTimeFilter<"Token"> | Date | string
    blacklisted?: BoolFilter<"Token"> | boolean
    createdAt?: DateTimeFilter<"Token"> | Date | string
    userId?: IntFilter<"Token"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _avg?: TokenAvgOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    _sum?: TokenSumOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Token"> | number
    token?: StringWithAggregatesFilter<"Token"> | string
    type?: EnumTokenTypeWithAggregatesFilter<"Token"> | $Enums.TokenType
    expires?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    blacklisted?: BoolWithAggregatesFilter<"Token"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    userId?: IntWithAggregatesFilter<"Token"> | number
  }

  export type FileUploadWhereInput = {
    AND?: FileUploadWhereInput | FileUploadWhereInput[]
    OR?: FileUploadWhereInput[]
    NOT?: FileUploadWhereInput | FileUploadWhereInput[]
    id?: IntFilter<"FileUpload"> | number
    uploadId?: StringFilter<"FileUpload"> | string
    fileName?: StringFilter<"FileUpload"> | string
    fileType?: StringFilter<"FileUpload"> | string
    fileSize?: IntFilter<"FileUpload"> | number
    status?: EnumFileUploadStatusFilter<"FileUpload"> | $Enums.FileUploadStatus
    signedUrl?: StringFilter<"FileUpload"> | string
    fileUrl?: StringFilter<"FileUpload"> | string
    createdAt?: DateTimeFilter<"FileUpload"> | Date | string
    updatedAt?: DateTimeFilter<"FileUpload"> | Date | string
    completedAt?: DateTimeNullableFilter<"FileUpload"> | Date | string | null
    userId?: IntFilter<"FileUpload"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FileUploadOrderByWithRelationInput = {
    id?: SortOrder
    uploadId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    status?: SortOrder
    signedUrl?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FileUploadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uploadId?: string
    AND?: FileUploadWhereInput | FileUploadWhereInput[]
    OR?: FileUploadWhereInput[]
    NOT?: FileUploadWhereInput | FileUploadWhereInput[]
    fileName?: StringFilter<"FileUpload"> | string
    fileType?: StringFilter<"FileUpload"> | string
    fileSize?: IntFilter<"FileUpload"> | number
    status?: EnumFileUploadStatusFilter<"FileUpload"> | $Enums.FileUploadStatus
    signedUrl?: StringFilter<"FileUpload"> | string
    fileUrl?: StringFilter<"FileUpload"> | string
    createdAt?: DateTimeFilter<"FileUpload"> | Date | string
    updatedAt?: DateTimeFilter<"FileUpload"> | Date | string
    completedAt?: DateTimeNullableFilter<"FileUpload"> | Date | string | null
    userId?: IntFilter<"FileUpload"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "uploadId">

  export type FileUploadOrderByWithAggregationInput = {
    id?: SortOrder
    uploadId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    status?: SortOrder
    signedUrl?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: FileUploadCountOrderByAggregateInput
    _avg?: FileUploadAvgOrderByAggregateInput
    _max?: FileUploadMaxOrderByAggregateInput
    _min?: FileUploadMinOrderByAggregateInput
    _sum?: FileUploadSumOrderByAggregateInput
  }

  export type FileUploadScalarWhereWithAggregatesInput = {
    AND?: FileUploadScalarWhereWithAggregatesInput | FileUploadScalarWhereWithAggregatesInput[]
    OR?: FileUploadScalarWhereWithAggregatesInput[]
    NOT?: FileUploadScalarWhereWithAggregatesInput | FileUploadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FileUpload"> | number
    uploadId?: StringWithAggregatesFilter<"FileUpload"> | string
    fileName?: StringWithAggregatesFilter<"FileUpload"> | string
    fileType?: StringWithAggregatesFilter<"FileUpload"> | string
    fileSize?: IntWithAggregatesFilter<"FileUpload"> | number
    status?: EnumFileUploadStatusWithAggregatesFilter<"FileUpload"> | $Enums.FileUploadStatus
    signedUrl?: StringWithAggregatesFilter<"FileUpload"> | string
    fileUrl?: StringWithAggregatesFilter<"FileUpload"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FileUpload"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FileUpload"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"FileUpload"> | Date | string | null
    userId?: IntWithAggregatesFilter<"FileUpload"> | number
  }

  export type MCPResourceWhereInput = {
    AND?: MCPResourceWhereInput | MCPResourceWhereInput[]
    OR?: MCPResourceWhereInput[]
    NOT?: MCPResourceWhereInput | MCPResourceWhereInput[]
    id?: StringFilter<"MCPResource"> | string
    type?: EnumMCPResourceTypeFilter<"MCPResource"> | $Enums.MCPResourceType
    name?: StringFilter<"MCPResource"> | string
    description?: StringNullableFilter<"MCPResource"> | string | null
    data?: JsonNullableFilter<"MCPResource">
    status?: EnumMCPResourceStatusFilter<"MCPResource"> | $Enums.MCPResourceStatus
    createdAt?: DateTimeFilter<"MCPResource"> | Date | string
    updatedAt?: DateTimeFilter<"MCPResource"> | Date | string
    userId?: IntFilter<"MCPResource"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    operations?: MCPOperationListRelationFilter
  }

  export type MCPResourceOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    operations?: MCPOperationOrderByRelationAggregateInput
  }

  export type MCPResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MCPResourceWhereInput | MCPResourceWhereInput[]
    OR?: MCPResourceWhereInput[]
    NOT?: MCPResourceWhereInput | MCPResourceWhereInput[]
    type?: EnumMCPResourceTypeFilter<"MCPResource"> | $Enums.MCPResourceType
    name?: StringFilter<"MCPResource"> | string
    description?: StringNullableFilter<"MCPResource"> | string | null
    data?: JsonNullableFilter<"MCPResource">
    status?: EnumMCPResourceStatusFilter<"MCPResource"> | $Enums.MCPResourceStatus
    createdAt?: DateTimeFilter<"MCPResource"> | Date | string
    updatedAt?: DateTimeFilter<"MCPResource"> | Date | string
    userId?: IntFilter<"MCPResource"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    operations?: MCPOperationListRelationFilter
  }, "id">

  export type MCPResourceOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: MCPResourceCountOrderByAggregateInput
    _avg?: MCPResourceAvgOrderByAggregateInput
    _max?: MCPResourceMaxOrderByAggregateInput
    _min?: MCPResourceMinOrderByAggregateInput
    _sum?: MCPResourceSumOrderByAggregateInput
  }

  export type MCPResourceScalarWhereWithAggregatesInput = {
    AND?: MCPResourceScalarWhereWithAggregatesInput | MCPResourceScalarWhereWithAggregatesInput[]
    OR?: MCPResourceScalarWhereWithAggregatesInput[]
    NOT?: MCPResourceScalarWhereWithAggregatesInput | MCPResourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MCPResource"> | string
    type?: EnumMCPResourceTypeWithAggregatesFilter<"MCPResource"> | $Enums.MCPResourceType
    name?: StringWithAggregatesFilter<"MCPResource"> | string
    description?: StringNullableWithAggregatesFilter<"MCPResource"> | string | null
    data?: JsonNullableWithAggregatesFilter<"MCPResource">
    status?: EnumMCPResourceStatusWithAggregatesFilter<"MCPResource"> | $Enums.MCPResourceStatus
    createdAt?: DateTimeWithAggregatesFilter<"MCPResource"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MCPResource"> | Date | string
    userId?: IntWithAggregatesFilter<"MCPResource"> | number
  }

  export type MCPOperationWhereInput = {
    AND?: MCPOperationWhereInput | MCPOperationWhereInput[]
    OR?: MCPOperationWhereInput[]
    NOT?: MCPOperationWhereInput | MCPOperationWhereInput[]
    id?: StringFilter<"MCPOperation"> | string
    operation?: StringFilter<"MCPOperation"> | string
    data?: JsonNullableFilter<"MCPOperation">
    result?: JsonNullableFilter<"MCPOperation">
    status?: EnumMCPOperationStatusFilter<"MCPOperation"> | $Enums.MCPOperationStatus
    error?: StringNullableFilter<"MCPOperation"> | string | null
    createdAt?: DateTimeFilter<"MCPOperation"> | Date | string
    updatedAt?: DateTimeFilter<"MCPOperation"> | Date | string
    completedAt?: DateTimeNullableFilter<"MCPOperation"> | Date | string | null
    userId?: IntFilter<"MCPOperation"> | number
    resourceId?: StringNullableFilter<"MCPOperation"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    resource?: XOR<MCPResourceNullableScalarRelationFilter, MCPResourceWhereInput> | null
  }

  export type MCPOperationOrderByWithRelationInput = {
    id?: SortOrder
    operation?: SortOrder
    data?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    resource?: MCPResourceOrderByWithRelationInput
  }

  export type MCPOperationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MCPOperationWhereInput | MCPOperationWhereInput[]
    OR?: MCPOperationWhereInput[]
    NOT?: MCPOperationWhereInput | MCPOperationWhereInput[]
    operation?: StringFilter<"MCPOperation"> | string
    data?: JsonNullableFilter<"MCPOperation">
    result?: JsonNullableFilter<"MCPOperation">
    status?: EnumMCPOperationStatusFilter<"MCPOperation"> | $Enums.MCPOperationStatus
    error?: StringNullableFilter<"MCPOperation"> | string | null
    createdAt?: DateTimeFilter<"MCPOperation"> | Date | string
    updatedAt?: DateTimeFilter<"MCPOperation"> | Date | string
    completedAt?: DateTimeNullableFilter<"MCPOperation"> | Date | string | null
    userId?: IntFilter<"MCPOperation"> | number
    resourceId?: StringNullableFilter<"MCPOperation"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    resource?: XOR<MCPResourceNullableScalarRelationFilter, MCPResourceWhereInput> | null
  }, "id">

  export type MCPOperationOrderByWithAggregationInput = {
    id?: SortOrder
    operation?: SortOrder
    data?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    _count?: MCPOperationCountOrderByAggregateInput
    _avg?: MCPOperationAvgOrderByAggregateInput
    _max?: MCPOperationMaxOrderByAggregateInput
    _min?: MCPOperationMinOrderByAggregateInput
    _sum?: MCPOperationSumOrderByAggregateInput
  }

  export type MCPOperationScalarWhereWithAggregatesInput = {
    AND?: MCPOperationScalarWhereWithAggregatesInput | MCPOperationScalarWhereWithAggregatesInput[]
    OR?: MCPOperationScalarWhereWithAggregatesInput[]
    NOT?: MCPOperationScalarWhereWithAggregatesInput | MCPOperationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MCPOperation"> | string
    operation?: StringWithAggregatesFilter<"MCPOperation"> | string
    data?: JsonNullableWithAggregatesFilter<"MCPOperation">
    result?: JsonNullableWithAggregatesFilter<"MCPOperation">
    status?: EnumMCPOperationStatusWithAggregatesFilter<"MCPOperation"> | $Enums.MCPOperationStatus
    error?: StringNullableWithAggregatesFilter<"MCPOperation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MCPOperation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MCPOperation"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"MCPOperation"> | Date | string | null
    userId?: IntWithAggregatesFilter<"MCPOperation"> | number
    resourceId?: StringNullableWithAggregatesFilter<"MCPOperation"> | string | null
  }

  export type UserCreateInput = {
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenCreateNestedManyWithoutUserInput
    FileUpload?: FileUploadCreateNestedManyWithoutUserInput
    MCPResource?: MCPResourceCreateNestedManyWithoutUserInput
    MCPOperation?: MCPOperationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    FileUpload?: FileUploadUncheckedCreateNestedManyWithoutUserInput
    MCPResource?: MCPResourceUncheckedCreateNestedManyWithoutUserInput
    MCPOperation?: MCPOperationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUpdateManyWithoutUserNestedInput
    FileUpload?: FileUploadUpdateManyWithoutUserNestedInput
    MCPResource?: MCPResourceUpdateManyWithoutUserNestedInput
    MCPOperation?: MCPOperationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    FileUpload?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
    MCPResource?: MCPResourceUncheckedUpdateManyWithoutUserNestedInput
    MCPOperation?: MCPOperationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateInput = {
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: number
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    userId: number
  }

  export type TokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TokenCreateManyInput = {
    id?: number
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    userId: number
  }

  export type TokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type FileUploadCreateInput = {
    uploadId: string
    fileName: string
    fileType: string
    fileSize: number
    status?: $Enums.FileUploadStatus
    signedUrl: string
    fileUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFileUploadInput
  }

  export type FileUploadUncheckedCreateInput = {
    id?: number
    uploadId: string
    fileName: string
    fileType: string
    fileSize: number
    status?: $Enums.FileUploadStatus
    signedUrl: string
    fileUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    userId: number
  }

  export type FileUploadUpdateInput = {
    uploadId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    status?: EnumFileUploadStatusFieldUpdateOperationsInput | $Enums.FileUploadStatus
    signedUrl?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFileUploadNestedInput
  }

  export type FileUploadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uploadId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    status?: EnumFileUploadStatusFieldUpdateOperationsInput | $Enums.FileUploadStatus
    signedUrl?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type FileUploadCreateManyInput = {
    id?: number
    uploadId: string
    fileName: string
    fileType: string
    fileSize: number
    status?: $Enums.FileUploadStatus
    signedUrl: string
    fileUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    userId: number
  }

  export type FileUploadUpdateManyMutationInput = {
    uploadId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    status?: EnumFileUploadStatusFieldUpdateOperationsInput | $Enums.FileUploadStatus
    signedUrl?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUploadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uploadId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    status?: EnumFileUploadStatusFieldUpdateOperationsInput | $Enums.FileUploadStatus
    signedUrl?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type MCPResourceCreateInput = {
    id?: string
    type: $Enums.MCPResourceType
    name: string
    description?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPResourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMCPResourceInput
    operations?: MCPOperationCreateNestedManyWithoutResourceInput
  }

  export type MCPResourceUncheckedCreateInput = {
    id?: string
    type: $Enums.MCPResourceType
    name: string
    description?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPResourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    operations?: MCPOperationUncheckedCreateNestedManyWithoutResourceInput
  }

  export type MCPResourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMCPResourceNestedInput
    operations?: MCPOperationUpdateManyWithoutResourceNestedInput
  }

  export type MCPResourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    operations?: MCPOperationUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type MCPResourceCreateManyInput = {
    id?: string
    type: $Enums.MCPResourceType
    name: string
    description?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPResourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type MCPResourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCPResourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type MCPOperationCreateInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutMCPOperationInput
    resource?: MCPResourceCreateNestedOneWithoutOperationsInput
  }

  export type MCPOperationUncheckedCreateInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    userId: number
    resourceId?: string | null
  }

  export type MCPOperationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutMCPOperationNestedInput
    resource?: MCPResourceUpdateOneWithoutOperationsNestedInput
  }

  export type MCPOperationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MCPOperationCreateManyInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    userId: number
    resourceId?: string | null
  }

  export type MCPOperationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MCPOperationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TokenListRelationFilter = {
    every?: TokenWhereInput
    some?: TokenWhereInput
    none?: TokenWhereInput
  }

  export type FileUploadListRelationFilter = {
    every?: FileUploadWhereInput
    some?: FileUploadWhereInput
    none?: FileUploadWhereInput
  }

  export type MCPResourceListRelationFilter = {
    every?: MCPResourceWhereInput
    some?: MCPResourceWhereInput
    none?: MCPResourceWhereInput
  }

  export type MCPOperationListRelationFilter = {
    every?: MCPOperationWhereInput
    some?: MCPOperationWhereInput
    none?: MCPOperationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileUploadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MCPResourceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MCPOperationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type EnumFileUploadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FileUploadStatus | EnumFileUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FileUploadStatus[] | ListEnumFileUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileUploadStatus[] | ListEnumFileUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFileUploadStatusFilter<$PrismaModel> | $Enums.FileUploadStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FileUploadCountOrderByAggregateInput = {
    id?: SortOrder
    uploadId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    status?: SortOrder
    signedUrl?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
  }

  export type FileUploadAvgOrderByAggregateInput = {
    id?: SortOrder
    fileSize?: SortOrder
    userId?: SortOrder
  }

  export type FileUploadMaxOrderByAggregateInput = {
    id?: SortOrder
    uploadId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    status?: SortOrder
    signedUrl?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
  }

  export type FileUploadMinOrderByAggregateInput = {
    id?: SortOrder
    uploadId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    status?: SortOrder
    signedUrl?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
  }

  export type FileUploadSumOrderByAggregateInput = {
    id?: SortOrder
    fileSize?: SortOrder
    userId?: SortOrder
  }

  export type EnumFileUploadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileUploadStatus | EnumFileUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FileUploadStatus[] | ListEnumFileUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileUploadStatus[] | ListEnumFileUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFileUploadStatusWithAggregatesFilter<$PrismaModel> | $Enums.FileUploadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFileUploadStatusFilter<$PrismaModel>
    _max?: NestedEnumFileUploadStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumMCPResourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPResourceType | EnumMCPResourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MCPResourceType[] | ListEnumMCPResourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPResourceType[] | ListEnumMCPResourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPResourceTypeFilter<$PrismaModel> | $Enums.MCPResourceType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumMCPResourceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPResourceStatus | EnumMCPResourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MCPResourceStatus[] | ListEnumMCPResourceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPResourceStatus[] | ListEnumMCPResourceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPResourceStatusFilter<$PrismaModel> | $Enums.MCPResourceStatus
  }

  export type MCPResourceCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    data?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type MCPResourceAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type MCPResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type MCPResourceMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type MCPResourceSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type EnumMCPResourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPResourceType | EnumMCPResourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MCPResourceType[] | ListEnumMCPResourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPResourceType[] | ListEnumMCPResourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPResourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.MCPResourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMCPResourceTypeFilter<$PrismaModel>
    _max?: NestedEnumMCPResourceTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumMCPResourceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPResourceStatus | EnumMCPResourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MCPResourceStatus[] | ListEnumMCPResourceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPResourceStatus[] | ListEnumMCPResourceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPResourceStatusWithAggregatesFilter<$PrismaModel> | $Enums.MCPResourceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMCPResourceStatusFilter<$PrismaModel>
    _max?: NestedEnumMCPResourceStatusFilter<$PrismaModel>
  }

  export type EnumMCPOperationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPOperationStatus | EnumMCPOperationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MCPOperationStatus[] | ListEnumMCPOperationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPOperationStatus[] | ListEnumMCPOperationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPOperationStatusFilter<$PrismaModel> | $Enums.MCPOperationStatus
  }

  export type MCPResourceNullableScalarRelationFilter = {
    is?: MCPResourceWhereInput | null
    isNot?: MCPResourceWhereInput | null
  }

  export type MCPOperationCountOrderByAggregateInput = {
    id?: SortOrder
    operation?: SortOrder
    data?: SortOrder
    result?: SortOrder
    status?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
  }

  export type MCPOperationAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type MCPOperationMaxOrderByAggregateInput = {
    id?: SortOrder
    operation?: SortOrder
    status?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
  }

  export type MCPOperationMinOrderByAggregateInput = {
    id?: SortOrder
    operation?: SortOrder
    status?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
  }

  export type MCPOperationSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type EnumMCPOperationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPOperationStatus | EnumMCPOperationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MCPOperationStatus[] | ListEnumMCPOperationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPOperationStatus[] | ListEnumMCPOperationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPOperationStatusWithAggregatesFilter<$PrismaModel> | $Enums.MCPOperationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMCPOperationStatusFilter<$PrismaModel>
    _max?: NestedEnumMCPOperationStatusFilter<$PrismaModel>
  }

  export type TokenCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput> | TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
  }

  export type FileUploadCreateNestedManyWithoutUserInput = {
    create?: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput> | FileUploadCreateWithoutUserInput[] | FileUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileUploadCreateOrConnectWithoutUserInput | FileUploadCreateOrConnectWithoutUserInput[]
    createMany?: FileUploadCreateManyUserInputEnvelope
    connect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
  }

  export type MCPResourceCreateNestedManyWithoutUserInput = {
    create?: XOR<MCPResourceCreateWithoutUserInput, MCPResourceUncheckedCreateWithoutUserInput> | MCPResourceCreateWithoutUserInput[] | MCPResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCPResourceCreateOrConnectWithoutUserInput | MCPResourceCreateOrConnectWithoutUserInput[]
    createMany?: MCPResourceCreateManyUserInputEnvelope
    connect?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
  }

  export type MCPOperationCreateNestedManyWithoutUserInput = {
    create?: XOR<MCPOperationCreateWithoutUserInput, MCPOperationUncheckedCreateWithoutUserInput> | MCPOperationCreateWithoutUserInput[] | MCPOperationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCPOperationCreateOrConnectWithoutUserInput | MCPOperationCreateOrConnectWithoutUserInput[]
    createMany?: MCPOperationCreateManyUserInputEnvelope
    connect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
  }

  export type TokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput> | TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
  }

  export type FileUploadUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput> | FileUploadCreateWithoutUserInput[] | FileUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileUploadCreateOrConnectWithoutUserInput | FileUploadCreateOrConnectWithoutUserInput[]
    createMany?: FileUploadCreateManyUserInputEnvelope
    connect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
  }

  export type MCPResourceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MCPResourceCreateWithoutUserInput, MCPResourceUncheckedCreateWithoutUserInput> | MCPResourceCreateWithoutUserInput[] | MCPResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCPResourceCreateOrConnectWithoutUserInput | MCPResourceCreateOrConnectWithoutUserInput[]
    createMany?: MCPResourceCreateManyUserInputEnvelope
    connect?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
  }

  export type MCPOperationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MCPOperationCreateWithoutUserInput, MCPOperationUncheckedCreateWithoutUserInput> | MCPOperationCreateWithoutUserInput[] | MCPOperationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCPOperationCreateOrConnectWithoutUserInput | MCPOperationCreateOrConnectWithoutUserInput[]
    createMany?: MCPOperationCreateManyUserInputEnvelope
    connect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput> | TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    upsert?: TokenUpsertWithWhereUniqueWithoutUserInput | TokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenCreateManyUserInputEnvelope
    set?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    disconnect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    delete?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    update?: TokenUpdateWithWhereUniqueWithoutUserInput | TokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenUpdateManyWithWhereWithoutUserInput | TokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenScalarWhereInput | TokenScalarWhereInput[]
  }

  export type FileUploadUpdateManyWithoutUserNestedInput = {
    create?: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput> | FileUploadCreateWithoutUserInput[] | FileUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileUploadCreateOrConnectWithoutUserInput | FileUploadCreateOrConnectWithoutUserInput[]
    upsert?: FileUploadUpsertWithWhereUniqueWithoutUserInput | FileUploadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FileUploadCreateManyUserInputEnvelope
    set?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    disconnect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    delete?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    connect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    update?: FileUploadUpdateWithWhereUniqueWithoutUserInput | FileUploadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FileUploadUpdateManyWithWhereWithoutUserInput | FileUploadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FileUploadScalarWhereInput | FileUploadScalarWhereInput[]
  }

  export type MCPResourceUpdateManyWithoutUserNestedInput = {
    create?: XOR<MCPResourceCreateWithoutUserInput, MCPResourceUncheckedCreateWithoutUserInput> | MCPResourceCreateWithoutUserInput[] | MCPResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCPResourceCreateOrConnectWithoutUserInput | MCPResourceCreateOrConnectWithoutUserInput[]
    upsert?: MCPResourceUpsertWithWhereUniqueWithoutUserInput | MCPResourceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MCPResourceCreateManyUserInputEnvelope
    set?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
    disconnect?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
    delete?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
    connect?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
    update?: MCPResourceUpdateWithWhereUniqueWithoutUserInput | MCPResourceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MCPResourceUpdateManyWithWhereWithoutUserInput | MCPResourceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MCPResourceScalarWhereInput | MCPResourceScalarWhereInput[]
  }

  export type MCPOperationUpdateManyWithoutUserNestedInput = {
    create?: XOR<MCPOperationCreateWithoutUserInput, MCPOperationUncheckedCreateWithoutUserInput> | MCPOperationCreateWithoutUserInput[] | MCPOperationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCPOperationCreateOrConnectWithoutUserInput | MCPOperationCreateOrConnectWithoutUserInput[]
    upsert?: MCPOperationUpsertWithWhereUniqueWithoutUserInput | MCPOperationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MCPOperationCreateManyUserInputEnvelope
    set?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    disconnect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    delete?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    connect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    update?: MCPOperationUpdateWithWhereUniqueWithoutUserInput | MCPOperationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MCPOperationUpdateManyWithWhereWithoutUserInput | MCPOperationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MCPOperationScalarWhereInput | MCPOperationScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput> | TokenCreateWithoutUserInput[] | TokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput | TokenCreateOrConnectWithoutUserInput[]
    upsert?: TokenUpsertWithWhereUniqueWithoutUserInput | TokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokenCreateManyUserInputEnvelope
    set?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    disconnect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    delete?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    connect?: TokenWhereUniqueInput | TokenWhereUniqueInput[]
    update?: TokenUpdateWithWhereUniqueWithoutUserInput | TokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokenUpdateManyWithWhereWithoutUserInput | TokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokenScalarWhereInput | TokenScalarWhereInput[]
  }

  export type FileUploadUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput> | FileUploadCreateWithoutUserInput[] | FileUploadUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileUploadCreateOrConnectWithoutUserInput | FileUploadCreateOrConnectWithoutUserInput[]
    upsert?: FileUploadUpsertWithWhereUniqueWithoutUserInput | FileUploadUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FileUploadCreateManyUserInputEnvelope
    set?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    disconnect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    delete?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    connect?: FileUploadWhereUniqueInput | FileUploadWhereUniqueInput[]
    update?: FileUploadUpdateWithWhereUniqueWithoutUserInput | FileUploadUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FileUploadUpdateManyWithWhereWithoutUserInput | FileUploadUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FileUploadScalarWhereInput | FileUploadScalarWhereInput[]
  }

  export type MCPResourceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MCPResourceCreateWithoutUserInput, MCPResourceUncheckedCreateWithoutUserInput> | MCPResourceCreateWithoutUserInput[] | MCPResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCPResourceCreateOrConnectWithoutUserInput | MCPResourceCreateOrConnectWithoutUserInput[]
    upsert?: MCPResourceUpsertWithWhereUniqueWithoutUserInput | MCPResourceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MCPResourceCreateManyUserInputEnvelope
    set?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
    disconnect?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
    delete?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
    connect?: MCPResourceWhereUniqueInput | MCPResourceWhereUniqueInput[]
    update?: MCPResourceUpdateWithWhereUniqueWithoutUserInput | MCPResourceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MCPResourceUpdateManyWithWhereWithoutUserInput | MCPResourceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MCPResourceScalarWhereInput | MCPResourceScalarWhereInput[]
  }

  export type MCPOperationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MCPOperationCreateWithoutUserInput, MCPOperationUncheckedCreateWithoutUserInput> | MCPOperationCreateWithoutUserInput[] | MCPOperationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCPOperationCreateOrConnectWithoutUserInput | MCPOperationCreateOrConnectWithoutUserInput[]
    upsert?: MCPOperationUpsertWithWhereUniqueWithoutUserInput | MCPOperationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MCPOperationCreateManyUserInputEnvelope
    set?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    disconnect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    delete?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    connect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    update?: MCPOperationUpdateWithWhereUniqueWithoutUserInput | MCPOperationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MCPOperationUpdateManyWithWhereWithoutUserInput | MCPOperationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MCPOperationScalarWhereInput | MCPOperationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTokenInput = {
    create?: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.TokenType
  }

  export type UserUpdateOneRequiredWithoutTokenNestedInput = {
    create?: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    upsert?: UserUpsertWithoutTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTokenInput, UserUpdateWithoutTokenInput>, UserUncheckedUpdateWithoutTokenInput>
  }

  export type UserCreateNestedOneWithoutFileUploadInput = {
    create?: XOR<UserCreateWithoutFileUploadInput, UserUncheckedCreateWithoutFileUploadInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileUploadInput
    connect?: UserWhereUniqueInput
  }

  export type EnumFileUploadStatusFieldUpdateOperationsInput = {
    set?: $Enums.FileUploadStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutFileUploadNestedInput = {
    create?: XOR<UserCreateWithoutFileUploadInput, UserUncheckedCreateWithoutFileUploadInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileUploadInput
    upsert?: UserUpsertWithoutFileUploadInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFileUploadInput, UserUpdateWithoutFileUploadInput>, UserUncheckedUpdateWithoutFileUploadInput>
  }

  export type UserCreateNestedOneWithoutMCPResourceInput = {
    create?: XOR<UserCreateWithoutMCPResourceInput, UserUncheckedCreateWithoutMCPResourceInput>
    connectOrCreate?: UserCreateOrConnectWithoutMCPResourceInput
    connect?: UserWhereUniqueInput
  }

  export type MCPOperationCreateNestedManyWithoutResourceInput = {
    create?: XOR<MCPOperationCreateWithoutResourceInput, MCPOperationUncheckedCreateWithoutResourceInput> | MCPOperationCreateWithoutResourceInput[] | MCPOperationUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: MCPOperationCreateOrConnectWithoutResourceInput | MCPOperationCreateOrConnectWithoutResourceInput[]
    createMany?: MCPOperationCreateManyResourceInputEnvelope
    connect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
  }

  export type MCPOperationUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<MCPOperationCreateWithoutResourceInput, MCPOperationUncheckedCreateWithoutResourceInput> | MCPOperationCreateWithoutResourceInput[] | MCPOperationUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: MCPOperationCreateOrConnectWithoutResourceInput | MCPOperationCreateOrConnectWithoutResourceInput[]
    createMany?: MCPOperationCreateManyResourceInputEnvelope
    connect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
  }

  export type EnumMCPResourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.MCPResourceType
  }

  export type EnumMCPResourceStatusFieldUpdateOperationsInput = {
    set?: $Enums.MCPResourceStatus
  }

  export type UserUpdateOneRequiredWithoutMCPResourceNestedInput = {
    create?: XOR<UserCreateWithoutMCPResourceInput, UserUncheckedCreateWithoutMCPResourceInput>
    connectOrCreate?: UserCreateOrConnectWithoutMCPResourceInput
    upsert?: UserUpsertWithoutMCPResourceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMCPResourceInput, UserUpdateWithoutMCPResourceInput>, UserUncheckedUpdateWithoutMCPResourceInput>
  }

  export type MCPOperationUpdateManyWithoutResourceNestedInput = {
    create?: XOR<MCPOperationCreateWithoutResourceInput, MCPOperationUncheckedCreateWithoutResourceInput> | MCPOperationCreateWithoutResourceInput[] | MCPOperationUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: MCPOperationCreateOrConnectWithoutResourceInput | MCPOperationCreateOrConnectWithoutResourceInput[]
    upsert?: MCPOperationUpsertWithWhereUniqueWithoutResourceInput | MCPOperationUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: MCPOperationCreateManyResourceInputEnvelope
    set?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    disconnect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    delete?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    connect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    update?: MCPOperationUpdateWithWhereUniqueWithoutResourceInput | MCPOperationUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: MCPOperationUpdateManyWithWhereWithoutResourceInput | MCPOperationUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: MCPOperationScalarWhereInput | MCPOperationScalarWhereInput[]
  }

  export type MCPOperationUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<MCPOperationCreateWithoutResourceInput, MCPOperationUncheckedCreateWithoutResourceInput> | MCPOperationCreateWithoutResourceInput[] | MCPOperationUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: MCPOperationCreateOrConnectWithoutResourceInput | MCPOperationCreateOrConnectWithoutResourceInput[]
    upsert?: MCPOperationUpsertWithWhereUniqueWithoutResourceInput | MCPOperationUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: MCPOperationCreateManyResourceInputEnvelope
    set?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    disconnect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    delete?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    connect?: MCPOperationWhereUniqueInput | MCPOperationWhereUniqueInput[]
    update?: MCPOperationUpdateWithWhereUniqueWithoutResourceInput | MCPOperationUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: MCPOperationUpdateManyWithWhereWithoutResourceInput | MCPOperationUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: MCPOperationScalarWhereInput | MCPOperationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutMCPOperationInput = {
    create?: XOR<UserCreateWithoutMCPOperationInput, UserUncheckedCreateWithoutMCPOperationInput>
    connectOrCreate?: UserCreateOrConnectWithoutMCPOperationInput
    connect?: UserWhereUniqueInput
  }

  export type MCPResourceCreateNestedOneWithoutOperationsInput = {
    create?: XOR<MCPResourceCreateWithoutOperationsInput, MCPResourceUncheckedCreateWithoutOperationsInput>
    connectOrCreate?: MCPResourceCreateOrConnectWithoutOperationsInput
    connect?: MCPResourceWhereUniqueInput
  }

  export type EnumMCPOperationStatusFieldUpdateOperationsInput = {
    set?: $Enums.MCPOperationStatus
  }

  export type UserUpdateOneRequiredWithoutMCPOperationNestedInput = {
    create?: XOR<UserCreateWithoutMCPOperationInput, UserUncheckedCreateWithoutMCPOperationInput>
    connectOrCreate?: UserCreateOrConnectWithoutMCPOperationInput
    upsert?: UserUpsertWithoutMCPOperationInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMCPOperationInput, UserUpdateWithoutMCPOperationInput>, UserUncheckedUpdateWithoutMCPOperationInput>
  }

  export type MCPResourceUpdateOneWithoutOperationsNestedInput = {
    create?: XOR<MCPResourceCreateWithoutOperationsInput, MCPResourceUncheckedCreateWithoutOperationsInput>
    connectOrCreate?: MCPResourceCreateOrConnectWithoutOperationsInput
    upsert?: MCPResourceUpsertWithoutOperationsInput
    disconnect?: MCPResourceWhereInput | boolean
    delete?: MCPResourceWhereInput | boolean
    connect?: MCPResourceWhereUniqueInput
    update?: XOR<XOR<MCPResourceUpdateToOneWithWhereWithoutOperationsInput, MCPResourceUpdateWithoutOperationsInput>, MCPResourceUncheckedUpdateWithoutOperationsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type NestedEnumFileUploadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FileUploadStatus | EnumFileUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FileUploadStatus[] | ListEnumFileUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileUploadStatus[] | ListEnumFileUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFileUploadStatusFilter<$PrismaModel> | $Enums.FileUploadStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumFileUploadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileUploadStatus | EnumFileUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FileUploadStatus[] | ListEnumFileUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FileUploadStatus[] | ListEnumFileUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFileUploadStatusWithAggregatesFilter<$PrismaModel> | $Enums.FileUploadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFileUploadStatusFilter<$PrismaModel>
    _max?: NestedEnumFileUploadStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumMCPResourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPResourceType | EnumMCPResourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MCPResourceType[] | ListEnumMCPResourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPResourceType[] | ListEnumMCPResourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPResourceTypeFilter<$PrismaModel> | $Enums.MCPResourceType
  }

  export type NestedEnumMCPResourceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPResourceStatus | EnumMCPResourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MCPResourceStatus[] | ListEnumMCPResourceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPResourceStatus[] | ListEnumMCPResourceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPResourceStatusFilter<$PrismaModel> | $Enums.MCPResourceStatus
  }

  export type NestedEnumMCPResourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPResourceType | EnumMCPResourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MCPResourceType[] | ListEnumMCPResourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPResourceType[] | ListEnumMCPResourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPResourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.MCPResourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMCPResourceTypeFilter<$PrismaModel>
    _max?: NestedEnumMCPResourceTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumMCPResourceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPResourceStatus | EnumMCPResourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MCPResourceStatus[] | ListEnumMCPResourceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPResourceStatus[] | ListEnumMCPResourceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPResourceStatusWithAggregatesFilter<$PrismaModel> | $Enums.MCPResourceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMCPResourceStatusFilter<$PrismaModel>
    _max?: NestedEnumMCPResourceStatusFilter<$PrismaModel>
  }

  export type NestedEnumMCPOperationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPOperationStatus | EnumMCPOperationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MCPOperationStatus[] | ListEnumMCPOperationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPOperationStatus[] | ListEnumMCPOperationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPOperationStatusFilter<$PrismaModel> | $Enums.MCPOperationStatus
  }

  export type NestedEnumMCPOperationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MCPOperationStatus | EnumMCPOperationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MCPOperationStatus[] | ListEnumMCPOperationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MCPOperationStatus[] | ListEnumMCPOperationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMCPOperationStatusWithAggregatesFilter<$PrismaModel> | $Enums.MCPOperationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMCPOperationStatusFilter<$PrismaModel>
    _max?: NestedEnumMCPOperationStatusFilter<$PrismaModel>
  }

  export type TokenCreateWithoutUserInput = {
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type TokenUncheckedCreateWithoutUserInput = {
    id?: number
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type TokenCreateOrConnectWithoutUserInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TokenCreateManyUserInputEnvelope = {
    data: TokenCreateManyUserInput | TokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FileUploadCreateWithoutUserInput = {
    uploadId: string
    fileName: string
    fileType: string
    fileSize: number
    status?: $Enums.FileUploadStatus
    signedUrl: string
    fileUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type FileUploadUncheckedCreateWithoutUserInput = {
    id?: number
    uploadId: string
    fileName: string
    fileType: string
    fileSize: number
    status?: $Enums.FileUploadStatus
    signedUrl: string
    fileUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type FileUploadCreateOrConnectWithoutUserInput = {
    where: FileUploadWhereUniqueInput
    create: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput>
  }

  export type FileUploadCreateManyUserInputEnvelope = {
    data: FileUploadCreateManyUserInput | FileUploadCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MCPResourceCreateWithoutUserInput = {
    id?: string
    type: $Enums.MCPResourceType
    name: string
    description?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPResourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    operations?: MCPOperationCreateNestedManyWithoutResourceInput
  }

  export type MCPResourceUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.MCPResourceType
    name: string
    description?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPResourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    operations?: MCPOperationUncheckedCreateNestedManyWithoutResourceInput
  }

  export type MCPResourceCreateOrConnectWithoutUserInput = {
    where: MCPResourceWhereUniqueInput
    create: XOR<MCPResourceCreateWithoutUserInput, MCPResourceUncheckedCreateWithoutUserInput>
  }

  export type MCPResourceCreateManyUserInputEnvelope = {
    data: MCPResourceCreateManyUserInput | MCPResourceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MCPOperationCreateWithoutUserInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    resource?: MCPResourceCreateNestedOneWithoutOperationsInput
  }

  export type MCPOperationUncheckedCreateWithoutUserInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    resourceId?: string | null
  }

  export type MCPOperationCreateOrConnectWithoutUserInput = {
    where: MCPOperationWhereUniqueInput
    create: XOR<MCPOperationCreateWithoutUserInput, MCPOperationUncheckedCreateWithoutUserInput>
  }

  export type MCPOperationCreateManyUserInputEnvelope = {
    data: MCPOperationCreateManyUserInput | MCPOperationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TokenUpsertWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    update: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TokenUpdateWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    data: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
  }

  export type TokenUpdateManyWithWhereWithoutUserInput = {
    where: TokenScalarWhereInput
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyWithoutUserInput>
  }

  export type TokenScalarWhereInput = {
    AND?: TokenScalarWhereInput | TokenScalarWhereInput[]
    OR?: TokenScalarWhereInput[]
    NOT?: TokenScalarWhereInput | TokenScalarWhereInput[]
    id?: IntFilter<"Token"> | number
    token?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expires?: DateTimeFilter<"Token"> | Date | string
    blacklisted?: BoolFilter<"Token"> | boolean
    createdAt?: DateTimeFilter<"Token"> | Date | string
    userId?: IntFilter<"Token"> | number
  }

  export type FileUploadUpsertWithWhereUniqueWithoutUserInput = {
    where: FileUploadWhereUniqueInput
    update: XOR<FileUploadUpdateWithoutUserInput, FileUploadUncheckedUpdateWithoutUserInput>
    create: XOR<FileUploadCreateWithoutUserInput, FileUploadUncheckedCreateWithoutUserInput>
  }

  export type FileUploadUpdateWithWhereUniqueWithoutUserInput = {
    where: FileUploadWhereUniqueInput
    data: XOR<FileUploadUpdateWithoutUserInput, FileUploadUncheckedUpdateWithoutUserInput>
  }

  export type FileUploadUpdateManyWithWhereWithoutUserInput = {
    where: FileUploadScalarWhereInput
    data: XOR<FileUploadUpdateManyMutationInput, FileUploadUncheckedUpdateManyWithoutUserInput>
  }

  export type FileUploadScalarWhereInput = {
    AND?: FileUploadScalarWhereInput | FileUploadScalarWhereInput[]
    OR?: FileUploadScalarWhereInput[]
    NOT?: FileUploadScalarWhereInput | FileUploadScalarWhereInput[]
    id?: IntFilter<"FileUpload"> | number
    uploadId?: StringFilter<"FileUpload"> | string
    fileName?: StringFilter<"FileUpload"> | string
    fileType?: StringFilter<"FileUpload"> | string
    fileSize?: IntFilter<"FileUpload"> | number
    status?: EnumFileUploadStatusFilter<"FileUpload"> | $Enums.FileUploadStatus
    signedUrl?: StringFilter<"FileUpload"> | string
    fileUrl?: StringFilter<"FileUpload"> | string
    createdAt?: DateTimeFilter<"FileUpload"> | Date | string
    updatedAt?: DateTimeFilter<"FileUpload"> | Date | string
    completedAt?: DateTimeNullableFilter<"FileUpload"> | Date | string | null
    userId?: IntFilter<"FileUpload"> | number
  }

  export type MCPResourceUpsertWithWhereUniqueWithoutUserInput = {
    where: MCPResourceWhereUniqueInput
    update: XOR<MCPResourceUpdateWithoutUserInput, MCPResourceUncheckedUpdateWithoutUserInput>
    create: XOR<MCPResourceCreateWithoutUserInput, MCPResourceUncheckedCreateWithoutUserInput>
  }

  export type MCPResourceUpdateWithWhereUniqueWithoutUserInput = {
    where: MCPResourceWhereUniqueInput
    data: XOR<MCPResourceUpdateWithoutUserInput, MCPResourceUncheckedUpdateWithoutUserInput>
  }

  export type MCPResourceUpdateManyWithWhereWithoutUserInput = {
    where: MCPResourceScalarWhereInput
    data: XOR<MCPResourceUpdateManyMutationInput, MCPResourceUncheckedUpdateManyWithoutUserInput>
  }

  export type MCPResourceScalarWhereInput = {
    AND?: MCPResourceScalarWhereInput | MCPResourceScalarWhereInput[]
    OR?: MCPResourceScalarWhereInput[]
    NOT?: MCPResourceScalarWhereInput | MCPResourceScalarWhereInput[]
    id?: StringFilter<"MCPResource"> | string
    type?: EnumMCPResourceTypeFilter<"MCPResource"> | $Enums.MCPResourceType
    name?: StringFilter<"MCPResource"> | string
    description?: StringNullableFilter<"MCPResource"> | string | null
    data?: JsonNullableFilter<"MCPResource">
    status?: EnumMCPResourceStatusFilter<"MCPResource"> | $Enums.MCPResourceStatus
    createdAt?: DateTimeFilter<"MCPResource"> | Date | string
    updatedAt?: DateTimeFilter<"MCPResource"> | Date | string
    userId?: IntFilter<"MCPResource"> | number
  }

  export type MCPOperationUpsertWithWhereUniqueWithoutUserInput = {
    where: MCPOperationWhereUniqueInput
    update: XOR<MCPOperationUpdateWithoutUserInput, MCPOperationUncheckedUpdateWithoutUserInput>
    create: XOR<MCPOperationCreateWithoutUserInput, MCPOperationUncheckedCreateWithoutUserInput>
  }

  export type MCPOperationUpdateWithWhereUniqueWithoutUserInput = {
    where: MCPOperationWhereUniqueInput
    data: XOR<MCPOperationUpdateWithoutUserInput, MCPOperationUncheckedUpdateWithoutUserInput>
  }

  export type MCPOperationUpdateManyWithWhereWithoutUserInput = {
    where: MCPOperationScalarWhereInput
    data: XOR<MCPOperationUpdateManyMutationInput, MCPOperationUncheckedUpdateManyWithoutUserInput>
  }

  export type MCPOperationScalarWhereInput = {
    AND?: MCPOperationScalarWhereInput | MCPOperationScalarWhereInput[]
    OR?: MCPOperationScalarWhereInput[]
    NOT?: MCPOperationScalarWhereInput | MCPOperationScalarWhereInput[]
    id?: StringFilter<"MCPOperation"> | string
    operation?: StringFilter<"MCPOperation"> | string
    data?: JsonNullableFilter<"MCPOperation">
    result?: JsonNullableFilter<"MCPOperation">
    status?: EnumMCPOperationStatusFilter<"MCPOperation"> | $Enums.MCPOperationStatus
    error?: StringNullableFilter<"MCPOperation"> | string | null
    createdAt?: DateTimeFilter<"MCPOperation"> | Date | string
    updatedAt?: DateTimeFilter<"MCPOperation"> | Date | string
    completedAt?: DateTimeNullableFilter<"MCPOperation"> | Date | string | null
    userId?: IntFilter<"MCPOperation"> | number
    resourceId?: StringNullableFilter<"MCPOperation"> | string | null
  }

  export type UserCreateWithoutTokenInput = {
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    FileUpload?: FileUploadCreateNestedManyWithoutUserInput
    MCPResource?: MCPResourceCreateNestedManyWithoutUserInput
    MCPOperation?: MCPOperationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTokenInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    FileUpload?: FileUploadUncheckedCreateNestedManyWithoutUserInput
    MCPResource?: MCPResourceUncheckedCreateNestedManyWithoutUserInput
    MCPOperation?: MCPOperationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
  }

  export type UserUpsertWithoutTokenInput = {
    update: XOR<UserUpdateWithoutTokenInput, UserUncheckedUpdateWithoutTokenInput>
    create: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTokenInput, UserUncheckedUpdateWithoutTokenInput>
  }

  export type UserUpdateWithoutTokenInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    FileUpload?: FileUploadUpdateManyWithoutUserNestedInput
    MCPResource?: MCPResourceUpdateManyWithoutUserNestedInput
    MCPOperation?: MCPOperationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTokenInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    FileUpload?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
    MCPResource?: MCPResourceUncheckedUpdateManyWithoutUserNestedInput
    MCPOperation?: MCPOperationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFileUploadInput = {
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenCreateNestedManyWithoutUserInput
    MCPResource?: MCPResourceCreateNestedManyWithoutUserInput
    MCPOperation?: MCPOperationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFileUploadInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    MCPResource?: MCPResourceUncheckedCreateNestedManyWithoutUserInput
    MCPOperation?: MCPOperationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFileUploadInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFileUploadInput, UserUncheckedCreateWithoutFileUploadInput>
  }

  export type UserUpsertWithoutFileUploadInput = {
    update: XOR<UserUpdateWithoutFileUploadInput, UserUncheckedUpdateWithoutFileUploadInput>
    create: XOR<UserCreateWithoutFileUploadInput, UserUncheckedCreateWithoutFileUploadInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFileUploadInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFileUploadInput, UserUncheckedUpdateWithoutFileUploadInput>
  }

  export type UserUpdateWithoutFileUploadInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUpdateManyWithoutUserNestedInput
    MCPResource?: MCPResourceUpdateManyWithoutUserNestedInput
    MCPOperation?: MCPOperationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFileUploadInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    MCPResource?: MCPResourceUncheckedUpdateManyWithoutUserNestedInput
    MCPOperation?: MCPOperationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMCPResourceInput = {
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenCreateNestedManyWithoutUserInput
    FileUpload?: FileUploadCreateNestedManyWithoutUserInput
    MCPOperation?: MCPOperationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMCPResourceInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    FileUpload?: FileUploadUncheckedCreateNestedManyWithoutUserInput
    MCPOperation?: MCPOperationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMCPResourceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMCPResourceInput, UserUncheckedCreateWithoutMCPResourceInput>
  }

  export type MCPOperationCreateWithoutResourceInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutMCPOperationInput
  }

  export type MCPOperationUncheckedCreateWithoutResourceInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    userId: number
  }

  export type MCPOperationCreateOrConnectWithoutResourceInput = {
    where: MCPOperationWhereUniqueInput
    create: XOR<MCPOperationCreateWithoutResourceInput, MCPOperationUncheckedCreateWithoutResourceInput>
  }

  export type MCPOperationCreateManyResourceInputEnvelope = {
    data: MCPOperationCreateManyResourceInput | MCPOperationCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMCPResourceInput = {
    update: XOR<UserUpdateWithoutMCPResourceInput, UserUncheckedUpdateWithoutMCPResourceInput>
    create: XOR<UserCreateWithoutMCPResourceInput, UserUncheckedCreateWithoutMCPResourceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMCPResourceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMCPResourceInput, UserUncheckedUpdateWithoutMCPResourceInput>
  }

  export type UserUpdateWithoutMCPResourceInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUpdateManyWithoutUserNestedInput
    FileUpload?: FileUploadUpdateManyWithoutUserNestedInput
    MCPOperation?: MCPOperationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMCPResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    FileUpload?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
    MCPOperation?: MCPOperationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MCPOperationUpsertWithWhereUniqueWithoutResourceInput = {
    where: MCPOperationWhereUniqueInput
    update: XOR<MCPOperationUpdateWithoutResourceInput, MCPOperationUncheckedUpdateWithoutResourceInput>
    create: XOR<MCPOperationCreateWithoutResourceInput, MCPOperationUncheckedCreateWithoutResourceInput>
  }

  export type MCPOperationUpdateWithWhereUniqueWithoutResourceInput = {
    where: MCPOperationWhereUniqueInput
    data: XOR<MCPOperationUpdateWithoutResourceInput, MCPOperationUncheckedUpdateWithoutResourceInput>
  }

  export type MCPOperationUpdateManyWithWhereWithoutResourceInput = {
    where: MCPOperationScalarWhereInput
    data: XOR<MCPOperationUpdateManyMutationInput, MCPOperationUncheckedUpdateManyWithoutResourceInput>
  }

  export type UserCreateWithoutMCPOperationInput = {
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenCreateNestedManyWithoutUserInput
    FileUpload?: FileUploadCreateNestedManyWithoutUserInput
    MCPResource?: MCPResourceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMCPOperationInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: $Enums.Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    FileUpload?: FileUploadUncheckedCreateNestedManyWithoutUserInput
    MCPResource?: MCPResourceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMCPOperationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMCPOperationInput, UserUncheckedCreateWithoutMCPOperationInput>
  }

  export type MCPResourceCreateWithoutOperationsInput = {
    id?: string
    type: $Enums.MCPResourceType
    name: string
    description?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPResourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMCPResourceInput
  }

  export type MCPResourceUncheckedCreateWithoutOperationsInput = {
    id?: string
    type: $Enums.MCPResourceType
    name: string
    description?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPResourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type MCPResourceCreateOrConnectWithoutOperationsInput = {
    where: MCPResourceWhereUniqueInput
    create: XOR<MCPResourceCreateWithoutOperationsInput, MCPResourceUncheckedCreateWithoutOperationsInput>
  }

  export type UserUpsertWithoutMCPOperationInput = {
    update: XOR<UserUpdateWithoutMCPOperationInput, UserUncheckedUpdateWithoutMCPOperationInput>
    create: XOR<UserCreateWithoutMCPOperationInput, UserUncheckedCreateWithoutMCPOperationInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMCPOperationInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMCPOperationInput, UserUncheckedUpdateWithoutMCPOperationInput>
  }

  export type UserUpdateWithoutMCPOperationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUpdateManyWithoutUserNestedInput
    FileUpload?: FileUploadUpdateManyWithoutUserNestedInput
    MCPResource?: MCPResourceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMCPOperationInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    FileUpload?: FileUploadUncheckedUpdateManyWithoutUserNestedInput
    MCPResource?: MCPResourceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MCPResourceUpsertWithoutOperationsInput = {
    update: XOR<MCPResourceUpdateWithoutOperationsInput, MCPResourceUncheckedUpdateWithoutOperationsInput>
    create: XOR<MCPResourceCreateWithoutOperationsInput, MCPResourceUncheckedCreateWithoutOperationsInput>
    where?: MCPResourceWhereInput
  }

  export type MCPResourceUpdateToOneWithWhereWithoutOperationsInput = {
    where?: MCPResourceWhereInput
    data: XOR<MCPResourceUpdateWithoutOperationsInput, MCPResourceUncheckedUpdateWithoutOperationsInput>
  }

  export type MCPResourceUpdateWithoutOperationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMCPResourceNestedInput
  }

  export type MCPResourceUncheckedUpdateWithoutOperationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TokenCreateManyUserInput = {
    id?: number
    token: string
    type: $Enums.TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type FileUploadCreateManyUserInput = {
    id?: number
    uploadId: string
    fileName: string
    fileType: string
    fileSize: number
    status?: $Enums.FileUploadStatus
    signedUrl: string
    fileUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type MCPResourceCreateManyUserInput = {
    id?: string
    type: $Enums.MCPResourceType
    name: string
    description?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPResourceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MCPOperationCreateManyUserInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    resourceId?: string | null
  }

  export type TokenUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileUploadUpdateWithoutUserInput = {
    uploadId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    status?: EnumFileUploadStatusFieldUpdateOperationsInput | $Enums.FileUploadStatus
    signedUrl?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUploadUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uploadId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    status?: EnumFileUploadStatusFieldUpdateOperationsInput | $Enums.FileUploadStatus
    signedUrl?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUploadUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uploadId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    status?: EnumFileUploadStatusFieldUpdateOperationsInput | $Enums.FileUploadStatus
    signedUrl?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MCPResourceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: MCPOperationUpdateManyWithoutResourceNestedInput
  }

  export type MCPResourceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    operations?: MCPOperationUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type MCPResourceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumMCPResourceTypeFieldUpdateOperationsInput | $Enums.MCPResourceType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPResourceStatusFieldUpdateOperationsInput | $Enums.MCPResourceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCPOperationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resource?: MCPResourceUpdateOneWithoutOperationsNestedInput
  }

  export type MCPOperationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MCPOperationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MCPOperationCreateManyResourceInput = {
    id?: string
    operation: string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.MCPOperationStatus
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    userId: number
  }

  export type MCPOperationUpdateWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutMCPOperationNestedInput
  }

  export type MCPOperationUncheckedUpdateWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type MCPOperationUncheckedUpdateManyWithoutResourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    operation?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    result?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumMCPOperationStatusFieldUpdateOperationsInput | $Enums.MCPOperationStatus
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
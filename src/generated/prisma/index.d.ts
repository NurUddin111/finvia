
/**
 * Client
**/

import * as runtime from './runtime/client.js';
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
 * Model AuthProvider
 * 
 */
export type AuthProvider = $Result.DefaultSelection<Prisma.$AuthProviderPayload>
/**
 * Model Business
 * 
 */
export type Business = $Result.DefaultSelection<Prisma.$BusinessPayload>
/**
 * Model BusinessUser
 * 
 */
export type BusinessUser = $Result.DefaultSelection<Prisma.$BusinessUserPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  USER: 'USER',
  BUSINESS_OWNER: 'BUSINESS_OWNER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const Provider: {
  google: 'google',
  credentials: 'credentials'
};

export type Provider = (typeof Provider)[keyof typeof Provider]


export const IsActive: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED'
};

export type IsActive = (typeof IsActive)[keyof typeof IsActive]


export const BusinessRole: {
  BUSINESS_OWNER: 'BUSINESS_OWNER',
  BUSINESS_ADMIN: 'BUSINESS_ADMIN'
};

export type BusinessRole = (typeof BusinessRole)[keyof typeof BusinessRole]


export const BusinessCategory: {
  AGENCY: 'AGENCY',
  ECOMMERCE: 'ECOMMERCE',
  RESTAURANT: 'RESTAURANT',
  FREELANCER: 'FREELANCER',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  RETAIL: 'RETAIL',
  SOFTWARE_COMPANY: 'SOFTWARE_COMPANY',
  EDUCATION: 'EDUCATION',
  HEALTHCARE: 'HEALTHCARE',
  REAL_ESTATE: 'REAL_ESTATE',
  OTHER: 'OTHER'
};

export type BusinessCategory = (typeof BusinessCategory)[keyof typeof BusinessCategory]


export const MemberStatus: {
  INVITED: 'INVITED',
  ACTIVE: 'ACTIVE',
  REMOVED: 'REMOVED'
};

export type MemberStatus = (typeof MemberStatus)[keyof typeof MemberStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

export type IsActive = $Enums.IsActive

export const IsActive: typeof $Enums.IsActive

export type BusinessRole = $Enums.BusinessRole

export const BusinessRole: typeof $Enums.BusinessRole

export type BusinessCategory = $Enums.BusinessCategory

export const BusinessCategory: typeof $Enums.BusinessCategory

export type MemberStatus = $Enums.MemberStatus

export const MemberStatus: typeof $Enums.MemberStatus

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
   * `prisma.authProvider`: Exposes CRUD operations for the **AuthProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthProviders
    * const authProviders = await prisma.authProvider.findMany()
    * ```
    */
  get authProvider(): Prisma.AuthProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.business`: Exposes CRUD operations for the **Business** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Businesses
    * const businesses = await prisma.business.findMany()
    * ```
    */
  get business(): Prisma.BusinessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.businessUser`: Exposes CRUD operations for the **BusinessUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessUsers
    * const businessUsers = await prisma.businessUser.findMany()
    * ```
    */
  get businessUser(): Prisma.BusinessUserDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.1
   * Query Engine version: f09f2815f091dbba658cdcd2264306d88bb5bda6
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    AuthProvider: 'AuthProvider',
    Business: 'Business',
    BusinessUser: 'BusinessUser'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "authProvider" | "business" | "businessUser"
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
      AuthProvider: {
        payload: Prisma.$AuthProviderPayload<ExtArgs>
        fields: Prisma.AuthProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          findFirst: {
            args: Prisma.AuthProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          findMany: {
            args: Prisma.AuthProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          create: {
            args: Prisma.AuthProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          createMany: {
            args: Prisma.AuthProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          delete: {
            args: Prisma.AuthProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          update: {
            args: Prisma.AuthProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          deleteMany: {
            args: Prisma.AuthProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthProviderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>[]
          }
          upsert: {
            args: Prisma.AuthProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthProviderPayload>
          }
          aggregate: {
            args: Prisma.AuthProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthProvider>
          }
          groupBy: {
            args: Prisma.AuthProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthProviderCountArgs<ExtArgs>
            result: $Utils.Optional<AuthProviderCountAggregateOutputType> | number
          }
        }
      }
      Business: {
        payload: Prisma.$BusinessPayload<ExtArgs>
        fields: Prisma.BusinessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          findFirst: {
            args: Prisma.BusinessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          findMany: {
            args: Prisma.BusinessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          create: {
            args: Prisma.BusinessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          createMany: {
            args: Prisma.BusinessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          delete: {
            args: Prisma.BusinessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          update: {
            args: Prisma.BusinessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          deleteMany: {
            args: Prisma.BusinessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>[]
          }
          upsert: {
            args: Prisma.BusinessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessPayload>
          }
          aggregate: {
            args: Prisma.BusinessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusiness>
          }
          groupBy: {
            args: Prisma.BusinessGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessCountAggregateOutputType> | number
          }
        }
      }
      BusinessUser: {
        payload: Prisma.$BusinessUserPayload<ExtArgs>
        fields: Prisma.BusinessUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BusinessUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BusinessUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>
          }
          findFirst: {
            args: Prisma.BusinessUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BusinessUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>
          }
          findMany: {
            args: Prisma.BusinessUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>[]
          }
          create: {
            args: Prisma.BusinessUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>
          }
          createMany: {
            args: Prisma.BusinessUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BusinessUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>[]
          }
          delete: {
            args: Prisma.BusinessUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>
          }
          update: {
            args: Prisma.BusinessUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>
          }
          deleteMany: {
            args: Prisma.BusinessUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BusinessUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BusinessUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>[]
          }
          upsert: {
            args: Prisma.BusinessUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BusinessUserPayload>
          }
          aggregate: {
            args: Prisma.BusinessUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBusinessUser>
          }
          groupBy: {
            args: Prisma.BusinessUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<BusinessUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.BusinessUserCountArgs<ExtArgs>
            result: $Utils.Optional<BusinessUserCountAggregateOutputType> | number
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    authProvider?: AuthProviderOmit
    business?: BusinessOmit
    businessUser?: BusinessUserOmit
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
    auths: number
    businessUsers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auths?: boolean | UserCountOutputTypeCountAuthsArgs
    businessUsers?: boolean | UserCountOutputTypeCountBusinessUsersArgs
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
  export type UserCountOutputTypeCountAuthsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthProviderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBusinessUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUserWhereInput
  }


  /**
   * Count Type BusinessCountOutputType
   */

  export type BusinessCountOutputType = {
    members: number
  }

  export type BusinessCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | BusinessCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessCountOutputType
     */
    select?: BusinessCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BusinessCountOutputType without action
   */
  export type BusinessCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    isVerified: boolean | null
    isActive: $Enums.IsActive | null
    isDeleted: boolean | null
    avatar: string | null
    phone: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    isVerified: boolean | null
    isActive: $Enums.IsActive | null
    isDeleted: boolean | null
    avatar: string | null
    phone: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    isVerified: number
    isActive: number
    isDeleted: number
    avatar: number
    phone: number
    address: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    isVerified?: true
    isActive?: true
    isDeleted?: true
    avatar?: true
    phone?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    isVerified?: true
    isActive?: true
    isDeleted?: true
    avatar?: true
    phone?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    isVerified?: true
    isActive?: true
    isDeleted?: true
    avatar?: true
    phone?: true
    address?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: $Enums.UserRole
    isVerified: boolean
    isActive: $Enums.IsActive
    isDeleted: boolean
    avatar: string | null
    phone: string | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
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
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    isDeleted?: boolean
    avatar?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auths?: boolean | User$authsArgs<ExtArgs>
    businessUsers?: boolean | User$businessUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    isDeleted?: boolean
    avatar?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    isDeleted?: boolean
    avatar?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    isDeleted?: boolean
    avatar?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "isVerified" | "isActive" | "isDeleted" | "avatar" | "phone" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auths?: boolean | User$authsArgs<ExtArgs>
    businessUsers?: boolean | User$businessUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      auths: Prisma.$AuthProviderPayload<ExtArgs>[]
      businessUsers: Prisma.$BusinessUserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: $Enums.UserRole
      isVerified: boolean
      isActive: $Enums.IsActive
      isDeleted: boolean
      avatar: string | null
      phone: string | null
      address: string | null
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
    auths<T extends User$authsArgs<ExtArgs> = {}>(args?: Subset<T, User$authsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    businessUsers<T extends User$businessUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$businessUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly isActive: FieldRef<"User", 'IsActive'>
    readonly isDeleted: FieldRef<"User", 'Boolean'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
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
   * User.auths
   */
  export type User$authsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    where?: AuthProviderWhereInput
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    cursor?: AuthProviderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * User.businessUsers
   */
  export type User$businessUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    where?: BusinessUserWhereInput
    orderBy?: BusinessUserOrderByWithRelationInput | BusinessUserOrderByWithRelationInput[]
    cursor?: BusinessUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessUserScalarFieldEnum | BusinessUserScalarFieldEnum[]
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
   * Model AuthProvider
   */

  export type AggregateAuthProvider = {
    _count: AuthProviderCountAggregateOutputType | null
    _min: AuthProviderMinAggregateOutputType | null
    _max: AuthProviderMaxAggregateOutputType | null
  }

  export type AuthProviderMinAggregateOutputType = {
    id: string | null
    provider: $Enums.Provider | null
    providerId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type AuthProviderMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.Provider | null
    providerId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type AuthProviderCountAggregateOutputType = {
    id: number
    provider: number
    providerId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type AuthProviderMinAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    userId?: true
    createdAt?: true
  }

  export type AuthProviderMaxAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    userId?: true
    createdAt?: true
  }

  export type AuthProviderCountAggregateInputType = {
    id?: true
    provider?: true
    providerId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type AuthProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthProvider to aggregate.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthProviders
    **/
    _count?: true | AuthProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthProviderMaxAggregateInputType
  }

  export type GetAuthProviderAggregateType<T extends AuthProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthProvider[P]>
      : GetScalarType<T[P], AggregateAuthProvider[P]>
  }




  export type AuthProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthProviderWhereInput
    orderBy?: AuthProviderOrderByWithAggregationInput | AuthProviderOrderByWithAggregationInput[]
    by: AuthProviderScalarFieldEnum[] | AuthProviderScalarFieldEnum
    having?: AuthProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthProviderCountAggregateInputType | true
    _min?: AuthProviderMinAggregateInputType
    _max?: AuthProviderMaxAggregateInputType
  }

  export type AuthProviderGroupByOutputType = {
    id: string
    provider: $Enums.Provider
    providerId: string
    userId: string
    createdAt: Date
    _count: AuthProviderCountAggregateOutputType | null
    _min: AuthProviderMinAggregateOutputType | null
    _max: AuthProviderMaxAggregateOutputType | null
  }

  type GetAuthProviderGroupByPayload<T extends AuthProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
            : GetScalarType<T[P], AuthProviderGroupByOutputType[P]>
        }
      >
    >


  export type AuthProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerId?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerId?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    providerId?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["authProvider"]>

  export type AuthProviderSelectScalar = {
    id?: boolean
    provider?: boolean
    providerId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type AuthProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "providerId" | "userId" | "createdAt", ExtArgs["result"]["authProvider"]>
  export type AuthProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuthProviderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuthProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthProvider"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.Provider
      providerId: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["authProvider"]>
    composites: {}
  }

  type AuthProviderGetPayload<S extends boolean | null | undefined | AuthProviderDefaultArgs> = $Result.GetResult<Prisma.$AuthProviderPayload, S>

  type AuthProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthProviderCountAggregateInputType | true
    }

  export interface AuthProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthProvider'], meta: { name: 'AuthProvider' } }
    /**
     * Find zero or one AuthProvider that matches the filter.
     * @param {AuthProviderFindUniqueArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthProviderFindUniqueArgs>(args: SelectSubset<T, AuthProviderFindUniqueArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthProviderFindUniqueOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthProviderFindFirstArgs>(args?: SelectSubset<T, AuthProviderFindFirstArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindFirstOrThrowArgs} args - Arguments to find a AuthProvider
     * @example
     * // Get one AuthProvider
     * const authProvider = await prisma.authProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthProviders
     * const authProviders = await prisma.authProvider.findMany()
     * 
     * // Get first 10 AuthProviders
     * const authProviders = await prisma.authProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthProviderFindManyArgs>(args?: SelectSubset<T, AuthProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthProvider.
     * @param {AuthProviderCreateArgs} args - Arguments to create a AuthProvider.
     * @example
     * // Create one AuthProvider
     * const AuthProvider = await prisma.authProvider.create({
     *   data: {
     *     // ... data to create a AuthProvider
     *   }
     * })
     * 
     */
    create<T extends AuthProviderCreateArgs>(args: SelectSubset<T, AuthProviderCreateArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthProviders.
     * @param {AuthProviderCreateManyArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthProviderCreateManyArgs>(args?: SelectSubset<T, AuthProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthProviders and returns the data saved in the database.
     * @param {AuthProviderCreateManyAndReturnArgs} args - Arguments to create many AuthProviders.
     * @example
     * // Create many AuthProviders
     * const authProvider = await prisma.authProvider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthProviders and only return the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthProvider.
     * @param {AuthProviderDeleteArgs} args - Arguments to delete one AuthProvider.
     * @example
     * // Delete one AuthProvider
     * const AuthProvider = await prisma.authProvider.delete({
     *   where: {
     *     // ... filter to delete one AuthProvider
     *   }
     * })
     * 
     */
    delete<T extends AuthProviderDeleteArgs>(args: SelectSubset<T, AuthProviderDeleteArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthProvider.
     * @param {AuthProviderUpdateArgs} args - Arguments to update one AuthProvider.
     * @example
     * // Update one AuthProvider
     * const authProvider = await prisma.authProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthProviderUpdateArgs>(args: SelectSubset<T, AuthProviderUpdateArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthProviders.
     * @param {AuthProviderDeleteManyArgs} args - Arguments to filter AuthProviders to delete.
     * @example
     * // Delete a few AuthProviders
     * const { count } = await prisma.authProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthProviderDeleteManyArgs>(args?: SelectSubset<T, AuthProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthProviderUpdateManyArgs>(args: SelectSubset<T, AuthProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthProviders and returns the data updated in the database.
     * @param {AuthProviderUpdateManyAndReturnArgs} args - Arguments to update many AuthProviders.
     * @example
     * // Update many AuthProviders
     * const authProvider = await prisma.authProvider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthProviders and only return the `id`
     * const authProviderWithIdOnly = await prisma.authProvider.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuthProviderUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthProvider.
     * @param {AuthProviderUpsertArgs} args - Arguments to update or create a AuthProvider.
     * @example
     * // Update or create a AuthProvider
     * const authProvider = await prisma.authProvider.upsert({
     *   create: {
     *     // ... data to create a AuthProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthProvider we want to update
     *   }
     * })
     */
    upsert<T extends AuthProviderUpsertArgs>(args: SelectSubset<T, AuthProviderUpsertArgs<ExtArgs>>): Prisma__AuthProviderClient<$Result.GetResult<Prisma.$AuthProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderCountArgs} args - Arguments to filter AuthProviders to count.
     * @example
     * // Count the number of AuthProviders
     * const count = await prisma.authProvider.count({
     *   where: {
     *     // ... the filter for the AuthProviders we want to count
     *   }
     * })
    **/
    count<T extends AuthProviderCountArgs>(
      args?: Subset<T, AuthProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuthProviderAggregateArgs>(args: Subset<T, AuthProviderAggregateArgs>): Prisma.PrismaPromise<GetAuthProviderAggregateType<T>>

    /**
     * Group by AuthProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthProviderGroupByArgs} args - Group by arguments.
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
      T extends AuthProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthProviderGroupByArgs['orderBy'] }
        : { orderBy?: AuthProviderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuthProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthProvider model
   */
  readonly fields: AuthProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuthProvider model
   */
  interface AuthProviderFieldRefs {
    readonly id: FieldRef<"AuthProvider", 'String'>
    readonly provider: FieldRef<"AuthProvider", 'Provider'>
    readonly providerId: FieldRef<"AuthProvider", 'String'>
    readonly userId: FieldRef<"AuthProvider", 'String'>
    readonly createdAt: FieldRef<"AuthProvider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthProvider findUnique
   */
  export type AuthProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider findUniqueOrThrow
   */
  export type AuthProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider findFirst
   */
  export type AuthProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider findFirstOrThrow
   */
  export type AuthProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProvider to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthProviders.
     */
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider findMany
   */
  export type AuthProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter, which AuthProviders to fetch.
     */
    where?: AuthProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthProviders to fetch.
     */
    orderBy?: AuthProviderOrderByWithRelationInput | AuthProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthProviders.
     */
    cursor?: AuthProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthProviders.
     */
    skip?: number
    distinct?: AuthProviderScalarFieldEnum | AuthProviderScalarFieldEnum[]
  }

  /**
   * AuthProvider create
   */
  export type AuthProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthProvider.
     */
    data: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>
  }

  /**
   * AuthProvider createMany
   */
  export type AuthProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthProvider createManyAndReturn
   */
  export type AuthProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * The data used to create many AuthProviders.
     */
    data: AuthProviderCreateManyInput | AuthProviderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthProvider update
   */
  export type AuthProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthProvider.
     */
    data: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>
    /**
     * Choose, which AuthProvider to update.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider updateMany
   */
  export type AuthProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number
  }

  /**
   * AuthProvider updateManyAndReturn
   */
  export type AuthProviderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * The data used to update AuthProviders.
     */
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyInput>
    /**
     * Filter which AuthProviders to update
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthProvider upsert
   */
  export type AuthProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthProvider to update in case it exists.
     */
    where: AuthProviderWhereUniqueInput
    /**
     * In case the AuthProvider found by the `where` argument doesn't exist, create a new AuthProvider with this data.
     */
    create: XOR<AuthProviderCreateInput, AuthProviderUncheckedCreateInput>
    /**
     * In case the AuthProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthProviderUpdateInput, AuthProviderUncheckedUpdateInput>
  }

  /**
   * AuthProvider delete
   */
  export type AuthProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
    /**
     * Filter which AuthProvider to delete.
     */
    where: AuthProviderWhereUniqueInput
  }

  /**
   * AuthProvider deleteMany
   */
  export type AuthProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthProviders to delete
     */
    where?: AuthProviderWhereInput
    /**
     * Limit how many AuthProviders to delete.
     */
    limit?: number
  }

  /**
   * AuthProvider without action
   */
  export type AuthProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthProvider
     */
    select?: AuthProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthProvider
     */
    omit?: AuthProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthProviderInclude<ExtArgs> | null
  }


  /**
   * Model Business
   */

  export type AggregateBusiness = {
    _count: BusinessCountAggregateOutputType | null
    _min: BusinessMinAggregateOutputType | null
    _max: BusinessMaxAggregateOutputType | null
  }

  export type BusinessMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: $Enums.BusinessCategory | null
    email: string | null
    phone: string | null
    address: string | null
    website: string | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: $Enums.BusinessCategory | null
    email: string | null
    phone: string | null
    address: string | null
    website: string | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BusinessCountAggregateOutputType = {
    id: number
    name: number
    category: number
    email: number
    phone: number
    address: number
    website: number
    isDeleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BusinessMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    email?: true
    phone?: true
    address?: true
    website?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    email?: true
    phone?: true
    address?: true
    website?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BusinessCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    email?: true
    phone?: true
    address?: true
    website?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BusinessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Business to aggregate.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Businesses
    **/
    _count?: true | BusinessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessMaxAggregateInputType
  }

  export type GetBusinessAggregateType<T extends BusinessAggregateArgs> = {
        [P in keyof T & keyof AggregateBusiness]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusiness[P]>
      : GetScalarType<T[P], AggregateBusiness[P]>
  }




  export type BusinessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessWhereInput
    orderBy?: BusinessOrderByWithAggregationInput | BusinessOrderByWithAggregationInput[]
    by: BusinessScalarFieldEnum[] | BusinessScalarFieldEnum
    having?: BusinessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessCountAggregateInputType | true
    _min?: BusinessMinAggregateInputType
    _max?: BusinessMaxAggregateInputType
  }

  export type BusinessGroupByOutputType = {
    id: string
    name: string
    category: $Enums.BusinessCategory
    email: string | null
    phone: string | null
    address: string | null
    website: string | null
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: BusinessCountAggregateOutputType | null
    _min: BusinessMinAggregateOutputType | null
    _max: BusinessMaxAggregateOutputType | null
  }

  type GetBusinessGroupByPayload<T extends BusinessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessGroupByOutputType[P]>
        }
      >
    >


  export type BusinessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    website?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    members?: boolean | Business$membersArgs<ExtArgs>
    _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    website?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    website?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["business"]>

  export type BusinessSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    website?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BusinessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "email" | "phone" | "address" | "website" | "isDeleted" | "createdAt" | "updatedAt", ExtArgs["result"]["business"]>
  export type BusinessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Business$membersArgs<ExtArgs>
    _count?: boolean | BusinessCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BusinessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BusinessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BusinessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Business"
    objects: {
      members: Prisma.$BusinessUserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: $Enums.BusinessCategory
      email: string | null
      phone: string | null
      address: string | null
      website: string | null
      isDeleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["business"]>
    composites: {}
  }

  type BusinessGetPayload<S extends boolean | null | undefined | BusinessDefaultArgs> = $Result.GetResult<Prisma.$BusinessPayload, S>

  type BusinessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessCountAggregateInputType | true
    }

  export interface BusinessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Business'], meta: { name: 'Business' } }
    /**
     * Find zero or one Business that matches the filter.
     * @param {BusinessFindUniqueArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessFindUniqueArgs>(args: SelectSubset<T, BusinessFindUniqueArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Business that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessFindUniqueOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Business that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessFindFirstArgs>(args?: SelectSubset<T, BusinessFindFirstArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Business that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindFirstOrThrowArgs} args - Arguments to find a Business
     * @example
     * // Get one Business
     * const business = await prisma.business.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Businesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Businesses
     * const businesses = await prisma.business.findMany()
     * 
     * // Get first 10 Businesses
     * const businesses = await prisma.business.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessWithIdOnly = await prisma.business.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessFindManyArgs>(args?: SelectSubset<T, BusinessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Business.
     * @param {BusinessCreateArgs} args - Arguments to create a Business.
     * @example
     * // Create one Business
     * const Business = await prisma.business.create({
     *   data: {
     *     // ... data to create a Business
     *   }
     * })
     * 
     */
    create<T extends BusinessCreateArgs>(args: SelectSubset<T, BusinessCreateArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Businesses.
     * @param {BusinessCreateManyArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessCreateManyArgs>(args?: SelectSubset<T, BusinessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Businesses and returns the data saved in the database.
     * @param {BusinessCreateManyAndReturnArgs} args - Arguments to create many Businesses.
     * @example
     * // Create many Businesses
     * const business = await prisma.business.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Businesses and only return the `id`
     * const businessWithIdOnly = await prisma.business.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Business.
     * @param {BusinessDeleteArgs} args - Arguments to delete one Business.
     * @example
     * // Delete one Business
     * const Business = await prisma.business.delete({
     *   where: {
     *     // ... filter to delete one Business
     *   }
     * })
     * 
     */
    delete<T extends BusinessDeleteArgs>(args: SelectSubset<T, BusinessDeleteArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Business.
     * @param {BusinessUpdateArgs} args - Arguments to update one Business.
     * @example
     * // Update one Business
     * const business = await prisma.business.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessUpdateArgs>(args: SelectSubset<T, BusinessUpdateArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Businesses.
     * @param {BusinessDeleteManyArgs} args - Arguments to filter Businesses to delete.
     * @example
     * // Delete a few Businesses
     * const { count } = await prisma.business.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessDeleteManyArgs>(args?: SelectSubset<T, BusinessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessUpdateManyArgs>(args: SelectSubset<T, BusinessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Businesses and returns the data updated in the database.
     * @param {BusinessUpdateManyAndReturnArgs} args - Arguments to update many Businesses.
     * @example
     * // Update many Businesses
     * const business = await prisma.business.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Businesses and only return the `id`
     * const businessWithIdOnly = await prisma.business.updateManyAndReturn({
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
    updateManyAndReturn<T extends BusinessUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Business.
     * @param {BusinessUpsertArgs} args - Arguments to update or create a Business.
     * @example
     * // Update or create a Business
     * const business = await prisma.business.upsert({
     *   create: {
     *     // ... data to create a Business
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Business we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUpsertArgs>(args: SelectSubset<T, BusinessUpsertArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Businesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessCountArgs} args - Arguments to filter Businesses to count.
     * @example
     * // Count the number of Businesses
     * const count = await prisma.business.count({
     *   where: {
     *     // ... the filter for the Businesses we want to count
     *   }
     * })
    **/
    count<T extends BusinessCountArgs>(
      args?: Subset<T, BusinessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BusinessAggregateArgs>(args: Subset<T, BusinessAggregateArgs>): Prisma.PrismaPromise<GetBusinessAggregateType<T>>

    /**
     * Group by Business.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessGroupByArgs} args - Group by arguments.
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
      T extends BusinessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessGroupByArgs['orderBy'] }
        : { orderBy?: BusinessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BusinessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Business model
   */
  readonly fields: BusinessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Business.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Business$membersArgs<ExtArgs> = {}>(args?: Subset<T, Business$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Business model
   */
  interface BusinessFieldRefs {
    readonly id: FieldRef<"Business", 'String'>
    readonly name: FieldRef<"Business", 'String'>
    readonly category: FieldRef<"Business", 'BusinessCategory'>
    readonly email: FieldRef<"Business", 'String'>
    readonly phone: FieldRef<"Business", 'String'>
    readonly address: FieldRef<"Business", 'String'>
    readonly website: FieldRef<"Business", 'String'>
    readonly isDeleted: FieldRef<"Business", 'Boolean'>
    readonly createdAt: FieldRef<"Business", 'DateTime'>
    readonly updatedAt: FieldRef<"Business", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Business findUnique
   */
  export type BusinessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business findUniqueOrThrow
   */
  export type BusinessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business findFirst
   */
  export type BusinessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business findFirstOrThrow
   */
  export type BusinessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Business to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Businesses.
     */
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business findMany
   */
  export type BusinessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter, which Businesses to fetch.
     */
    where?: BusinessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Businesses to fetch.
     */
    orderBy?: BusinessOrderByWithRelationInput | BusinessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Businesses.
     */
    cursor?: BusinessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Businesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Businesses.
     */
    skip?: number
    distinct?: BusinessScalarFieldEnum | BusinessScalarFieldEnum[]
  }

  /**
   * Business create
   */
  export type BusinessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The data needed to create a Business.
     */
    data: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>
  }

  /**
   * Business createMany
   */
  export type BusinessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Business createManyAndReturn
   */
  export type BusinessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data used to create many Businesses.
     */
    data: BusinessCreateManyInput | BusinessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Business update
   */
  export type BusinessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The data needed to update a Business.
     */
    data: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>
    /**
     * Choose, which Business to update.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business updateMany
   */
  export type BusinessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Businesses.
     */
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyInput>
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to update.
     */
    limit?: number
  }

  /**
   * Business updateManyAndReturn
   */
  export type BusinessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * The data used to update Businesses.
     */
    data: XOR<BusinessUpdateManyMutationInput, BusinessUncheckedUpdateManyInput>
    /**
     * Filter which Businesses to update
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to update.
     */
    limit?: number
  }

  /**
   * Business upsert
   */
  export type BusinessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * The filter to search for the Business to update in case it exists.
     */
    where: BusinessWhereUniqueInput
    /**
     * In case the Business found by the `where` argument doesn't exist, create a new Business with this data.
     */
    create: XOR<BusinessCreateInput, BusinessUncheckedCreateInput>
    /**
     * In case the Business was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUpdateInput, BusinessUncheckedUpdateInput>
  }

  /**
   * Business delete
   */
  export type BusinessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
    /**
     * Filter which Business to delete.
     */
    where: BusinessWhereUniqueInput
  }

  /**
   * Business deleteMany
   */
  export type BusinessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Businesses to delete
     */
    where?: BusinessWhereInput
    /**
     * Limit how many Businesses to delete.
     */
    limit?: number
  }

  /**
   * Business.members
   */
  export type Business$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    where?: BusinessUserWhereInput
    orderBy?: BusinessUserOrderByWithRelationInput | BusinessUserOrderByWithRelationInput[]
    cursor?: BusinessUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BusinessUserScalarFieldEnum | BusinessUserScalarFieldEnum[]
  }

  /**
   * Business without action
   */
  export type BusinessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Business
     */
    select?: BusinessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Business
     */
    omit?: BusinessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessInclude<ExtArgs> | null
  }


  /**
   * Model BusinessUser
   */

  export type AggregateBusinessUser = {
    _count: BusinessUserCountAggregateOutputType | null
    _min: BusinessUserMinAggregateOutputType | null
    _max: BusinessUserMaxAggregateOutputType | null
  }

  export type BusinessUserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    businessId: string | null
    role: $Enums.BusinessRole | null
    status: $Enums.MemberStatus | null
    createdAt: Date | null
  }

  export type BusinessUserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    businessId: string | null
    role: $Enums.BusinessRole | null
    status: $Enums.MemberStatus | null
    createdAt: Date | null
  }

  export type BusinessUserCountAggregateOutputType = {
    id: number
    userId: number
    businessId: number
    role: number
    status: number
    createdAt: number
    _all: number
  }


  export type BusinessUserMinAggregateInputType = {
    id?: true
    userId?: true
    businessId?: true
    role?: true
    status?: true
    createdAt?: true
  }

  export type BusinessUserMaxAggregateInputType = {
    id?: true
    userId?: true
    businessId?: true
    role?: true
    status?: true
    createdAt?: true
  }

  export type BusinessUserCountAggregateInputType = {
    id?: true
    userId?: true
    businessId?: true
    role?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type BusinessUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessUser to aggregate.
     */
    where?: BusinessUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUsers to fetch.
     */
    orderBy?: BusinessUserOrderByWithRelationInput | BusinessUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BusinessUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessUsers
    **/
    _count?: true | BusinessUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessUserMaxAggregateInputType
  }

  export type GetBusinessUserAggregateType<T extends BusinessUserAggregateArgs> = {
        [P in keyof T & keyof AggregateBusinessUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBusinessUser[P]>
      : GetScalarType<T[P], AggregateBusinessUser[P]>
  }




  export type BusinessUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BusinessUserWhereInput
    orderBy?: BusinessUserOrderByWithAggregationInput | BusinessUserOrderByWithAggregationInput[]
    by: BusinessUserScalarFieldEnum[] | BusinessUserScalarFieldEnum
    having?: BusinessUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessUserCountAggregateInputType | true
    _min?: BusinessUserMinAggregateInputType
    _max?: BusinessUserMaxAggregateInputType
  }

  export type BusinessUserGroupByOutputType = {
    id: string
    userId: string
    businessId: string
    role: $Enums.BusinessRole
    status: $Enums.MemberStatus
    createdAt: Date
    _count: BusinessUserCountAggregateOutputType | null
    _min: BusinessUserMinAggregateOutputType | null
    _max: BusinessUserMaxAggregateOutputType | null
  }

  type GetBusinessUserGroupByPayload<T extends BusinessUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BusinessUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BusinessUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BusinessUserGroupByOutputType[P]>
            : GetScalarType<T[P], BusinessUserGroupByOutputType[P]>
        }
      >
    >


  export type BusinessUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessId?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessUser"]>

  export type BusinessUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessId?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessUser"]>

  export type BusinessUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessId?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["businessUser"]>

  export type BusinessUserSelectScalar = {
    id?: boolean
    userId?: boolean
    businessId?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type BusinessUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "businessId" | "role" | "status" | "createdAt", ExtArgs["result"]["businessUser"]>
  export type BusinessUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type BusinessUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }
  export type BusinessUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    business?: boolean | BusinessDefaultArgs<ExtArgs>
  }

  export type $BusinessUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BusinessUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      business: Prisma.$BusinessPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      businessId: string
      role: $Enums.BusinessRole
      status: $Enums.MemberStatus
      createdAt: Date
    }, ExtArgs["result"]["businessUser"]>
    composites: {}
  }

  type BusinessUserGetPayload<S extends boolean | null | undefined | BusinessUserDefaultArgs> = $Result.GetResult<Prisma.$BusinessUserPayload, S>

  type BusinessUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BusinessUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BusinessUserCountAggregateInputType | true
    }

  export interface BusinessUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BusinessUser'], meta: { name: 'BusinessUser' } }
    /**
     * Find zero or one BusinessUser that matches the filter.
     * @param {BusinessUserFindUniqueArgs} args - Arguments to find a BusinessUser
     * @example
     * // Get one BusinessUser
     * const businessUser = await prisma.businessUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BusinessUserFindUniqueArgs>(args: SelectSubset<T, BusinessUserFindUniqueArgs<ExtArgs>>): Prisma__BusinessUserClient<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BusinessUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BusinessUserFindUniqueOrThrowArgs} args - Arguments to find a BusinessUser
     * @example
     * // Get one BusinessUser
     * const businessUser = await prisma.businessUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BusinessUserFindUniqueOrThrowArgs>(args: SelectSubset<T, BusinessUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BusinessUserClient<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUserFindFirstArgs} args - Arguments to find a BusinessUser
     * @example
     * // Get one BusinessUser
     * const businessUser = await prisma.businessUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BusinessUserFindFirstArgs>(args?: SelectSubset<T, BusinessUserFindFirstArgs<ExtArgs>>): Prisma__BusinessUserClient<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BusinessUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUserFindFirstOrThrowArgs} args - Arguments to find a BusinessUser
     * @example
     * // Get one BusinessUser
     * const businessUser = await prisma.businessUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BusinessUserFindFirstOrThrowArgs>(args?: SelectSubset<T, BusinessUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__BusinessUserClient<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BusinessUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessUsers
     * const businessUsers = await prisma.businessUser.findMany()
     * 
     * // Get first 10 BusinessUsers
     * const businessUsers = await prisma.businessUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessUserWithIdOnly = await prisma.businessUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BusinessUserFindManyArgs>(args?: SelectSubset<T, BusinessUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BusinessUser.
     * @param {BusinessUserCreateArgs} args - Arguments to create a BusinessUser.
     * @example
     * // Create one BusinessUser
     * const BusinessUser = await prisma.businessUser.create({
     *   data: {
     *     // ... data to create a BusinessUser
     *   }
     * })
     * 
     */
    create<T extends BusinessUserCreateArgs>(args: SelectSubset<T, BusinessUserCreateArgs<ExtArgs>>): Prisma__BusinessUserClient<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BusinessUsers.
     * @param {BusinessUserCreateManyArgs} args - Arguments to create many BusinessUsers.
     * @example
     * // Create many BusinessUsers
     * const businessUser = await prisma.businessUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BusinessUserCreateManyArgs>(args?: SelectSubset<T, BusinessUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BusinessUsers and returns the data saved in the database.
     * @param {BusinessUserCreateManyAndReturnArgs} args - Arguments to create many BusinessUsers.
     * @example
     * // Create many BusinessUsers
     * const businessUser = await prisma.businessUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BusinessUsers and only return the `id`
     * const businessUserWithIdOnly = await prisma.businessUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BusinessUserCreateManyAndReturnArgs>(args?: SelectSubset<T, BusinessUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BusinessUser.
     * @param {BusinessUserDeleteArgs} args - Arguments to delete one BusinessUser.
     * @example
     * // Delete one BusinessUser
     * const BusinessUser = await prisma.businessUser.delete({
     *   where: {
     *     // ... filter to delete one BusinessUser
     *   }
     * })
     * 
     */
    delete<T extends BusinessUserDeleteArgs>(args: SelectSubset<T, BusinessUserDeleteArgs<ExtArgs>>): Prisma__BusinessUserClient<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BusinessUser.
     * @param {BusinessUserUpdateArgs} args - Arguments to update one BusinessUser.
     * @example
     * // Update one BusinessUser
     * const businessUser = await prisma.businessUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BusinessUserUpdateArgs>(args: SelectSubset<T, BusinessUserUpdateArgs<ExtArgs>>): Prisma__BusinessUserClient<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BusinessUsers.
     * @param {BusinessUserDeleteManyArgs} args - Arguments to filter BusinessUsers to delete.
     * @example
     * // Delete a few BusinessUsers
     * const { count } = await prisma.businessUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BusinessUserDeleteManyArgs>(args?: SelectSubset<T, BusinessUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessUsers
     * const businessUser = await prisma.businessUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BusinessUserUpdateManyArgs>(args: SelectSubset<T, BusinessUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessUsers and returns the data updated in the database.
     * @param {BusinessUserUpdateManyAndReturnArgs} args - Arguments to update many BusinessUsers.
     * @example
     * // Update many BusinessUsers
     * const businessUser = await prisma.businessUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BusinessUsers and only return the `id`
     * const businessUserWithIdOnly = await prisma.businessUser.updateManyAndReturn({
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
    updateManyAndReturn<T extends BusinessUserUpdateManyAndReturnArgs>(args: SelectSubset<T, BusinessUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BusinessUser.
     * @param {BusinessUserUpsertArgs} args - Arguments to update or create a BusinessUser.
     * @example
     * // Update or create a BusinessUser
     * const businessUser = await prisma.businessUser.upsert({
     *   create: {
     *     // ... data to create a BusinessUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessUser we want to update
     *   }
     * })
     */
    upsert<T extends BusinessUserUpsertArgs>(args: SelectSubset<T, BusinessUserUpsertArgs<ExtArgs>>): Prisma__BusinessUserClient<$Result.GetResult<Prisma.$BusinessUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BusinessUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUserCountArgs} args - Arguments to filter BusinessUsers to count.
     * @example
     * // Count the number of BusinessUsers
     * const count = await prisma.businessUser.count({
     *   where: {
     *     // ... the filter for the BusinessUsers we want to count
     *   }
     * })
    **/
    count<T extends BusinessUserCountArgs>(
      args?: Subset<T, BusinessUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BusinessUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BusinessUserAggregateArgs>(args: Subset<T, BusinessUserAggregateArgs>): Prisma.PrismaPromise<GetBusinessUserAggregateType<T>>

    /**
     * Group by BusinessUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessUserGroupByArgs} args - Group by arguments.
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
      T extends BusinessUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BusinessUserGroupByArgs['orderBy'] }
        : { orderBy?: BusinessUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BusinessUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BusinessUser model
   */
  readonly fields: BusinessUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BusinessUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    business<T extends BusinessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BusinessDefaultArgs<ExtArgs>>): Prisma__BusinessClient<$Result.GetResult<Prisma.$BusinessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BusinessUser model
   */
  interface BusinessUserFieldRefs {
    readonly id: FieldRef<"BusinessUser", 'String'>
    readonly userId: FieldRef<"BusinessUser", 'String'>
    readonly businessId: FieldRef<"BusinessUser", 'String'>
    readonly role: FieldRef<"BusinessUser", 'BusinessRole'>
    readonly status: FieldRef<"BusinessUser", 'MemberStatus'>
    readonly createdAt: FieldRef<"BusinessUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BusinessUser findUnique
   */
  export type BusinessUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUser to fetch.
     */
    where: BusinessUserWhereUniqueInput
  }

  /**
   * BusinessUser findUniqueOrThrow
   */
  export type BusinessUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUser to fetch.
     */
    where: BusinessUserWhereUniqueInput
  }

  /**
   * BusinessUser findFirst
   */
  export type BusinessUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUser to fetch.
     */
    where?: BusinessUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUsers to fetch.
     */
    orderBy?: BusinessUserOrderByWithRelationInput | BusinessUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessUsers.
     */
    cursor?: BusinessUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessUsers.
     */
    distinct?: BusinessUserScalarFieldEnum | BusinessUserScalarFieldEnum[]
  }

  /**
   * BusinessUser findFirstOrThrow
   */
  export type BusinessUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUser to fetch.
     */
    where?: BusinessUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUsers to fetch.
     */
    orderBy?: BusinessUserOrderByWithRelationInput | BusinessUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessUsers.
     */
    cursor?: BusinessUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessUsers.
     */
    distinct?: BusinessUserScalarFieldEnum | BusinessUserScalarFieldEnum[]
  }

  /**
   * BusinessUser findMany
   */
  export type BusinessUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * Filter, which BusinessUsers to fetch.
     */
    where?: BusinessUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessUsers to fetch.
     */
    orderBy?: BusinessUserOrderByWithRelationInput | BusinessUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessUsers.
     */
    cursor?: BusinessUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessUsers.
     */
    skip?: number
    distinct?: BusinessUserScalarFieldEnum | BusinessUserScalarFieldEnum[]
  }

  /**
   * BusinessUser create
   */
  export type BusinessUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * The data needed to create a BusinessUser.
     */
    data: XOR<BusinessUserCreateInput, BusinessUserUncheckedCreateInput>
  }

  /**
   * BusinessUser createMany
   */
  export type BusinessUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BusinessUsers.
     */
    data: BusinessUserCreateManyInput | BusinessUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BusinessUser createManyAndReturn
   */
  export type BusinessUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * The data used to create many BusinessUsers.
     */
    data: BusinessUserCreateManyInput | BusinessUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusinessUser update
   */
  export type BusinessUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * The data needed to update a BusinessUser.
     */
    data: XOR<BusinessUserUpdateInput, BusinessUserUncheckedUpdateInput>
    /**
     * Choose, which BusinessUser to update.
     */
    where: BusinessUserWhereUniqueInput
  }

  /**
   * BusinessUser updateMany
   */
  export type BusinessUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BusinessUsers.
     */
    data: XOR<BusinessUserUpdateManyMutationInput, BusinessUserUncheckedUpdateManyInput>
    /**
     * Filter which BusinessUsers to update
     */
    where?: BusinessUserWhereInput
    /**
     * Limit how many BusinessUsers to update.
     */
    limit?: number
  }

  /**
   * BusinessUser updateManyAndReturn
   */
  export type BusinessUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * The data used to update BusinessUsers.
     */
    data: XOR<BusinessUserUpdateManyMutationInput, BusinessUserUncheckedUpdateManyInput>
    /**
     * Filter which BusinessUsers to update
     */
    where?: BusinessUserWhereInput
    /**
     * Limit how many BusinessUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BusinessUser upsert
   */
  export type BusinessUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * The filter to search for the BusinessUser to update in case it exists.
     */
    where: BusinessUserWhereUniqueInput
    /**
     * In case the BusinessUser found by the `where` argument doesn't exist, create a new BusinessUser with this data.
     */
    create: XOR<BusinessUserCreateInput, BusinessUserUncheckedCreateInput>
    /**
     * In case the BusinessUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BusinessUserUpdateInput, BusinessUserUncheckedUpdateInput>
  }

  /**
   * BusinessUser delete
   */
  export type BusinessUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
    /**
     * Filter which BusinessUser to delete.
     */
    where: BusinessUserWhereUniqueInput
  }

  /**
   * BusinessUser deleteMany
   */
  export type BusinessUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BusinessUsers to delete
     */
    where?: BusinessUserWhereInput
    /**
     * Limit how many BusinessUsers to delete.
     */
    limit?: number
  }

  /**
   * BusinessUser without action
   */
  export type BusinessUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BusinessUser
     */
    select?: BusinessUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BusinessUser
     */
    omit?: BusinessUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BusinessUserInclude<ExtArgs> | null
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
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    isVerified: 'isVerified',
    isActive: 'isActive',
    isDeleted: 'isDeleted',
    avatar: 'avatar',
    phone: 'phone',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AuthProviderScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    providerId: 'providerId',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type AuthProviderScalarFieldEnum = (typeof AuthProviderScalarFieldEnum)[keyof typeof AuthProviderScalarFieldEnum]


  export const BusinessScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    email: 'email',
    phone: 'phone',
    address: 'address',
    website: 'website',
    isDeleted: 'isDeleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BusinessScalarFieldEnum = (typeof BusinessScalarFieldEnum)[keyof typeof BusinessScalarFieldEnum]


  export const BusinessUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    businessId: 'businessId',
    role: 'role',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type BusinessUserScalarFieldEnum = (typeof BusinessUserScalarFieldEnum)[keyof typeof BusinessUserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'IsActive'
   */
  export type EnumIsActiveFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IsActive'>
    


  /**
   * Reference to a field of type 'IsActive[]'
   */
  export type ListEnumIsActiveFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'IsActive[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Provider'
   */
  export type EnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider'>
    


  /**
   * Reference to a field of type 'Provider[]'
   */
  export type ListEnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider[]'>
    


  /**
   * Reference to a field of type 'BusinessCategory'
   */
  export type EnumBusinessCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessCategory'>
    


  /**
   * Reference to a field of type 'BusinessCategory[]'
   */
  export type ListEnumBusinessCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessCategory[]'>
    


  /**
   * Reference to a field of type 'BusinessRole'
   */
  export type EnumBusinessRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessRole'>
    


  /**
   * Reference to a field of type 'BusinessRole[]'
   */
  export type ListEnumBusinessRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BusinessRole[]'>
    


  /**
   * Reference to a field of type 'MemberStatus'
   */
  export type EnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberStatus'>
    


  /**
   * Reference to a field of type 'MemberStatus[]'
   */
  export type ListEnumMemberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: EnumIsActiveFilter<"User"> | $Enums.IsActive
    isDeleted?: BoolFilter<"User"> | boolean
    avatar?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    auths?: AuthProviderListRelationFilter
    businessUsers?: BusinessUserListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    isDeleted?: SortOrder
    avatar?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    auths?: AuthProviderOrderByRelationAggregateInput
    businessUsers?: BusinessUserOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: EnumIsActiveFilter<"User"> | $Enums.IsActive
    isDeleted?: BoolFilter<"User"> | boolean
    avatar?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    auths?: AuthProviderListRelationFilter
    businessUsers?: BusinessUserListRelationFilter
  }, "id" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    isDeleted?: SortOrder
    avatar?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: EnumIsActiveWithAggregatesFilter<"User"> | $Enums.IsActive
    isDeleted?: BoolWithAggregatesFilter<"User"> | boolean
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AuthProviderWhereInput = {
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[]
    OR?: AuthProviderWhereInput[]
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[]
    id?: StringFilter<"AuthProvider"> | string
    provider?: EnumProviderFilter<"AuthProvider"> | $Enums.Provider
    providerId?: StringFilter<"AuthProvider"> | string
    userId?: StringFilter<"AuthProvider"> | string
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuthProviderOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuthProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerId?: AuthProviderProviderProviderIdCompoundUniqueInput
    AND?: AuthProviderWhereInput | AuthProviderWhereInput[]
    OR?: AuthProviderWhereInput[]
    NOT?: AuthProviderWhereInput | AuthProviderWhereInput[]
    provider?: EnumProviderFilter<"AuthProvider"> | $Enums.Provider
    providerId?: StringFilter<"AuthProvider"> | string
    userId?: StringFilter<"AuthProvider"> | string
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerId">

  export type AuthProviderOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: AuthProviderCountOrderByAggregateInput
    _max?: AuthProviderMaxOrderByAggregateInput
    _min?: AuthProviderMinOrderByAggregateInput
  }

  export type AuthProviderScalarWhereWithAggregatesInput = {
    AND?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[]
    OR?: AuthProviderScalarWhereWithAggregatesInput[]
    NOT?: AuthProviderScalarWhereWithAggregatesInput | AuthProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthProvider"> | string
    provider?: EnumProviderWithAggregatesFilter<"AuthProvider"> | $Enums.Provider
    providerId?: StringWithAggregatesFilter<"AuthProvider"> | string
    userId?: StringWithAggregatesFilter<"AuthProvider"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuthProvider"> | Date | string
  }

  export type BusinessWhereInput = {
    AND?: BusinessWhereInput | BusinessWhereInput[]
    OR?: BusinessWhereInput[]
    NOT?: BusinessWhereInput | BusinessWhereInput[]
    id?: StringFilter<"Business"> | string
    name?: StringFilter<"Business"> | string
    category?: EnumBusinessCategoryFilter<"Business"> | $Enums.BusinessCategory
    email?: StringNullableFilter<"Business"> | string | null
    phone?: StringNullableFilter<"Business"> | string | null
    address?: StringNullableFilter<"Business"> | string | null
    website?: StringNullableFilter<"Business"> | string | null
    isDeleted?: BoolFilter<"Business"> | boolean
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
    members?: BusinessUserListRelationFilter
  }

  export type BusinessOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    members?: BusinessUserOrderByRelationAggregateInput
  }

  export type BusinessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BusinessWhereInput | BusinessWhereInput[]
    OR?: BusinessWhereInput[]
    NOT?: BusinessWhereInput | BusinessWhereInput[]
    name?: StringFilter<"Business"> | string
    category?: EnumBusinessCategoryFilter<"Business"> | $Enums.BusinessCategory
    email?: StringNullableFilter<"Business"> | string | null
    phone?: StringNullableFilter<"Business"> | string | null
    address?: StringNullableFilter<"Business"> | string | null
    website?: StringNullableFilter<"Business"> | string | null
    isDeleted?: BoolFilter<"Business"> | boolean
    createdAt?: DateTimeFilter<"Business"> | Date | string
    updatedAt?: DateTimeFilter<"Business"> | Date | string
    members?: BusinessUserListRelationFilter
  }, "id">

  export type BusinessOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BusinessCountOrderByAggregateInput
    _max?: BusinessMaxOrderByAggregateInput
    _min?: BusinessMinOrderByAggregateInput
  }

  export type BusinessScalarWhereWithAggregatesInput = {
    AND?: BusinessScalarWhereWithAggregatesInput | BusinessScalarWhereWithAggregatesInput[]
    OR?: BusinessScalarWhereWithAggregatesInput[]
    NOT?: BusinessScalarWhereWithAggregatesInput | BusinessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Business"> | string
    name?: StringWithAggregatesFilter<"Business"> | string
    category?: EnumBusinessCategoryWithAggregatesFilter<"Business"> | $Enums.BusinessCategory
    email?: StringNullableWithAggregatesFilter<"Business"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Business"> | string | null
    address?: StringNullableWithAggregatesFilter<"Business"> | string | null
    website?: StringNullableWithAggregatesFilter<"Business"> | string | null
    isDeleted?: BoolWithAggregatesFilter<"Business"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Business"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Business"> | Date | string
  }

  export type BusinessUserWhereInput = {
    AND?: BusinessUserWhereInput | BusinessUserWhereInput[]
    OR?: BusinessUserWhereInput[]
    NOT?: BusinessUserWhereInput | BusinessUserWhereInput[]
    id?: StringFilter<"BusinessUser"> | string
    userId?: StringFilter<"BusinessUser"> | string
    businessId?: StringFilter<"BusinessUser"> | string
    role?: EnumBusinessRoleFilter<"BusinessUser"> | $Enums.BusinessRole
    status?: EnumMemberStatusFilter<"BusinessUser"> | $Enums.MemberStatus
    createdAt?: DateTimeFilter<"BusinessUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }

  export type BusinessUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    business?: BusinessOrderByWithRelationInput
  }

  export type BusinessUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_businessId?: BusinessUserUserIdBusinessIdCompoundUniqueInput
    AND?: BusinessUserWhereInput | BusinessUserWhereInput[]
    OR?: BusinessUserWhereInput[]
    NOT?: BusinessUserWhereInput | BusinessUserWhereInput[]
    userId?: StringFilter<"BusinessUser"> | string
    businessId?: StringFilter<"BusinessUser"> | string
    role?: EnumBusinessRoleFilter<"BusinessUser"> | $Enums.BusinessRole
    status?: EnumMemberStatusFilter<"BusinessUser"> | $Enums.MemberStatus
    createdAt?: DateTimeFilter<"BusinessUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    business?: XOR<BusinessScalarRelationFilter, BusinessWhereInput>
  }, "id" | "userId_businessId">

  export type BusinessUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: BusinessUserCountOrderByAggregateInput
    _max?: BusinessUserMaxOrderByAggregateInput
    _min?: BusinessUserMinOrderByAggregateInput
  }

  export type BusinessUserScalarWhereWithAggregatesInput = {
    AND?: BusinessUserScalarWhereWithAggregatesInput | BusinessUserScalarWhereWithAggregatesInput[]
    OR?: BusinessUserScalarWhereWithAggregatesInput[]
    NOT?: BusinessUserScalarWhereWithAggregatesInput | BusinessUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BusinessUser"> | string
    userId?: StringWithAggregatesFilter<"BusinessUser"> | string
    businessId?: StringWithAggregatesFilter<"BusinessUser"> | string
    role?: EnumBusinessRoleWithAggregatesFilter<"BusinessUser"> | $Enums.BusinessRole
    status?: EnumMemberStatusWithAggregatesFilter<"BusinessUser"> | $Enums.MemberStatus
    createdAt?: DateTimeWithAggregatesFilter<"BusinessUser"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    isVerified: boolean
    isActive?: $Enums.IsActive
    isDeleted?: boolean
    avatar?: string | null
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auths?: AuthProviderCreateNestedManyWithoutUserInput
    businessUsers?: BusinessUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    isVerified: boolean
    isActive?: $Enums.IsActive
    isDeleted?: boolean
    avatar?: string | null
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auths?: AuthProviderUncheckedCreateNestedManyWithoutUserInput
    businessUsers?: BusinessUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: EnumIsActiveFieldUpdateOperationsInput | $Enums.IsActive
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auths?: AuthProviderUpdateManyWithoutUserNestedInput
    businessUsers?: BusinessUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: EnumIsActiveFieldUpdateOperationsInput | $Enums.IsActive
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auths?: AuthProviderUncheckedUpdateManyWithoutUserNestedInput
    businessUsers?: BusinessUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    isVerified: boolean
    isActive?: $Enums.IsActive
    isDeleted?: boolean
    avatar?: string | null
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: EnumIsActiveFieldUpdateOperationsInput | $Enums.IsActive
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: EnumIsActiveFieldUpdateOperationsInput | $Enums.IsActive
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderCreateInput = {
    id?: string
    provider: $Enums.Provider
    providerId: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAuthsInput
  }

  export type AuthProviderUncheckedCreateInput = {
    id?: string
    provider: $Enums.Provider
    providerId: string
    userId: string
    createdAt?: Date | string
  }

  export type AuthProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuthsNestedInput
  }

  export type AuthProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderCreateManyInput = {
    id?: string
    provider: $Enums.Provider
    providerId: string
    userId: string
    createdAt?: Date | string
  }

  export type AuthProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessCreateInput = {
    id?: string
    name: string
    category: $Enums.BusinessCategory
    email?: string | null
    phone?: string | null
    address?: string | null
    website?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: BusinessUserCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUncheckedCreateInput = {
    id?: string
    name: string
    category: $Enums.BusinessCategory
    email?: string | null
    phone?: string | null
    address?: string | null
    website?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: BusinessUserUncheckedCreateNestedManyWithoutBusinessInput
  }

  export type BusinessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumBusinessCategoryFieldUpdateOperationsInput | $Enums.BusinessCategory
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: BusinessUserUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumBusinessCategoryFieldUpdateOperationsInput | $Enums.BusinessCategory
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: BusinessUserUncheckedUpdateManyWithoutBusinessNestedInput
  }

  export type BusinessCreateManyInput = {
    id?: string
    name: string
    category: $Enums.BusinessCategory
    email?: string | null
    phone?: string | null
    address?: string | null
    website?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumBusinessCategoryFieldUpdateOperationsInput | $Enums.BusinessCategory
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumBusinessCategoryFieldUpdateOperationsInput | $Enums.BusinessCategory
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUserCreateInput = {
    id?: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBusinessUsersInput
    business: BusinessCreateNestedOneWithoutMembersInput
  }

  export type BusinessUserUncheckedCreateInput = {
    id?: string
    userId: string
    businessId: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
  }

  export type BusinessUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBusinessUsersNestedInput
    business?: BusinessUpdateOneRequiredWithoutMembersNestedInput
  }

  export type BusinessUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUserCreateManyInput = {
    id?: string
    userId: string
    businessId: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
  }

  export type BusinessUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumIsActiveFilter<$PrismaModel = never> = {
    equals?: $Enums.IsActive | EnumIsActiveFieldRefInput<$PrismaModel>
    in?: $Enums.IsActive[] | ListEnumIsActiveFieldRefInput<$PrismaModel>
    notIn?: $Enums.IsActive[] | ListEnumIsActiveFieldRefInput<$PrismaModel>
    not?: NestedEnumIsActiveFilter<$PrismaModel> | $Enums.IsActive
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

  export type AuthProviderListRelationFilter = {
    every?: AuthProviderWhereInput
    some?: AuthProviderWhereInput
    none?: AuthProviderWhereInput
  }

  export type BusinessUserListRelationFilter = {
    every?: BusinessUserWhereInput
    some?: BusinessUserWhereInput
    none?: BusinessUserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthProviderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BusinessUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    isDeleted?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    isDeleted?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    isDeleted?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumIsActiveWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IsActive | EnumIsActiveFieldRefInput<$PrismaModel>
    in?: $Enums.IsActive[] | ListEnumIsActiveFieldRefInput<$PrismaModel>
    notIn?: $Enums.IsActive[] | ListEnumIsActiveFieldRefInput<$PrismaModel>
    not?: NestedEnumIsActiveWithAggregatesFilter<$PrismaModel> | $Enums.IsActive
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIsActiveFilter<$PrismaModel>
    _max?: NestedEnumIsActiveFilter<$PrismaModel>
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

  export type EnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AuthProviderProviderProviderIdCompoundUniqueInput = {
    provider: $Enums.Provider
    providerId: string
  }

  export type AuthProviderCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthProviderMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type EnumBusinessCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessCategory | EnumBusinessCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessCategory[] | ListEnumBusinessCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessCategory[] | ListEnumBusinessCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessCategoryFilter<$PrismaModel> | $Enums.BusinessCategory
  }

  export type BusinessCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    website?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    website?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BusinessMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    website?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumBusinessCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessCategory | EnumBusinessCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessCategory[] | ListEnumBusinessCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessCategory[] | ListEnumBusinessCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessCategoryWithAggregatesFilter<$PrismaModel> | $Enums.BusinessCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessCategoryFilter<$PrismaModel>
    _max?: NestedEnumBusinessCategoryFilter<$PrismaModel>
  }

  export type EnumBusinessRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessRole | EnumBusinessRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessRoleFilter<$PrismaModel> | $Enums.BusinessRole
  }

  export type EnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus
  }

  export type BusinessScalarRelationFilter = {
    is?: BusinessWhereInput
    isNot?: BusinessWhereInput
  }

  export type BusinessUserUserIdBusinessIdCompoundUniqueInput = {
    userId: string
    businessId: string
  }

  export type BusinessUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type BusinessUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type BusinessUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessId?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumBusinessRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessRole | EnumBusinessRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessRoleWithAggregatesFilter<$PrismaModel> | $Enums.BusinessRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessRoleFilter<$PrismaModel>
    _max?: NestedEnumBusinessRoleFilter<$PrismaModel>
  }

  export type EnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.MemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>
  }

  export type AuthProviderCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput> | AuthProviderCreateWithoutUserInput[] | AuthProviderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthProviderCreateOrConnectWithoutUserInput | AuthProviderCreateOrConnectWithoutUserInput[]
    createMany?: AuthProviderCreateManyUserInputEnvelope
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
  }

  export type BusinessUserCreateNestedManyWithoutUserInput = {
    create?: XOR<BusinessUserCreateWithoutUserInput, BusinessUserUncheckedCreateWithoutUserInput> | BusinessUserCreateWithoutUserInput[] | BusinessUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BusinessUserCreateOrConnectWithoutUserInput | BusinessUserCreateOrConnectWithoutUserInput[]
    createMany?: BusinessUserCreateManyUserInputEnvelope
    connect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
  }

  export type AuthProviderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput> | AuthProviderCreateWithoutUserInput[] | AuthProviderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthProviderCreateOrConnectWithoutUserInput | AuthProviderCreateOrConnectWithoutUserInput[]
    createMany?: AuthProviderCreateManyUserInputEnvelope
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
  }

  export type BusinessUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BusinessUserCreateWithoutUserInput, BusinessUserUncheckedCreateWithoutUserInput> | BusinessUserCreateWithoutUserInput[] | BusinessUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BusinessUserCreateOrConnectWithoutUserInput | BusinessUserCreateOrConnectWithoutUserInput[]
    createMany?: BusinessUserCreateManyUserInputEnvelope
    connect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumIsActiveFieldUpdateOperationsInput = {
    set?: $Enums.IsActive
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthProviderUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput> | AuthProviderCreateWithoutUserInput[] | AuthProviderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthProviderCreateOrConnectWithoutUserInput | AuthProviderCreateOrConnectWithoutUserInput[]
    upsert?: AuthProviderUpsertWithWhereUniqueWithoutUserInput | AuthProviderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthProviderCreateManyUserInputEnvelope
    set?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    disconnect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    delete?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    update?: AuthProviderUpdateWithWhereUniqueWithoutUserInput | AuthProviderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthProviderUpdateManyWithWhereWithoutUserInput | AuthProviderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[]
  }

  export type BusinessUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<BusinessUserCreateWithoutUserInput, BusinessUserUncheckedCreateWithoutUserInput> | BusinessUserCreateWithoutUserInput[] | BusinessUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BusinessUserCreateOrConnectWithoutUserInput | BusinessUserCreateOrConnectWithoutUserInput[]
    upsert?: BusinessUserUpsertWithWhereUniqueWithoutUserInput | BusinessUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BusinessUserCreateManyUserInputEnvelope
    set?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    disconnect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    delete?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    connect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    update?: BusinessUserUpdateWithWhereUniqueWithoutUserInput | BusinessUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BusinessUserUpdateManyWithWhereWithoutUserInput | BusinessUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BusinessUserScalarWhereInput | BusinessUserScalarWhereInput[]
  }

  export type AuthProviderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput> | AuthProviderCreateWithoutUserInput[] | AuthProviderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthProviderCreateOrConnectWithoutUserInput | AuthProviderCreateOrConnectWithoutUserInput[]
    upsert?: AuthProviderUpsertWithWhereUniqueWithoutUserInput | AuthProviderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthProviderCreateManyUserInputEnvelope
    set?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    disconnect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    delete?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    connect?: AuthProviderWhereUniqueInput | AuthProviderWhereUniqueInput[]
    update?: AuthProviderUpdateWithWhereUniqueWithoutUserInput | AuthProviderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthProviderUpdateManyWithWhereWithoutUserInput | AuthProviderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[]
  }

  export type BusinessUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BusinessUserCreateWithoutUserInput, BusinessUserUncheckedCreateWithoutUserInput> | BusinessUserCreateWithoutUserInput[] | BusinessUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BusinessUserCreateOrConnectWithoutUserInput | BusinessUserCreateOrConnectWithoutUserInput[]
    upsert?: BusinessUserUpsertWithWhereUniqueWithoutUserInput | BusinessUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BusinessUserCreateManyUserInputEnvelope
    set?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    disconnect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    delete?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    connect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    update?: BusinessUserUpdateWithWhereUniqueWithoutUserInput | BusinessUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BusinessUserUpdateManyWithWhereWithoutUserInput | BusinessUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BusinessUserScalarWhereInput | BusinessUserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAuthsInput = {
    create?: XOR<UserCreateWithoutAuthsInput, UserUncheckedCreateWithoutAuthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: $Enums.Provider
  }

  export type UserUpdateOneRequiredWithoutAuthsNestedInput = {
    create?: XOR<UserCreateWithoutAuthsInput, UserUncheckedCreateWithoutAuthsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthsInput
    upsert?: UserUpsertWithoutAuthsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthsInput, UserUpdateWithoutAuthsInput>, UserUncheckedUpdateWithoutAuthsInput>
  }

  export type BusinessUserCreateNestedManyWithoutBusinessInput = {
    create?: XOR<BusinessUserCreateWithoutBusinessInput, BusinessUserUncheckedCreateWithoutBusinessInput> | BusinessUserCreateWithoutBusinessInput[] | BusinessUserUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: BusinessUserCreateOrConnectWithoutBusinessInput | BusinessUserCreateOrConnectWithoutBusinessInput[]
    createMany?: BusinessUserCreateManyBusinessInputEnvelope
    connect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
  }

  export type BusinessUserUncheckedCreateNestedManyWithoutBusinessInput = {
    create?: XOR<BusinessUserCreateWithoutBusinessInput, BusinessUserUncheckedCreateWithoutBusinessInput> | BusinessUserCreateWithoutBusinessInput[] | BusinessUserUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: BusinessUserCreateOrConnectWithoutBusinessInput | BusinessUserCreateOrConnectWithoutBusinessInput[]
    createMany?: BusinessUserCreateManyBusinessInputEnvelope
    connect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
  }

  export type EnumBusinessCategoryFieldUpdateOperationsInput = {
    set?: $Enums.BusinessCategory
  }

  export type BusinessUserUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<BusinessUserCreateWithoutBusinessInput, BusinessUserUncheckedCreateWithoutBusinessInput> | BusinessUserCreateWithoutBusinessInput[] | BusinessUserUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: BusinessUserCreateOrConnectWithoutBusinessInput | BusinessUserCreateOrConnectWithoutBusinessInput[]
    upsert?: BusinessUserUpsertWithWhereUniqueWithoutBusinessInput | BusinessUserUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: BusinessUserCreateManyBusinessInputEnvelope
    set?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    disconnect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    delete?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    connect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    update?: BusinessUserUpdateWithWhereUniqueWithoutBusinessInput | BusinessUserUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: BusinessUserUpdateManyWithWhereWithoutBusinessInput | BusinessUserUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: BusinessUserScalarWhereInput | BusinessUserScalarWhereInput[]
  }

  export type BusinessUserUncheckedUpdateManyWithoutBusinessNestedInput = {
    create?: XOR<BusinessUserCreateWithoutBusinessInput, BusinessUserUncheckedCreateWithoutBusinessInput> | BusinessUserCreateWithoutBusinessInput[] | BusinessUserUncheckedCreateWithoutBusinessInput[]
    connectOrCreate?: BusinessUserCreateOrConnectWithoutBusinessInput | BusinessUserCreateOrConnectWithoutBusinessInput[]
    upsert?: BusinessUserUpsertWithWhereUniqueWithoutBusinessInput | BusinessUserUpsertWithWhereUniqueWithoutBusinessInput[]
    createMany?: BusinessUserCreateManyBusinessInputEnvelope
    set?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    disconnect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    delete?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    connect?: BusinessUserWhereUniqueInput | BusinessUserWhereUniqueInput[]
    update?: BusinessUserUpdateWithWhereUniqueWithoutBusinessInput | BusinessUserUpdateWithWhereUniqueWithoutBusinessInput[]
    updateMany?: BusinessUserUpdateManyWithWhereWithoutBusinessInput | BusinessUserUpdateManyWithWhereWithoutBusinessInput[]
    deleteMany?: BusinessUserScalarWhereInput | BusinessUserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBusinessUsersInput = {
    create?: XOR<UserCreateWithoutBusinessUsersInput, UserUncheckedCreateWithoutBusinessUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBusinessUsersInput
    connect?: UserWhereUniqueInput
  }

  export type BusinessCreateNestedOneWithoutMembersInput = {
    create?: XOR<BusinessCreateWithoutMembersInput, BusinessUncheckedCreateWithoutMembersInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutMembersInput
    connect?: BusinessWhereUniqueInput
  }

  export type EnumBusinessRoleFieldUpdateOperationsInput = {
    set?: $Enums.BusinessRole
  }

  export type EnumMemberStatusFieldUpdateOperationsInput = {
    set?: $Enums.MemberStatus
  }

  export type UserUpdateOneRequiredWithoutBusinessUsersNestedInput = {
    create?: XOR<UserCreateWithoutBusinessUsersInput, UserUncheckedCreateWithoutBusinessUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBusinessUsersInput
    upsert?: UserUpsertWithoutBusinessUsersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBusinessUsersInput, UserUpdateWithoutBusinessUsersInput>, UserUncheckedUpdateWithoutBusinessUsersInput>
  }

  export type BusinessUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<BusinessCreateWithoutMembersInput, BusinessUncheckedCreateWithoutMembersInput>
    connectOrCreate?: BusinessCreateOrConnectWithoutMembersInput
    upsert?: BusinessUpsertWithoutMembersInput
    connect?: BusinessWhereUniqueInput
    update?: XOR<XOR<BusinessUpdateToOneWithWhereWithoutMembersInput, BusinessUpdateWithoutMembersInput>, BusinessUncheckedUpdateWithoutMembersInput>
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumIsActiveFilter<$PrismaModel = never> = {
    equals?: $Enums.IsActive | EnumIsActiveFieldRefInput<$PrismaModel>
    in?: $Enums.IsActive[] | ListEnumIsActiveFieldRefInput<$PrismaModel>
    notIn?: $Enums.IsActive[] | ListEnumIsActiveFieldRefInput<$PrismaModel>
    not?: NestedEnumIsActiveFilter<$PrismaModel> | $Enums.IsActive
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumIsActiveWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.IsActive | EnumIsActiveFieldRefInput<$PrismaModel>
    in?: $Enums.IsActive[] | ListEnumIsActiveFieldRefInput<$PrismaModel>
    notIn?: $Enums.IsActive[] | ListEnumIsActiveFieldRefInput<$PrismaModel>
    not?: NestedEnumIsActiveWithAggregatesFilter<$PrismaModel> | $Enums.IsActive
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumIsActiveFilter<$PrismaModel>
    _max?: NestedEnumIsActiveFilter<$PrismaModel>
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

  export type NestedEnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type NestedEnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type NestedEnumBusinessCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessCategory | EnumBusinessCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessCategory[] | ListEnumBusinessCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessCategory[] | ListEnumBusinessCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessCategoryFilter<$PrismaModel> | $Enums.BusinessCategory
  }

  export type NestedEnumBusinessCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessCategory | EnumBusinessCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessCategory[] | ListEnumBusinessCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessCategory[] | ListEnumBusinessCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessCategoryWithAggregatesFilter<$PrismaModel> | $Enums.BusinessCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessCategoryFilter<$PrismaModel>
    _max?: NestedEnumBusinessCategoryFilter<$PrismaModel>
  }

  export type NestedEnumBusinessRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessRole | EnumBusinessRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessRoleFilter<$PrismaModel> | $Enums.BusinessRole
  }

  export type NestedEnumMemberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusFilter<$PrismaModel> | $Enums.MemberStatus
  }

  export type NestedEnumBusinessRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BusinessRole | EnumBusinessRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BusinessRole[] | ListEnumBusinessRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBusinessRoleWithAggregatesFilter<$PrismaModel> | $Enums.BusinessRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBusinessRoleFilter<$PrismaModel>
    _max?: NestedEnumBusinessRoleFilter<$PrismaModel>
  }

  export type NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberStatus | EnumMemberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberStatus[] | ListEnumMemberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberStatusWithAggregatesFilter<$PrismaModel> | $Enums.MemberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberStatusFilter<$PrismaModel>
    _max?: NestedEnumMemberStatusFilter<$PrismaModel>
  }

  export type AuthProviderCreateWithoutUserInput = {
    id?: string
    provider: $Enums.Provider
    providerId: string
    createdAt?: Date | string
  }

  export type AuthProviderUncheckedCreateWithoutUserInput = {
    id?: string
    provider: $Enums.Provider
    providerId: string
    createdAt?: Date | string
  }

  export type AuthProviderCreateOrConnectWithoutUserInput = {
    where: AuthProviderWhereUniqueInput
    create: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
  }

  export type AuthProviderCreateManyUserInputEnvelope = {
    data: AuthProviderCreateManyUserInput | AuthProviderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BusinessUserCreateWithoutUserInput = {
    id?: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    business: BusinessCreateNestedOneWithoutMembersInput
  }

  export type BusinessUserUncheckedCreateWithoutUserInput = {
    id?: string
    businessId: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
  }

  export type BusinessUserCreateOrConnectWithoutUserInput = {
    where: BusinessUserWhereUniqueInput
    create: XOR<BusinessUserCreateWithoutUserInput, BusinessUserUncheckedCreateWithoutUserInput>
  }

  export type BusinessUserCreateManyUserInputEnvelope = {
    data: BusinessUserCreateManyUserInput | BusinessUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthProviderUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthProviderWhereUniqueInput
    update: XOR<AuthProviderUpdateWithoutUserInput, AuthProviderUncheckedUpdateWithoutUserInput>
    create: XOR<AuthProviderCreateWithoutUserInput, AuthProviderUncheckedCreateWithoutUserInput>
  }

  export type AuthProviderUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthProviderWhereUniqueInput
    data: XOR<AuthProviderUpdateWithoutUserInput, AuthProviderUncheckedUpdateWithoutUserInput>
  }

  export type AuthProviderUpdateManyWithWhereWithoutUserInput = {
    where: AuthProviderScalarWhereInput
    data: XOR<AuthProviderUpdateManyMutationInput, AuthProviderUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthProviderScalarWhereInput = {
    AND?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[]
    OR?: AuthProviderScalarWhereInput[]
    NOT?: AuthProviderScalarWhereInput | AuthProviderScalarWhereInput[]
    id?: StringFilter<"AuthProvider"> | string
    provider?: EnumProviderFilter<"AuthProvider"> | $Enums.Provider
    providerId?: StringFilter<"AuthProvider"> | string
    userId?: StringFilter<"AuthProvider"> | string
    createdAt?: DateTimeFilter<"AuthProvider"> | Date | string
  }

  export type BusinessUserUpsertWithWhereUniqueWithoutUserInput = {
    where: BusinessUserWhereUniqueInput
    update: XOR<BusinessUserUpdateWithoutUserInput, BusinessUserUncheckedUpdateWithoutUserInput>
    create: XOR<BusinessUserCreateWithoutUserInput, BusinessUserUncheckedCreateWithoutUserInput>
  }

  export type BusinessUserUpdateWithWhereUniqueWithoutUserInput = {
    where: BusinessUserWhereUniqueInput
    data: XOR<BusinessUserUpdateWithoutUserInput, BusinessUserUncheckedUpdateWithoutUserInput>
  }

  export type BusinessUserUpdateManyWithWhereWithoutUserInput = {
    where: BusinessUserScalarWhereInput
    data: XOR<BusinessUserUpdateManyMutationInput, BusinessUserUncheckedUpdateManyWithoutUserInput>
  }

  export type BusinessUserScalarWhereInput = {
    AND?: BusinessUserScalarWhereInput | BusinessUserScalarWhereInput[]
    OR?: BusinessUserScalarWhereInput[]
    NOT?: BusinessUserScalarWhereInput | BusinessUserScalarWhereInput[]
    id?: StringFilter<"BusinessUser"> | string
    userId?: StringFilter<"BusinessUser"> | string
    businessId?: StringFilter<"BusinessUser"> | string
    role?: EnumBusinessRoleFilter<"BusinessUser"> | $Enums.BusinessRole
    status?: EnumMemberStatusFilter<"BusinessUser"> | $Enums.MemberStatus
    createdAt?: DateTimeFilter<"BusinessUser"> | Date | string
  }

  export type UserCreateWithoutAuthsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    isVerified: boolean
    isActive?: $Enums.IsActive
    isDeleted?: boolean
    avatar?: string | null
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessUsers?: BusinessUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    isVerified: boolean
    isActive?: $Enums.IsActive
    isDeleted?: boolean
    avatar?: string | null
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    businessUsers?: BusinessUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthsInput, UserUncheckedCreateWithoutAuthsInput>
  }

  export type UserUpsertWithoutAuthsInput = {
    update: XOR<UserUpdateWithoutAuthsInput, UserUncheckedUpdateWithoutAuthsInput>
    create: XOR<UserCreateWithoutAuthsInput, UserUncheckedCreateWithoutAuthsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthsInput, UserUncheckedUpdateWithoutAuthsInput>
  }

  export type UserUpdateWithoutAuthsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: EnumIsActiveFieldUpdateOperationsInput | $Enums.IsActive
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessUsers?: BusinessUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: EnumIsActiveFieldUpdateOperationsInput | $Enums.IsActive
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    businessUsers?: BusinessUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BusinessUserCreateWithoutBusinessInput = {
    id?: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBusinessUsersInput
  }

  export type BusinessUserUncheckedCreateWithoutBusinessInput = {
    id?: string
    userId: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
  }

  export type BusinessUserCreateOrConnectWithoutBusinessInput = {
    where: BusinessUserWhereUniqueInput
    create: XOR<BusinessUserCreateWithoutBusinessInput, BusinessUserUncheckedCreateWithoutBusinessInput>
  }

  export type BusinessUserCreateManyBusinessInputEnvelope = {
    data: BusinessUserCreateManyBusinessInput | BusinessUserCreateManyBusinessInput[]
    skipDuplicates?: boolean
  }

  export type BusinessUserUpsertWithWhereUniqueWithoutBusinessInput = {
    where: BusinessUserWhereUniqueInput
    update: XOR<BusinessUserUpdateWithoutBusinessInput, BusinessUserUncheckedUpdateWithoutBusinessInput>
    create: XOR<BusinessUserCreateWithoutBusinessInput, BusinessUserUncheckedCreateWithoutBusinessInput>
  }

  export type BusinessUserUpdateWithWhereUniqueWithoutBusinessInput = {
    where: BusinessUserWhereUniqueInput
    data: XOR<BusinessUserUpdateWithoutBusinessInput, BusinessUserUncheckedUpdateWithoutBusinessInput>
  }

  export type BusinessUserUpdateManyWithWhereWithoutBusinessInput = {
    where: BusinessUserScalarWhereInput
    data: XOR<BusinessUserUpdateManyMutationInput, BusinessUserUncheckedUpdateManyWithoutBusinessInput>
  }

  export type UserCreateWithoutBusinessUsersInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    isVerified: boolean
    isActive?: $Enums.IsActive
    isDeleted?: boolean
    avatar?: string | null
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auths?: AuthProviderCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBusinessUsersInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    isVerified: boolean
    isActive?: $Enums.IsActive
    isDeleted?: boolean
    avatar?: string | null
    phone?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    auths?: AuthProviderUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBusinessUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBusinessUsersInput, UserUncheckedCreateWithoutBusinessUsersInput>
  }

  export type BusinessCreateWithoutMembersInput = {
    id?: string
    name: string
    category: $Enums.BusinessCategory
    email?: string | null
    phone?: string | null
    address?: string | null
    website?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    category: $Enums.BusinessCategory
    email?: string | null
    phone?: string | null
    address?: string | null
    website?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BusinessCreateOrConnectWithoutMembersInput = {
    where: BusinessWhereUniqueInput
    create: XOR<BusinessCreateWithoutMembersInput, BusinessUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutBusinessUsersInput = {
    update: XOR<UserUpdateWithoutBusinessUsersInput, UserUncheckedUpdateWithoutBusinessUsersInput>
    create: XOR<UserCreateWithoutBusinessUsersInput, UserUncheckedCreateWithoutBusinessUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBusinessUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBusinessUsersInput, UserUncheckedUpdateWithoutBusinessUsersInput>
  }

  export type UserUpdateWithoutBusinessUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: EnumIsActiveFieldUpdateOperationsInput | $Enums.IsActive
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auths?: AuthProviderUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBusinessUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: EnumIsActiveFieldUpdateOperationsInput | $Enums.IsActive
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auths?: AuthProviderUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BusinessUpsertWithoutMembersInput = {
    update: XOR<BusinessUpdateWithoutMembersInput, BusinessUncheckedUpdateWithoutMembersInput>
    create: XOR<BusinessCreateWithoutMembersInput, BusinessUncheckedCreateWithoutMembersInput>
    where?: BusinessWhereInput
  }

  export type BusinessUpdateToOneWithWhereWithoutMembersInput = {
    where?: BusinessWhereInput
    data: XOR<BusinessUpdateWithoutMembersInput, BusinessUncheckedUpdateWithoutMembersInput>
  }

  export type BusinessUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumBusinessCategoryFieldUpdateOperationsInput | $Enums.BusinessCategory
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumBusinessCategoryFieldUpdateOperationsInput | $Enums.BusinessCategory
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderCreateManyUserInput = {
    id?: string
    provider: $Enums.Provider
    providerId: string
    createdAt?: Date | string
  }

  export type BusinessUserCreateManyUserInput = {
    id?: string
    businessId: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
  }

  export type AuthProviderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthProviderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    providerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    business?: BusinessUpdateOneRequiredWithoutMembersNestedInput
  }

  export type BusinessUserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    businessId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUserCreateManyBusinessInput = {
    id?: string
    userId: string
    role?: $Enums.BusinessRole
    status?: $Enums.MemberStatus
    createdAt?: Date | string
  }

  export type BusinessUserUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBusinessUsersNestedInput
  }

  export type BusinessUserUncheckedUpdateWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BusinessUserUncheckedUpdateManyWithoutBusinessInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumBusinessRoleFieldUpdateOperationsInput | $Enums.BusinessRole
    status?: EnumMemberStatusFieldUpdateOperationsInput | $Enums.MemberStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
import {
  Author,
  AuthorLike,
  AuthorSummary,
  Book,
  Popularity,
  SaveAuthorLikeResult,
  SaveAuthorResult,
} from "./graphql-types.generated";

const factories: Record<string, Function> = {};
export interface FactoryOptions {
  withCycles?: boolean;
}
type RequireTypename<T extends { __typename?: string }> = Omit<T, "__typename"> & Required<Pick<T, "__typename">>;
/**
 * Mirrors factory runtime behavior by requiring __typename on factory-created object results.
 *
 * GraphQL Codegen's base schema types correctly keep __typename optional because raw GraphQL
 * objects only include it when an operation selects it or a client adds it. Operation and
 * fragment result types can require __typename when it is selected. Factory results are a
 * separate case: these factories always assign __typename recursively at runtime, so their
 * public return type should expose that stronger shape without changing the base schema types.
 */
type FactoryResult<T> = T extends ReadonlyArray<infer U> ? Array<FactoryResult<U>> : T extends object
  // Rebuild the object instead of intersecting with T, so raw nested field types do not leak through arrays.
  // I.e. Author.books.pop() should return a Book with required __typename, not the raw schema Book.
  ? "__typename" extends keyof T
    ? Omit<{ [K in keyof T]: FactoryResult<T[K]> }, "__typename"> & {
      __typename: NonNullable<T extends { __typename?: infer N } ? N : never>;
    }
  : T
: T;

type FactoryInput<T, TOptions> = T | FactoryResult<T> | TOptions;
type FactoryCache = Record<string, any> & { active?: Set<object>; all?: Set<object>; withCycles?: boolean };
export interface AuthorOptions {
  __typename?: "Author";
  birthday?: Author["birthday"];
  name?: Author["name"];
  popularity?: Author["popularity"];
  summary?: FactoryInput<AuthorSummary, AuthorSummaryOptions>;
  working?: Author["working"];
}

export function newAuthor(options?: AuthorOptions, factoryOptions?: FactoryOptions): FactoryResult<Author>;
export function newAuthor(
  options: AuthorOptions = {},
  factoryOptions: FactoryOptions = {},
  cache: FactoryCache = newFactoryCache(factoryOptions),
): FactoryResult<Author> {
  const o = (options.__typename ? options : cache["Author"] = {}) as Author;
  (cache.all ??= new Set()).add(o);
  (cache.active ??= new Set()).add(o);
  try {
    o.__typename = "Author";
    o.birthday = options.birthday ?? null;
    o.name = options.name ?? "name";
    o.popularity = options.popularity ?? Popularity.High;
    o.summary = maybeNew("AuthorSummary", options.summary, cache, options.hasOwnProperty("summary"));
    o.working = options.working ?? null;
    return o as FactoryResult<Author>;
  } finally {
    cache.active?.delete(o);
  }
}

factories["Author"] = newAuthor;

export interface AuthorSummaryOptions {
  __typename?: "AuthorSummary";
  amountOfSales?: AuthorSummary["amountOfSales"];
  author?: FactoryInput<Author, AuthorOptions>;
  numberOfBooks?: AuthorSummary["numberOfBooks"];
}

export function newAuthorSummary(
  options?: AuthorSummaryOptions,
  factoryOptions?: FactoryOptions,
): FactoryResult<AuthorSummary>;
export function newAuthorSummary(
  options: AuthorSummaryOptions = {},
  factoryOptions: FactoryOptions = {},
  cache: FactoryCache = newFactoryCache(factoryOptions),
): FactoryResult<AuthorSummary> {
  const o = (options.__typename ? options : cache["AuthorSummary"] = {}) as AuthorSummary;
  (cache.all ??= new Set()).add(o);
  (cache.active ??= new Set()).add(o);
  try {
    o.__typename = "AuthorSummary";
    o.amountOfSales = options.amountOfSales ?? null;
    o.author = maybeNew("Author", options.author, cache, options.hasOwnProperty("author"));
    o.numberOfBooks = options.numberOfBooks ?? 0;
    return o as FactoryResult<AuthorSummary>;
  } finally {
    cache.active?.delete(o);
  }
}

factories["AuthorSummary"] = newAuthorSummary;

export interface BookOptions {
  __typename?: "Book";
  name?: Book["name"];
}

export function newBook(options?: BookOptions, factoryOptions?: FactoryOptions): FactoryResult<Book>;
export function newBook(
  options: BookOptions = {},
  factoryOptions: FactoryOptions = {},
  cache: FactoryCache = newFactoryCache(factoryOptions),
): FactoryResult<Book> {
  const o = (options.__typename ? options : cache["Book"] = {}) as Book;
  (cache.all ??= new Set()).add(o);
  (cache.active ??= new Set()).add(o);
  try {
    o.__typename = "Book";
    o.name = options.name ?? "name";
    return o as FactoryResult<Book>;
  } finally {
    cache.active?.delete(o);
  }
}

factories["Book"] = newBook;

export interface SaveAuthorLikeResultOptions {
  __typename?: "SaveAuthorLikeResult";
  authors?: Array<AuthorLike | FactoryResult<AuthorLikeType> | AuthorLikeOptions>;
}

export function newSaveAuthorLikeResult(
  options?: SaveAuthorLikeResultOptions,
  factoryOptions?: FactoryOptions,
): FactoryResult<SaveAuthorLikeResult>;
export function newSaveAuthorLikeResult(
  options: SaveAuthorLikeResultOptions = {},
  factoryOptions: FactoryOptions = {},
  cache: FactoryCache = newFactoryCache(factoryOptions),
): FactoryResult<SaveAuthorLikeResult> {
  const o = (options.__typename ? options : cache["SaveAuthorLikeResult"] = {}) as SaveAuthorLikeResult;
  (cache.all ??= new Set()).add(o);
  (cache.active ??= new Set()).add(o);
  try {
    o.__typename = "SaveAuthorLikeResult";
    o.authors = (options.authors ?? []).map((i) => maybeNew("AuthorLike", i, cache, options.hasOwnProperty("authors")));
    return o as FactoryResult<SaveAuthorLikeResult>;
  } finally {
    cache.active?.delete(o);
  }
}

factories["SaveAuthorLikeResult"] = newSaveAuthorLikeResult;

export interface SaveAuthorResultOptions {
  __typename?: "SaveAuthorResult";
  author?: FactoryInput<Author, AuthorOptions>;
}

export function newSaveAuthorResult(
  options?: SaveAuthorResultOptions,
  factoryOptions?: FactoryOptions,
): FactoryResult<SaveAuthorResult>;
export function newSaveAuthorResult(
  options: SaveAuthorResultOptions = {},
  factoryOptions: FactoryOptions = {},
  cache: FactoryCache = newFactoryCache(factoryOptions),
): FactoryResult<SaveAuthorResult> {
  const o = (options.__typename ? options : cache["SaveAuthorResult"] = {}) as SaveAuthorResult;
  (cache.all ??= new Set()).add(o);
  (cache.active ??= new Set()).add(o);
  try {
    o.__typename = "SaveAuthorResult";
    o.author = maybeNew("Author", options.author, cache, options.hasOwnProperty("author"));
    return o as FactoryResult<SaveAuthorResult>;
  } finally {
    cache.active?.delete(o);
  }
}

factories["SaveAuthorResult"] = newSaveAuthorResult;

export type AuthorLikeOptions = AuthorOptions;

export type AuthorLikeType = Author;

export type AuthorLikeTypeName = "Author";

export function newAuthorLike(): FactoryResult<Author>;
export function newAuthorLike(options: AuthorOptions, factoryOptions?: FactoryOptions): FactoryResult<Author>;
export function newAuthorLike(
  options: AuthorLikeOptions = {},
  factoryOptions: FactoryOptions = {},
  cache: FactoryCache = newFactoryCache(factoryOptions),
): FactoryResult<AuthorLikeType> {
  const { __typename = "Author" } = options ?? {};
  const shouldUseCache = Object.keys(options).length === 0;
  const maybeCached = shouldUseCache ? getCachedValue(__typename, cache) : undefined;
  if (maybeCached !== undefined) {
    return maybeCached;
  }
  if (shouldUseCache && hasActiveCachedValue(__typename, cache)) {
    return undefined as any;
  }
  return maybeNew(__typename, options ?? {}, cache);
}

factories["AuthorLike"] = newAuthorLike;

const taggedIds: Record<string, string> = {};
let nextFactoryIds: Record<string, number> = {};

export function resetFactoryIds() {
  nextFactoryIds = {};
}

function nextFactoryId(objectName: string): string {
  const nextId = nextFactoryIds[objectName] || 1;
  nextFactoryIds[objectName] = nextId + 1;
  const tag = taggedIds[objectName] ?? objectName.replace(/[a-z]/g, "").toLowerCase();
  return tag + ":" + nextId;
}

function newFactoryCache(factoryOptions: FactoryOptions = {}): FactoryCache {
  return { withCycles: factoryOptions.withCycles === true };
}

function reuseWouldCreateCycle(cache: FactoryCache, value: object): boolean {
  return cache.withCycles !== true && cache.active?.has(value) === true;
}

function getCachedValue(type: string, cache: FactoryCache): any {
  const cachedValue = cache[type];
  if (cachedValue === undefined) {
    return undefined;
  }
  return reuseWouldCreateCycle(cache, cachedValue) ? undefined : cachedValue;
}

function hasActiveCachedValue(type: string, cache: FactoryCache): boolean {
  const cachedValue = cache[type];
  return cachedValue !== undefined && reuseWouldCreateCycle(cache, cachedValue);
}

function maybeNew(
  type: string,
  value: { __typename?: string } | object | undefined,
  cache: FactoryCache,
  isSet: boolean = false,
): any {
  if (value === undefined) {
    const cachedValue = getCachedValue(type, cache);
    if (cachedValue !== undefined || isSet || hasActiveCachedValue(type, cache)) {
      return cachedValue;
    }
    return factories[type]({}, undefined, cache);
  } else if ("__typename" in value && value.__typename) {
    if (cache.all?.has(value)) {
      return reuseWouldCreateCycle(cache, value) ? undefined : value;
    }
    return factories[value.__typename](value, undefined, cache);
  } else {
    return factories[type](value, undefined, cache);
  }
}

function maybeNewOrNull(
  type: string,
  value: { __typename?: string } | object | undefined | null,
  cache: FactoryCache,
): any {
  if (!value) {
    return null;
  } else if ("__typename" in value && value.__typename) {
    if (cache.all?.has(value)) {
      return reuseWouldCreateCycle(cache, value) ? undefined : value;
    }
    return factories[value.__typename](value, undefined, cache);
  } else {
    return factories[type](value, undefined, cache);
  }
}

import {
  CurrentAuthorDocument,
  CurrentAuthorQuery,
  CurrentAuthorQueryVariables,
  GetAuthorSummariesDocument,
  GetAuthorSummariesQuery,
  GetAuthorSummariesQueryVariables,
  MultipleAuthorsDocument,
  MultipleAuthorsQuery,
  MultipleAuthorsQueryVariables,
  SaveAuthorDocument,
  SaveAuthorLikeDocument,
  SaveAuthorLikeMutation,
  SaveAuthorLikeMutationVariables,
  SaveAuthorMutation,
  SaveAuthorMutationVariables,
} from "./queries.generated";

interface GetAuthorSummariesDataOptions {
  authorSummaries?: FactoryInput<AuthorSummary, AuthorSummaryOptions>[];
}

export function newGetAuthorSummariesData(data: GetAuthorSummariesDataOptions): GetAuthorSummariesQuery {
  return {
    __typename: "Query" as const,
    authorSummaries: data["authorSummaries"]?.map((d) => maybeNew("AuthorSummary", d, {})) || [],
  } as any;
}

export function newGetAuthorSummariesResponse(
  data: GetAuthorSummariesDataOptions | Error,
): MockedResponse<GetAuthorSummariesQueryVariables, GetAuthorSummariesQuery> {
  return {
    request: { query: GetAuthorSummariesDocument },
    result: { data: data instanceof Error ? undefined : newGetAuthorSummariesData(data) },
    error: data instanceof Error ? data : undefined,
  };
}
interface SaveAuthorDataOptions {
  saveAuthor?: FactoryInput<SaveAuthorResult, SaveAuthorResultOptions>;
}

export function newSaveAuthorData(data: SaveAuthorDataOptions): SaveAuthorMutation {
  return {
    __typename: "Mutation" as const,
    saveAuthor: maybeNew("SaveAuthorResult", data["saveAuthor"] || undefined, {}),
  } as any;
}

export function newSaveAuthorResponse(
  variables: SaveAuthorMutationVariables,
  data: SaveAuthorDataOptions | Error,
): MockedResponse<SaveAuthorMutationVariables, SaveAuthorMutation> {
  return {
    request: { query: SaveAuthorDocument, variables },
    result: { data: data instanceof Error ? undefined : newSaveAuthorData(data) },
    error: data instanceof Error ? data : undefined,
  };
}
interface SaveAuthorLikeDataOptions {
  saveAuthorLike?: FactoryInput<AuthorLike, AuthorLikeOptions>[];
}

export function newSaveAuthorLikeData(data: SaveAuthorLikeDataOptions): SaveAuthorLikeMutation {
  return {
    __typename: "Mutation" as const,
    saveAuthorLike: data["saveAuthorLike"]?.map((d) => maybeNew("AuthorLike", d, {})) || [],
  } as any;
}

export function newSaveAuthorLikeResponse(
  variables: SaveAuthorLikeMutationVariables,
  data: SaveAuthorLikeDataOptions | Error,
): MockedResponse<SaveAuthorLikeMutationVariables, SaveAuthorLikeMutation> {
  return {
    request: { query: SaveAuthorLikeDocument, variables },
    result: { data: data instanceof Error ? undefined : newSaveAuthorLikeData(data) },
    error: data instanceof Error ? data : undefined,
  };
}
interface CurrentAuthorDataOptions {
  currentAuthor?: FactoryInput<Author, AuthorOptions> | null;
}

export function newCurrentAuthorData(data: CurrentAuthorDataOptions): CurrentAuthorQuery {
  return {
    __typename: "Query" as const,
    currentAuthor: maybeNewOrNull("Author", data["currentAuthor"] || undefined, {}),
  } as any;
}

export function newCurrentAuthorResponse(
  data: CurrentAuthorDataOptions | Error,
): MockedResponse<CurrentAuthorQueryVariables, CurrentAuthorQuery> {
  return {
    request: { query: CurrentAuthorDocument },
    result: { data: data instanceof Error ? undefined : newCurrentAuthorData(data) },
    error: data instanceof Error ? data : undefined,
  };
}
interface MultipleAuthorsDataOptions {
  authorOne?: FactoryInput<Author, AuthorOptions> | null;
  authorTwo?: FactoryInput<Author, AuthorOptions> | null;
}

export function newMultipleAuthorsData(data: MultipleAuthorsDataOptions): MultipleAuthorsQuery {
  return {
    __typename: "Query" as const,
    authorOne: maybeNewOrNull("Author", data["authorOne"] || undefined, {}),
    authorTwo: maybeNewOrNull("Author", data["authorTwo"] || undefined, {}),
  } as any;
}

export function newMultipleAuthorsResponse(
  data: MultipleAuthorsDataOptions | Error,
): MockedResponse<MultipleAuthorsQueryVariables, MultipleAuthorsQuery> {
  return {
    request: { query: MultipleAuthorsDocument },
    result: { data: data instanceof Error ? undefined : newMultipleAuthorsData(data) },
    error: data instanceof Error ? data : undefined,
  };
}

  export type MockedResponse<V, Q> = {
    request: {
      query: any;
      variables?: V;
    };
    result: {
      data?: Q;
    };
    error?: Error;
    // Note this only works if using Homebound's better-apollo-mocked-provider
    requestedCount?: number;
  };

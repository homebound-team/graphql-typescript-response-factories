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
type RequireTypename<T extends { __typename?: string }> = Omit<T, "__typename"> & Required<Pick<T, "__typename">>;
export interface AuthorOptions {
  __typename?: "Author";
  birthday?: Author["birthday"];
  name?: Author["name"];
  popularity?: Author["popularity"];
  summary?: AuthorSummary | AuthorSummaryOptions;
  working?: Author["working"];
}

export function newAuthor(options: AuthorOptions = {}, cache: Record<string, any> = {}): Author {
  const o = (options.__typename ? options : cache["Author"] = {}) as Author;
  (cache.all ??= new Set()).add(o);
  o.__typename = "Author";
  o.birthday = options.birthday ?? null;
  o.name = options.name ?? "name";
  o.popularity = options.popularity ?? Popularity.High;
  o.summary = maybeNew("AuthorSummary", options.summary, cache, options.hasOwnProperty("summary"));
  o.working = options.working ?? null;
  return o;
}

factories["Author"] = newAuthor;

export interface AuthorSummaryOptions {
  __typename?: "AuthorSummary";
  amountOfSales?: AuthorSummary["amountOfSales"];
  author?: Author | AuthorOptions;
  numberOfBooks?: AuthorSummary["numberOfBooks"];
}

export function newAuthorSummary(options: AuthorSummaryOptions = {}, cache: Record<string, any> = {}): AuthorSummary {
  const o = (options.__typename ? options : cache["AuthorSummary"] = {}) as AuthorSummary;
  (cache.all ??= new Set()).add(o);
  o.__typename = "AuthorSummary";
  o.amountOfSales = options.amountOfSales ?? null;
  o.author = maybeNew("Author", options.author, cache, options.hasOwnProperty("author"));
  o.numberOfBooks = options.numberOfBooks ?? 0;
  return o;
}

factories["AuthorSummary"] = newAuthorSummary;

export interface BookOptions {
  __typename?: "Book";
  name?: Book["name"];
}

export function newBook(options: BookOptions = {}, cache: Record<string, any> = {}): Book {
  const o = (options.__typename ? options : cache["Book"] = {}) as Book;
  (cache.all ??= new Set()).add(o);
  o.__typename = "Book";
  o.name = options.name ?? "name";
  return o;
}

factories["Book"] = newBook;

export interface SaveAuthorLikeResultOptions {
  __typename?: "SaveAuthorLikeResult";
  authors?: Array<Author | AuthorLike | AuthorLikeOptions>;
}

export function newSaveAuthorLikeResult(
  options: SaveAuthorLikeResultOptions = {},
  cache: Record<string, any> = {},
): SaveAuthorLikeResult {
  const o = (options.__typename ? options : cache["SaveAuthorLikeResult"] = {}) as SaveAuthorLikeResult;
  (cache.all ??= new Set()).add(o);
  o.__typename = "SaveAuthorLikeResult";
  o.authors = (options.authors ?? []).map((i) => maybeNew("AuthorLike", i, cache, options.hasOwnProperty("authors")));
  return o;
}

factories["SaveAuthorLikeResult"] = newSaveAuthorLikeResult;

export interface SaveAuthorResultOptions {
  __typename?: "SaveAuthorResult";
  author?: Author | AuthorOptions;
}

export function newSaveAuthorResult(
  options: SaveAuthorResultOptions = {},
  cache: Record<string, any> = {},
): SaveAuthorResult {
  const o = (options.__typename ? options : cache["SaveAuthorResult"] = {}) as SaveAuthorResult;
  (cache.all ??= new Set()).add(o);
  o.__typename = "SaveAuthorResult";
  o.author = maybeNew("Author", options.author, cache, options.hasOwnProperty("author"));
  return o;
}

factories["SaveAuthorResult"] = newSaveAuthorResult;

export type AuthorLikeOptions = AuthorOptions;

export type AuthorLikeType = Author;

export type AuthorLikeTypeName = "Author";

export function newAuthorLike(): Author;
export function newAuthorLike(options: AuthorOptions, cache?: Record<string, any>): Author;
export function newAuthorLike(options: AuthorLikeOptions = {}, cache: Record<string, any> = {}): AuthorLikeType {
  const { __typename = "Author" } = options ?? {};
  const maybeCached = Object.keys(options).length === 0 ? cache[__typename] : undefined;
  return maybeCached ?? maybeNew(__typename, options ?? {}, cache);
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

function maybeNew(
  type: string,
  value: { __typename?: string } | object | undefined,
  cache: Record<string, any>,
  isSet: boolean = false,
): any {
  if (value === undefined) {
    return isSet ? undefined : cache[type] || factories[type]({}, cache);
  } else if ("__typename" in value && value.__typename) {
    return cache.all?.has(value) ? value : factories[value.__typename](value, cache);
  } else {
    return factories[type](value, cache);
  }
}

function maybeNewOrNull(
  type: string,
  value: { __typename?: string } | object | undefined | null,
  cache: Record<string, any>,
): any {
  if (!value) {
    return null;
  } else if ("__typename" in value && value.__typename) {
    return cache.all?.has(value) ? value : factories[value.__typename](value, cache);
  } else {
    return factories[type](value, cache);
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
  authorSummaries?: (AuthorSummary | AuthorSummaryOptions)[];
}

export function newGetAuthorSummariesData(data: GetAuthorSummariesDataOptions): GetAuthorSummariesQuery {
  return {
    __typename: "Query" as const,
    authorSummaries: data["authorSummaries"]?.map((d) => newAuthorSummary(d)) || [],
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
  saveAuthor?: SaveAuthorResult | SaveAuthorResultOptions;
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
  saveAuthorLike?: (AuthorLike | AuthorLikeOptions)[];
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
  currentAuthor?: Author | AuthorOptions | null;
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
  authorOne?: Author | AuthorOptions | null;
  authorTwo?: Author | AuthorOptions | null;
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

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Author = AuthorLike & {
  __typename?: 'Author';
  birthday?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  popularity: Popularity;
  summary: AuthorSummary;
  working?: Maybe<Working>;
};

export type AuthorInput = {
  name?: Maybe<Scalars['String']>;
};

export type AuthorLike = {
  name: Scalars['String'];
};

export type AuthorSummary = {
  __typename?: 'AuthorSummary';
  amountOfSales?: Maybe<Scalars['Float']>;
  author: Author;
  numberOfBooks: Scalars['Int'];
};

export type Book = {
  __typename?: 'Book';
  name: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  saveAuthor: SaveAuthorResult;
  saveAuthorLike: Array<AuthorLike>;
};


export type MutationSaveAuthorArgs = {
  input: AuthorInput;
};


export type MutationSaveAuthorLikeArgs = {
  input: AuthorInput;
};

export enum Popularity {
  High = 'High',
  Low = 'Low'
}

export type Query = {
  __typename?: 'Query';
  authorSummaries: Array<AuthorSummary>;
  authors: Array<Author>;
  currentAuthor?: Maybe<Author>;
  search: Array<SearchResult>;
};


export type QueryAuthorsArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QuerySearchArgs = {
  query: Scalars['String'];
};

export type SaveAuthorLikeResult = {
  __typename?: 'SaveAuthorLikeResult';
  authors: Array<AuthorLike>;
};

export type SaveAuthorResult = {
  __typename?: 'SaveAuthorResult';
  author: Author;
};

export type SearchResult = Author | Book;

export enum Working {
  No = 'NO',
  Yes = 'YES'
}

export type GetAuthorSummariesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorSummariesQuery = { __typename?: 'Query', authorSummaries: Array<{ __typename?: 'AuthorSummary', author: { __typename?: 'Author', name: string } }> };

export type SaveAuthorMutationVariables = Exact<{
  input: AuthorInput;
}>;


export type SaveAuthorMutation = { __typename?: 'Mutation', saveAuthor: { __typename?: 'SaveAuthorResult', author: { __typename?: 'Author', name: string } } };

export type SaveAuthorLikeMutationVariables = Exact<{
  input: AuthorInput;
}>;


export type SaveAuthorLikeMutation = { __typename?: 'Mutation', saveAuthorLike: Array<{ __typename?: 'Author', name: string }> };

export type CurrentAuthorQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentAuthorQuery = { __typename?: 'Query', currentAuthor?: Maybe<{ __typename?: 'Author', name: string }> };


export const GetAuthorSummariesDocument = gql`
    query GetAuthorSummaries {
  authorSummaries {
    author {
      name
    }
  }
}
    `;

/**
 * __useGetAuthorSummariesQuery__
 *
 * To run a query within a React component, call `useGetAuthorSummariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorSummariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorSummariesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthorSummariesQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>(GetAuthorSummariesDocument, options);
      }
export function useGetAuthorSummariesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>(GetAuthorSummariesDocument, options);
        }
export type GetAuthorSummariesQueryHookResult = ReturnType<typeof useGetAuthorSummariesQuery>;
export type GetAuthorSummariesLazyQueryHookResult = ReturnType<typeof useGetAuthorSummariesLazyQuery>;
export type GetAuthorSummariesQueryResult = Apollo.QueryResult<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>;
export const SaveAuthorDocument = gql`
    mutation SaveAuthor($input: AuthorInput!) {
  saveAuthor(input: $input) {
    author {
      name
    }
  }
}
    `;
export type SaveAuthorMutationFn = Apollo.MutationFunction<SaveAuthorMutation, SaveAuthorMutationVariables>;

/**
 * __useSaveAuthorMutation__
 *
 * To run a mutation, you first call `useSaveAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAuthorMutation, { data, loading, error }] = useSaveAuthorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveAuthorMutation(baseOptions?: Apollo.MutationHookOptions<SaveAuthorMutation, SaveAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveAuthorMutation, SaveAuthorMutationVariables>(SaveAuthorDocument, options);
      }
export type SaveAuthorMutationHookResult = ReturnType<typeof useSaveAuthorMutation>;
export type SaveAuthorMutationResult = Apollo.MutationResult<SaveAuthorMutation>;
export type SaveAuthorMutationOptions = Apollo.BaseMutationOptions<SaveAuthorMutation, SaveAuthorMutationVariables>;
export const SaveAuthorLikeDocument = gql`
    mutation SaveAuthorLike($input: AuthorInput!) {
  saveAuthorLike(input: $input) {
    name
  }
}
    `;
export type SaveAuthorLikeMutationFn = Apollo.MutationFunction<SaveAuthorLikeMutation, SaveAuthorLikeMutationVariables>;

/**
 * __useSaveAuthorLikeMutation__
 *
 * To run a mutation, you first call `useSaveAuthorLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAuthorLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAuthorLikeMutation, { data, loading, error }] = useSaveAuthorLikeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveAuthorLikeMutation(baseOptions?: Apollo.MutationHookOptions<SaveAuthorLikeMutation, SaveAuthorLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveAuthorLikeMutation, SaveAuthorLikeMutationVariables>(SaveAuthorLikeDocument, options);
      }
export type SaveAuthorLikeMutationHookResult = ReturnType<typeof useSaveAuthorLikeMutation>;
export type SaveAuthorLikeMutationResult = Apollo.MutationResult<SaveAuthorLikeMutation>;
export type SaveAuthorLikeMutationOptions = Apollo.BaseMutationOptions<SaveAuthorLikeMutation, SaveAuthorLikeMutationVariables>;
export const CurrentAuthorDocument = gql`
    query CurrentAuthor {
  currentAuthor {
    name
  }
}
    `;

/**
 * __useCurrentAuthorQuery__
 *
 * To run a query within a React component, call `useCurrentAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentAuthorQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentAuthorQuery(baseOptions?: Apollo.QueryHookOptions<CurrentAuthorQuery, CurrentAuthorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentAuthorQuery, CurrentAuthorQueryVariables>(CurrentAuthorDocument, options);
      }
export function useCurrentAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentAuthorQuery, CurrentAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentAuthorQuery, CurrentAuthorQueryVariables>(CurrentAuthorDocument, options);
        }
export type CurrentAuthorQueryHookResult = ReturnType<typeof useCurrentAuthorQuery>;
export type CurrentAuthorLazyQueryHookResult = ReturnType<typeof useCurrentAuthorLazyQuery>;
export type CurrentAuthorQueryResult = Apollo.QueryResult<CurrentAuthorQuery, CurrentAuthorQueryVariables>;
const factories: Record<string, Function> = {};
export interface AuthorOptions {
  __typename?: "Author";
  birthday?: Author["birthday"];
  name?: Author["name"];
  popularity?: Author["popularity"];
  summary?: AuthorSummaryOptions;
  working?: Author["working"];
}

export function newAuthor(
  options: AuthorOptions = {},
  cache: Record<string, any> = {},
): Author {
  const o = (options.__typename ? options : cache["Author"] = {}) as Author;
  (cache.all ??= new Set()).add(o);
  o.__typename = "Author";
  o.birthday = options.birthday ?? null;
  o.name = options.name ?? "name";
  o.popularity = options.popularity ?? Popularity.High;
  o.summary = maybeNewAuthorSummary(
    options.summary,
    cache,
    options.hasOwnProperty("summary"),
  );
  o.working = options.working ?? null;
  return o;
}

factories["Author"] = newAuthor;

function maybeNewAuthor(
  value: AuthorOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false,
): Author {
  if (value === undefined) {
    return isSet ? undefined : cache["Author"] || newAuthor({}, cache);
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newAuthor(value, cache);
  }
}

function maybeNewOrNullAuthor(
  value: AuthorOptions | undefined | null,
  cache: Record<string, any>,
): Author | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newAuthor(value, cache);
  }
}
export interface AuthorSummaryOptions {
  __typename?: "AuthorSummary";
  amountOfSales?: AuthorSummary["amountOfSales"];
  author?: AuthorOptions;
  numberOfBooks?: AuthorSummary["numberOfBooks"];
}

export function newAuthorSummary(
  options: AuthorSummaryOptions = {},
  cache: Record<string, any> = {},
): AuthorSummary {
  const o =
    (options.__typename
      ? options
      : cache["AuthorSummary"] = {}) as AuthorSummary;
  (cache.all ??= new Set()).add(o);
  o.__typename = "AuthorSummary";
  o.amountOfSales = options.amountOfSales ?? null;
  o.author = maybeNewAuthor(
    options.author,
    cache,
    options.hasOwnProperty("author"),
  );
  o.numberOfBooks = options.numberOfBooks ?? 0;
  return o;
}

factories["AuthorSummary"] = newAuthorSummary;

function maybeNewAuthorSummary(
  value: AuthorSummaryOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false,
): AuthorSummary {
  if (value === undefined) {
    return isSet
      ? undefined
      : cache["AuthorSummary"] || newAuthorSummary({}, cache);
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newAuthorSummary(value, cache);
  }
}

function maybeNewOrNullAuthorSummary(
  value: AuthorSummaryOptions | undefined | null,
  cache: Record<string, any>,
): AuthorSummary | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newAuthorSummary(value, cache);
  }
}
export interface BookOptions {
  __typename?: "Book";
  name?: Book["name"];
}

export function newBook(
  options: BookOptions = {},
  cache: Record<string, any> = {},
): Book {
  const o = (options.__typename ? options : cache["Book"] = {}) as Book;
  (cache.all ??= new Set()).add(o);
  o.__typename = "Book";
  o.name = options.name ?? "name";
  return o;
}

factories["Book"] = newBook;

function maybeNewBook(
  value: BookOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false,
): Book {
  if (value === undefined) {
    return isSet ? undefined : cache["Book"] || newBook({}, cache);
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newBook(value, cache);
  }
}

function maybeNewOrNullBook(
  value: BookOptions | undefined | null,
  cache: Record<string, any>,
): Book | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newBook(value, cache);
  }
}
export interface SaveAuthorLikeResultOptions {
  __typename?: "SaveAuthorLikeResult";
  authors?: SaveAuthorLikeResult["authors"];
}

export function newSaveAuthorLikeResult(
  options: SaveAuthorLikeResultOptions = {},
  cache: Record<string, any> = {},
): SaveAuthorLikeResult {
  const o =
    (options.__typename
      ? options
      : cache["SaveAuthorLikeResult"] = {}) as SaveAuthorLikeResult;
  (cache.all ??= new Set()).add(o);
  o.__typename = "SaveAuthorLikeResult";
  o.authors = options.authors ?? [];
  return o;
}

factories["SaveAuthorLikeResult"] = newSaveAuthorLikeResult;

function maybeNewSaveAuthorLikeResult(
  value: SaveAuthorLikeResultOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false,
): SaveAuthorLikeResult {
  if (value === undefined) {
    return isSet
      ? undefined
      : cache["SaveAuthorLikeResult"] || newSaveAuthorLikeResult({}, cache);
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newSaveAuthorLikeResult(value, cache);
  }
}

function maybeNewOrNullSaveAuthorLikeResult(
  value: SaveAuthorLikeResultOptions | undefined | null,
  cache: Record<string, any>,
): SaveAuthorLikeResult | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newSaveAuthorLikeResult(value, cache);
  }
}
export interface SaveAuthorResultOptions {
  __typename?: "SaveAuthorResult";
  author?: AuthorOptions;
}

export function newSaveAuthorResult(
  options: SaveAuthorResultOptions = {},
  cache: Record<string, any> = {},
): SaveAuthorResult {
  const o =
    (options.__typename
      ? options
      : cache["SaveAuthorResult"] = {}) as SaveAuthorResult;
  (cache.all ??= new Set()).add(o);
  o.__typename = "SaveAuthorResult";
  o.author = maybeNewAuthor(
    options.author,
    cache,
    options.hasOwnProperty("author"),
  );
  return o;
}

factories["SaveAuthorResult"] = newSaveAuthorResult;

function maybeNewSaveAuthorResult(
  value: SaveAuthorResultOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false,
): SaveAuthorResult {
  if (value === undefined) {
    return isSet
      ? undefined
      : cache["SaveAuthorResult"] || newSaveAuthorResult({}, cache);
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newSaveAuthorResult(value, cache);
  }
}

function maybeNewOrNullSaveAuthorResult(
  value: SaveAuthorResultOptions | undefined | null,
  cache: Record<string, any>,
): SaveAuthorResult | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return cache.all?.has(value)
      ? value
      : factories[value.__typename](value, cache);
  } else {
    return newSaveAuthorResult(value, cache);
  }
}
export type AuthorLikeOptions = AuthorOptions;

export type AuthorLikeType = Author;

export type AuthorLikeTypeName = "Author";

function maybeNewAuthorLike(
  value: AuthorLikeOptions | undefined,
  cache: Record<string, any>,
): AuthorLikeType {
  if (value === undefined) {
    return cache["Author"] || newAuthor({}, cache);
  } else if (value.__typename) {
    return value as AuthorLikeType;
  } else {
    return newAuthor(value as unknown as AuthorOptions, cache);
  }
}

function maybeNewOrNullAuthorLike(
  value: AuthorLikeOptions | undefined | null,
  cache: Record<string, any>,
): AuthorLike | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return value as AuthorLikeType;
  } else {
    return newAuthor(value as unknown as AuthorOptions, cache);
  }
}

const taggedIds: Record<string, string> = {};
let nextFactoryIds: Record<string, number> = {};

export function resetFactoryIds() {
  nextFactoryIds = {};
}

function nextFactoryId(objectName: string): string {
  const nextId = nextFactoryIds[objectName] || 1;
  nextFactoryIds[objectName] = nextId + 1;
  const tag = taggedIds[objectName] ??
    objectName.replace(/[a-z]/g, "").toLowerCase();
  return tag + ":" + nextId;
}

interface GetAuthorSummariesDataOptions {
  authorSummaries?: AuthorSummaryOptions[];
}

export function newGetAuthorSummariesData(data: GetAuthorSummariesDataOptions) {
  return {
    __typename: "Query" as const,
    authorSummaries: data["authorSummaries"]?.map((d) => newAuthorSummary(d)) ||
      [],
  };
}

export function newGetAuthorSummariesResponse(
  data: GetAuthorSummariesDataOptions | Error,
): MockedResponse<GetAuthorSummariesQueryVariables, GetAuthorSummariesQuery> {
  return {
    request: { query: GetAuthorSummariesDocument },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: {
      data: data instanceof Error
        ? undefined
        : newGetAuthorSummariesData(data) as any,
    },
    error: data instanceof Error ? data : undefined,
  };
}
interface SaveAuthorDataOptions {
  saveAuthor?: SaveAuthorResultOptions;
}

export function newSaveAuthorData(data: SaveAuthorDataOptions) {
  return {
    __typename: "Mutation" as const,
    saveAuthor: maybeNewSaveAuthorResult(data["saveAuthor"] || undefined, {}),
  };
}

export function newSaveAuthorResponse(
  variables: SaveAuthorMutationVariables,
  data: SaveAuthorDataOptions | Error,
): MockedResponse<SaveAuthorMutationVariables, SaveAuthorMutation> {
  return {
    request: { query: SaveAuthorDocument, variables },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: {
      data: data instanceof Error ? undefined : newSaveAuthorData(data) as any,
    },
    error: data instanceof Error ? data : undefined,
  };
}
interface SaveAuthorLikeDataOptions {
  saveAuthorLike?: AuthorLikeOptions[];
}

export function newSaveAuthorLikeData(data: SaveAuthorLikeDataOptions) {
  return {
    __typename: "Mutation" as const,
    saveAuthorLike:
      data["saveAuthorLike"]?.map((d) => maybeNewAuthorLike(d, {})) || [],
  };
}

export function newSaveAuthorLikeResponse(
  variables: SaveAuthorLikeMutationVariables,
  data: SaveAuthorLikeDataOptions | Error,
): MockedResponse<SaveAuthorLikeMutationVariables, SaveAuthorLikeMutation> {
  return {
    request: { query: SaveAuthorLikeDocument, variables },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: {
      data: data instanceof Error
        ? undefined
        : newSaveAuthorLikeData(data) as any,
    },
    error: data instanceof Error ? data : undefined,
  };
}
interface CurrentAuthorDataOptions {
  currentAuthor?: AuthorOptions | null;
}

export function newCurrentAuthorData(data: CurrentAuthorDataOptions) {
  return {
    __typename: "Query" as const,
    currentAuthor: maybeNewOrNullAuthor(data["currentAuthor"] || undefined, {}),
  };
}

export function newCurrentAuthorResponse(
  data: CurrentAuthorDataOptions | Error,
): MockedResponse<CurrentAuthorQueryVariables, CurrentAuthorQuery> {
  return {
    request: { query: CurrentAuthorDocument },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: {
      data: data instanceof Error
        ? undefined
        : newCurrentAuthorData(data) as any,
    },
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

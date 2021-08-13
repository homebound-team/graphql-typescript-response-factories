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

export type Author = {
  __typename?: 'Author';
  name: Scalars['String'];
  summary: AuthorSummary;
  popularity: Popularity;
  working?: Maybe<Working>;
  birthday?: Maybe<Scalars['Date']>;
};

export type AuthorInput = {
  name?: Maybe<Scalars['String']>;
};

export type AuthorSummary = {
  __typename?: 'AuthorSummary';
  author: Author;
  numberOfBooks: Scalars['Int'];
  amountOfSales?: Maybe<Scalars['Float']>;
};

export type Book = {
  __typename?: 'Book';
  name: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  saveAuthor: SaveAuthorResult;
};


export type MutationSaveAuthorArgs = {
  input: AuthorInput;
};

export enum Popularity {
  Low = 'Low',
  High = 'High'
}

export type Query = {
  __typename?: 'Query';
  authors: Array<Author>;
  authorSummaries: Array<AuthorSummary>;
  search: Array<SearchResult>;
  currentAuthor?: Maybe<Author>;
};


export type QueryAuthorsArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QuerySearchArgs = {
  query: Scalars['String'];
};

export type SaveAuthorResult = {
  __typename?: 'SaveAuthorResult';
  author: Author;
};

export type SearchResult = Author | Book;

export enum Working {
  Yes = 'YES',
  No = 'NO'
}

export type GetAuthorSummariesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorSummariesQuery = { __typename?: 'Query', authorSummaries: Array<{ __typename?: 'AuthorSummary', author: { __typename?: 'Author', name: string } }> };

export type SaveAuthorMutationVariables = Exact<{
  input: AuthorInput;
}>;


export type SaveAuthorMutation = { __typename?: 'Mutation', saveAuthor: { __typename?: 'SaveAuthorResult', author: { __typename?: 'Author', name: string } } };

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
export interface AuthorOptions {
  __typename?: "Author";
  name?: Author["name"];
  summary?: AuthorSummaryOptions;
  popularity?: Author["popularity"];
  working?: Author["working"];
  birthday?: Author["birthday"];
}

export function newAuthor(options: AuthorOptions = {}, cache: Record<string, any> = {}): Author {
  const o = (cache["Author"] = {} as Author);
  o.__typename = "Author";
  o.name = options.name ?? "name";
  o.summary = maybeNewAuthorSummary(options.summary, cache, options.hasOwnProperty("summary"));
  o.popularity = options.popularity ?? Popularity.Low;
  o.working = options.working ?? null;
  o.birthday = options.birthday ?? null;
  return o;
}

function maybeNewAuthor(value: AuthorOptions | undefined, cache: Record<string, any>, isSet: boolean = false): Author {
  if (value === undefined) {
    return isSet ? undefined : cache["Author"] || newAuthor({}, cache);
  } else if (value.__typename) {
    return value as Author;
  } else {
    return newAuthor(value, cache);
  }
}

function maybeNewOrNullAuthor(value: AuthorOptions | undefined | null, cache: Record<string, any>): Author | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return value as Author;
  } else {
    return newAuthor(value, cache);
  }
}
export interface AuthorSummaryOptions {
  __typename?: "AuthorSummary";
  author?: AuthorOptions;
  numberOfBooks?: AuthorSummary["numberOfBooks"];
  amountOfSales?: AuthorSummary["amountOfSales"];
}

export function newAuthorSummary(options: AuthorSummaryOptions = {}, cache: Record<string, any> = {}): AuthorSummary {
  const o = (cache["AuthorSummary"] = {} as AuthorSummary);
  o.__typename = "AuthorSummary";
  o.author = maybeNewAuthor(options.author, cache, options.hasOwnProperty("author"));
  o.numberOfBooks = options.numberOfBooks ?? 0;
  o.amountOfSales = options.amountOfSales ?? null;
  return o;
}

function maybeNewAuthorSummary(
  value: AuthorSummaryOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false,
): AuthorSummary {
  if (value === undefined) {
    return isSet ? undefined : cache["AuthorSummary"] || newAuthorSummary({}, cache);
  } else if (value.__typename) {
    return value as AuthorSummary;
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
    return value as AuthorSummary;
  } else {
    return newAuthorSummary(value, cache);
  }
}
export interface BookOptions {
  __typename?: "Book";
  name?: Book["name"];
}

export function newBook(options: BookOptions = {}, cache: Record<string, any> = {}): Book {
  const o = (cache["Book"] = {} as Book);
  o.__typename = "Book";
  o.name = options.name ?? "name";
  return o;
}

function maybeNewBook(value: BookOptions | undefined, cache: Record<string, any>, isSet: boolean = false): Book {
  if (value === undefined) {
    return isSet ? undefined : cache["Book"] || newBook({}, cache);
  } else if (value.__typename) {
    return value as Book;
  } else {
    return newBook(value, cache);
  }
}

function maybeNewOrNullBook(value: BookOptions | undefined | null, cache: Record<string, any>): Book | null {
  if (!value) {
    return null;
  } else if (value.__typename) {
    return value as Book;
  } else {
    return newBook(value, cache);
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
  const o = (cache["SaveAuthorResult"] = {} as SaveAuthorResult);
  o.__typename = "SaveAuthorResult";
  o.author = maybeNewAuthor(options.author, cache, options.hasOwnProperty("author"));
  return o;
}

function maybeNewSaveAuthorResult(
  value: SaveAuthorResultOptions | undefined,
  cache: Record<string, any>,
  isSet: boolean = false,
): SaveAuthorResult {
  if (value === undefined) {
    return isSet ? undefined : cache["SaveAuthorResult"] || newSaveAuthorResult({}, cache);
  } else if (value.__typename) {
    return value as SaveAuthorResult;
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
    return value as SaveAuthorResult;
  } else {
    return newSaveAuthorResult(value, cache);
  }
}
let nextFactoryIds: Record<string, number> = {};

export function resetFactoryIds() {
  nextFactoryIds = {};
}

function nextFactoryId(objectName: string): string {
  const nextId = nextFactoryIds[objectName] || 1;
  nextFactoryIds[objectName] = nextId + 1;
  return String(nextId);
}

interface GetAuthorSummariesDataOptions {
  authorSummaries?: AuthorSummaryOptions[];
}

export function newGetAuthorSummariesData(data: GetAuthorSummariesDataOptions) {
  return {
    __typename: "Query" as const,
    authorSummaries: data["authorSummaries"]?.map((d) => newAuthorSummary(d)) || [],
  };
}

export function newGetAuthorSummariesResponse(
  data: GetAuthorSummariesDataOptions | Error,
): MockedResponse<GetAuthorSummariesQueryVariables, GetAuthorSummariesQuery> {
  return {
    request: { query: GetAuthorSummariesDocument },
    // TODO Remove the any by having interfaces have a __typename that pacifies mutation type unions
    result: { data: data instanceof Error ? undefined : (newGetAuthorSummariesData(data) as any) },
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
    result: { data: data instanceof Error ? undefined : (newSaveAuthorData(data) as any) },
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
    result: { data: data instanceof Error ? undefined : (newCurrentAuthorData(data) as any) },
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

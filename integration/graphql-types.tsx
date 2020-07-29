import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

/** An entity that will be a mapped typed */
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

/** A DTO that is just some fields */
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

export type GetAuthorSummariesQueryVariables = {};


export type GetAuthorSummariesQuery = (
  { __typename?: 'Query' }
  & { authorSummaries: Array<(
    { __typename?: 'AuthorSummary' }
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'name'>
    ) }
  )> }
);

export type SaveAuthorMutationVariables = {
  input: AuthorInput;
};


export type SaveAuthorMutation = (
  { __typename?: 'Mutation' }
  & { saveAuthor: (
    { __typename?: 'SaveAuthorResult' }
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'name'>
    ) }
  ) }
);


export const GetAuthorSummariesDocument = gql`
    query GetAuthorSummaries {
  authorSummaries {
    author {
      name
    }
  }
}
    `;
export type GetAuthorSummariesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>, 'query'>;

    export const GetAuthorSummariesComponent = (props: GetAuthorSummariesComponentProps) => (
      <ApolloReactComponents.Query<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables> query={GetAuthorSummariesDocument} {...props} />
    );
    
export type GetAuthorSummariesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables> & TChildProps;
export function withGetAuthorSummaries<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAuthorSummariesQuery,
  GetAuthorSummariesQueryVariables,
  GetAuthorSummariesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables, GetAuthorSummariesProps<TChildProps>>(GetAuthorSummariesDocument, {
      alias: 'getAuthorSummaries',
      ...operationOptions
    });
};
export type GetAuthorSummariesQueryResult = ApolloReactCommon.QueryResult<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>;
export const SaveAuthorDocument = gql`
    mutation SaveAuthor($input: AuthorInput!) {
  saveAuthor(input: $input) {
    author {
      name
    }
  }
}
    `;
export type SaveAuthorMutationFn = ApolloReactCommon.MutationFunction<SaveAuthorMutation, SaveAuthorMutationVariables>;
export type SaveAuthorComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SaveAuthorMutation, SaveAuthorMutationVariables>, 'mutation'>;

    export const SaveAuthorComponent = (props: SaveAuthorComponentProps) => (
      <ApolloReactComponents.Mutation<SaveAuthorMutation, SaveAuthorMutationVariables> mutation={SaveAuthorDocument} {...props} />
    );
    
export type SaveAuthorProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SaveAuthorMutation, SaveAuthorMutationVariables> & TChildProps;
export function withSaveAuthor<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SaveAuthorMutation,
  SaveAuthorMutationVariables,
  SaveAuthorProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SaveAuthorMutation, SaveAuthorMutationVariables, SaveAuthorProps<TChildProps>>(SaveAuthorDocument, {
      alias: 'saveAuthor',
      ...operationOptions
    });
};
export type SaveAuthorMutationResult = ApolloReactCommon.MutationResult<SaveAuthorMutation>;
export type SaveAuthorMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveAuthorMutation, SaveAuthorMutationVariables>;
export type AuthorOptions = DeepPartial<Author>;

export function newAuthor(options: AuthorOptions = {}, cache: Record<string, any> = {}): Author {
  const o = (cache["Author"] = {} as Author);
  o.__typename = "Author";
  o.name = options.name ?? "name";
  o.summary = maybeNewAuthorSummary(options.summary, cache);
  o.popularity = options.popularity ?? Popularity.Low;
  o.working = options.working ?? null;
  o.birthday = options.birthday ?? null;
  return o;
}

function maybeNewAuthor(value: AuthorOptions | undefined, cache: Record<string, any>): Author {
  if (value === undefined) {
    return (cache["Author"] as Author) ?? newAuthor({}, cache);
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

export type AuthorSummaryOptions = DeepPartial<AuthorSummary>;

export function newAuthorSummary(options: AuthorSummaryOptions = {}, cache: Record<string, any> = {}): AuthorSummary {
  const o = (cache["AuthorSummary"] = {} as AuthorSummary);
  o.__typename = "AuthorSummary";
  o.author = maybeNewAuthor(options.author, cache);
  o.numberOfBooks = options.numberOfBooks ?? 0;
  o.amountOfSales = options.amountOfSales ?? null;
  return o;
}

function maybeNewAuthorSummary(value: AuthorSummaryOptions | undefined, cache: Record<string, any>): AuthorSummary {
  if (value === undefined) {
    return (cache["AuthorSummary"] as AuthorSummary) ?? newAuthorSummary({}, cache);
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

export type BookOptions = DeepPartial<Book>;

export function newBook(options: BookOptions = {}, cache: Record<string, any> = {}): Book {
  const o = (cache["Book"] = {} as Book);
  o.__typename = "Book";
  o.name = options.name ?? "name";
  return o;
}

function maybeNewBook(value: BookOptions | undefined, cache: Record<string, any>): Book {
  if (value === undefined) {
    return (cache["Book"] as Book) ?? newBook({}, cache);
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

export type SaveAuthorResultOptions = DeepPartial<SaveAuthorResult>;

export function newSaveAuthorResult(
  options: SaveAuthorResultOptions = {},
  cache: Record<string, any> = {},
): SaveAuthorResult {
  const o = (cache["SaveAuthorResult"] = {} as SaveAuthorResult);
  o.__typename = "SaveAuthorResult";
  o.author = maybeNewAuthor(options.author, cache);
  return o;
}

function maybeNewSaveAuthorResult(
  value: SaveAuthorResultOptions | undefined,
  cache: Record<string, any>,
): SaveAuthorResult {
  if (value === undefined) {
    return (cache["SaveAuthorResult"] as SaveAuthorResult) ?? newSaveAuthorResult({}, cache);
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

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

let nextFactoryIds: Record<string, number> = {};

export function resetFactoryIds() {
  nextFactoryIds = {};
}

function nextFactoryId(objectName: string): string {
  const nextId = nextFactoryIds[objectName] || 1;
  nextFactoryIds[objectName] = nextId + 1;
  return String(nextId);
}

export function newGetAuthorSummariesData(data: Omit<GetAuthorSummariesQuery, "__typename">) {
  return {
    __typename: "Query" as const,
    authorSummaries: data["authorSummaries"].map(d => newAuthorSummary(d)),
  };
}

export function newGetAuthorSummariesResponse(
  data: Omit<GetAuthorSummariesQuery, "__typename"> | Error,
): MockedResponse<GetAuthorSummariesQueryVariables, GetAuthorSummariesQuery> {
  return {
    request: { query: GetAuthorSummariesDocument },
    result: { data: data instanceof Error ? undefined : newGetAuthorSummariesData(data) },
    error: data instanceof Error ? data : undefined,
  };
}
export function newSaveAuthorData(data: Omit<SaveAuthorMutation, "__typename">) {
  return {
    __typename: "Mutation" as const,
    saveAuthor: newSaveAuthorResult(data["saveAuthor"]),
  };
}

export function newSaveAuthorResponse(
  variables: SaveAuthorMutationVariables,
  data: Omit<SaveAuthorMutation, "__typename"> | Error,
): MockedResponse<SaveAuthorMutationVariables, SaveAuthorMutation> {
  return {
    request: { query: SaveAuthorDocument, variables },
    result: { data: data instanceof Error ? undefined : newSaveAuthorData(data) },
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
  };

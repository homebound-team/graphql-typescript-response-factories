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
export function newGetAuthorSummariesResponse(
  data: Omit<GetAuthorSummariesQuery, "__typename"> | Error,
): MockedResponse<GetAuthorSummariesQueryVariables, GetAuthorSummariesQuery> {
  return {
    request: { query: GetAuthorSummariesDocument },
    result: { data: data instanceof Error ? undefined : { __typename: "Query", ...data } },
    error: data instanceof Error ? data : undefined,
  };
}
export function newSaveAuthorResponse(
  variables: SaveAuthorMutationVariables,
  data: Omit<SaveAuthorMutation, "__typename"> | Error,
): MockedResponse<SaveAuthorMutationVariables, SaveAuthorMutation> {
  return {
    request: { query: SaveAuthorDocument, variables },
    result: { data: data instanceof Error ? undefined : { __typename: "Mutation", ...data } },
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

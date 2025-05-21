import * as Types from './graphql-types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAuthorSummariesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAuthorSummariesQuery = { __typename?: 'Query', authorSummaries: Array<{ __typename?: 'AuthorSummary', author: { __typename?: 'Author', name: string } }> };

export type SaveAuthorMutationVariables = Types.Exact<{
  input: Types.AuthorInput;
}>;


export type SaveAuthorMutation = { __typename?: 'Mutation', saveAuthor: { __typename?: 'SaveAuthorResult', author: { __typename?: 'Author', name: string } } };

export type SaveAuthorLikeMutationVariables = Types.Exact<{
  input: Types.AuthorInput;
}>;


export type SaveAuthorLikeMutation = { __typename?: 'Mutation', saveAuthorLike: Array<{ __typename?: 'Author', name: string }> };

export type CurrentAuthorQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentAuthorQuery = { __typename?: 'Query', currentAuthor?: { __typename?: 'Author', name: string } | null };

export type MultipleAuthorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MultipleAuthorsQuery = { __typename?: 'Query', authorOne?: { __typename?: 'Author', name: string } | null, authorTwo?: { __typename?: 'Author', name: string } | null };


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
export function useGetAuthorSummariesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthorSummariesQuery, GetAuthorSummariesQueryVariables>(GetAuthorSummariesDocument, options);
        }
export type GetAuthorSummariesQueryHookResult = ReturnType<typeof useGetAuthorSummariesQuery>;
export type GetAuthorSummariesLazyQueryHookResult = ReturnType<typeof useGetAuthorSummariesLazyQuery>;
export type GetAuthorSummariesSuspenseQueryHookResult = ReturnType<typeof useGetAuthorSummariesSuspenseQuery>;
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
export function useCurrentAuthorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentAuthorQuery, CurrentAuthorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentAuthorQuery, CurrentAuthorQueryVariables>(CurrentAuthorDocument, options);
        }
export type CurrentAuthorQueryHookResult = ReturnType<typeof useCurrentAuthorQuery>;
export type CurrentAuthorLazyQueryHookResult = ReturnType<typeof useCurrentAuthorLazyQuery>;
export type CurrentAuthorSuspenseQueryHookResult = ReturnType<typeof useCurrentAuthorSuspenseQuery>;
export type CurrentAuthorQueryResult = Apollo.QueryResult<CurrentAuthorQuery, CurrentAuthorQueryVariables>;
export const MultipleAuthorsDocument = gql`
    query MultipleAuthors {
  authorOne: currentAuthor {
    name
  }
  authorTwo: currentAuthor {
    name
  }
}
    `;

/**
 * __useMultipleAuthorsQuery__
 *
 * To run a query within a React component, call `useMultipleAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMultipleAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMultipleAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMultipleAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<MultipleAuthorsQuery, MultipleAuthorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MultipleAuthorsQuery, MultipleAuthorsQueryVariables>(MultipleAuthorsDocument, options);
      }
export function useMultipleAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MultipleAuthorsQuery, MultipleAuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MultipleAuthorsQuery, MultipleAuthorsQueryVariables>(MultipleAuthorsDocument, options);
        }
export function useMultipleAuthorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MultipleAuthorsQuery, MultipleAuthorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MultipleAuthorsQuery, MultipleAuthorsQueryVariables>(MultipleAuthorsDocument, options);
        }
export type MultipleAuthorsQueryHookResult = ReturnType<typeof useMultipleAuthorsQuery>;
export type MultipleAuthorsLazyQueryHookResult = ReturnType<typeof useMultipleAuthorsLazyQuery>;
export type MultipleAuthorsSuspenseQueryHookResult = ReturnType<typeof useMultipleAuthorsSuspenseQuery>;
export type MultipleAuthorsQueryResult = Apollo.QueryResult<MultipleAuthorsQuery, MultipleAuthorsQueryVariables>;
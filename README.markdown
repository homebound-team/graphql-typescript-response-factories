
# graphql-typescript-response-factories

This `graphql-code-generator` plugin makes small helper functions for creating react-apollo mock responses for testing client-side GraphQL code.

I.e. for a given query like:

```graphql
query GetAuthorSummaries {
  authorSummaries {
    author {
      name
    }
  }
}
```

This plugin will generate a `newGetAuthorSummariesResponse` factory function:

```typescript
export function newGetAuthorSummariesResponse(
  data: GetAuthorSummariesQuery | Error,
): MockedResponse<GetAuthorSummariesQueryVariables, GetAuthorSummariesQuery> {
  return {
    request: { query: GetAuthorSummariesDocument },
    result: { data: data instanceof Error ? undefined : data },
    error: data instanceof Error ? data : undefined,
  };
}
```

Where the function takes a union type of either the data (i.e. `GetAuthorSummariesQuery`), or `Error`, and then the implementation fills out the `MockedResponse` (from React Apollo) with the corresponding structure.

For factories for the `GetAuthorSummariesQuery`, see the `graphql-typescript-factories` project.



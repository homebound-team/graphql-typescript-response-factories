
# graphql-typescript-response-factories

This `graphql-code-generator` plugin generates factory methods for the react-apollo `MockedResponse`s that are used for testing client-side GraphQL code.

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

That you can use in a test like:

```typescript
const response = newGetAuthorSummariesResponse({
  // Use newAuthorSummary from the graphql-typescript-factories project
  authorSummaries: [newAuthorSummary()],
});

// Something react-testing-library's render
const component = render(
  <MockedProvider mocks={[response]}>
    <YourComponent />
  </MockedProvider>
);
```

Or you can simulate an error with:

```typescript
const response = newGetAuthorSummariesResponse(new Error("bad"));
```

For non-`react-apollo`-specific factories for the rest of your GraphQL schema's types, see the [graphql-typescript-factories](https://github.com/homebound-team/graphql-typescript-factories) sister project.

## Install

```shell
npm -i @homebound/graphql-typescript-response-factories
```

Add the plugin to your `graphql-codegen.yml`, i.e.:

```yaml
overwrite: true
schema: ./schema.json
documents: src/**/*.graphql
generates:
  src/generated/graphql-types.tsx:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
      - "@homebound/graphql-typescript-factories"
      - "@homebound/graphql-typescript-response-factories"
```

## License

MIT


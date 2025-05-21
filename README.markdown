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
  </MockedProvider>,
);
```

Or you can simulate an error with:

```typescript
const response = newGetAuthorSummariesResponse(new Error("bad"));
```

For non-`react-apollo`-specific factories for the rest of your GraphQL schema's types, see the [graphql-typescript-factories](https://github.com/homebound-team/graphql-typescript-factories) sister project.

## Install

```shell
yarn add -D @homebound/graphql-typescript-response-factories
```

## Configuration

There are three well-tested patterns that this plugin supports:

1. Factories in a Single File
1. Factories in a Separate File
1. Factories in a Separate File + [`near-operation-file`](https://the-guild.dev/graphql/codegen/plugins/presets/near-operation-file-preset) imports

These patterns are automatically tested via jest in [`integration/`](/integration/).

### Factories in a Single File

With this approach, you get a single file with all of your generated GraphQL code + factories. This is the easiest way
to get started.

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

See [`integration/singleFile/graphql-codegen.yml`](/integration/singleFile/graphql-codegen.yml) for an example.

### Factories in a Separate File

With this approach, all of your generated GraphQL code is in a single file, but your factories are in a dedicated file.
This is a nice improvement to keep your test/factory logic separate from your production/runtime GraphQL code.

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
  src/generated/graphql-factories.tsx:
    config:
      typesFilePath: ./graphql-types
    plugins:
      - "@homebound/graphql-typescript-factories"
      - "@homebound/graphql-typescript-response-factories"
```

See [`integration/separateFactoryFile/graphql-codegen.yml`](/integration/separateFactoryFile/graphql-codegen.yml) for an example.

### Factories in a Separate File + `near-operation-file` imports

If you're using the [`near-operation-file` preset](https://the-guild.dev/graphql/codegen/plugins/presets/near-operation-file-preset)
to split your queries into separate, smaller, files, this package can figure out the imports for you. We still recommend
creating a single factory file for simplicity. Because you need to pass your `near-operation-file` `presetConfig`, we
recommend using a TypeScript codegen file for reusability.

```ts
// graphql-codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.json",
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/graphql-types.tsx": {
      plugins: ["typescript"],
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        ...nearOperationFilePresetConfig(),
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
    },
    "src/generated/graphql-factories.tsx": {
      config: {
        typesFilePath: "./graphql-types",
        nearOperationFilePresetConfig: {
          ...nearOperationFilePresetConfig(),
        },
      },
      plugins: ["@homebound/graphql-typescript-factories", "@homebound/graphql-typescript-response-factories"],
    },
  },
};

function nearOperationFilePresetConfig() {
  return {
    extension: ".generated.tsx",
    baseTypesPath: "graphql-types.tsx",
  };
}

export default config;
```

See [`integration/nearOperationFile/graphql-codegen.ts`](/integration/nearOperationFile/graphql-codegen.ts) for an example.

## `@homebound/graphql-typescript-factories`

This plugin plays nicely with [`@homebound/graphql-typescript-factories`](https://github.com/homebound-team/graphql-typescript-factories),
another open-source tool to generate stubbed responses for your top-level GraphQL types.

## License

MIT

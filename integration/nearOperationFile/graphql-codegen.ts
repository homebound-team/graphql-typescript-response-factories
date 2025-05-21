import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: "./queries.graphql",
  generates: {
    "graphql-types.generated.tsx": {
      plugins: ["typescript"],
    },
    "./": {
      preset: "near-operation-file",
      presetConfig: {
        ...nearOperationFilePresetConfig(),
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
    },
    "graphql-factories.generated.tsx": {
      config: {
        typesFilePath: "./graphql-types.generated",
        nearOperationFilePresetConfig: {
          ...nearOperationFilePresetConfig(),
        },
      },
      plugins: ["@homebound/graphql-typescript-factories", "../../build/index.js"],
    },
  },
};

function nearOperationFilePresetConfig() {
  return {
    extension: ".generated.tsx",
    baseTypesPath: "graphql-types.generated.tsx",
  };
}

export default config;

import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLOutputType,
  GraphQLSchema,
  OperationDefinitionNode,
  GraphQLNamedType,
} from "graphql";
import { Code, code } from "ts-poet";
import PluginOutput = Types.PluginOutput;
import type { Config } from "./types";
import { createFileReferenceFunction, type FileReferenceFunction } from "./fileReference";

/** Generates `newQueryResponse({ ... })` factory functions in our `graphql-types` codegen output. */
export const plugin: PluginFunction = async (schema, documents, config: Config, info) => {
  const getFileReference = createFileReferenceFunction(config, info?.outputFile);
  const factories: Code[] = [];
  documents.forEach((d) => {
    if (d.document) {
      d.document.definitions.forEach((def) => {
        if (def.kind === "OperationDefinition" && def.name) {
          factories.push(newOperationFactory(schema, def, d, getFileReference));
        }
      });
    }
  });
  const content = (await code`${factories}`.toString()) + mockedResponse;
  return { content } as PluginOutput;
};

function newOperationFactory(
  schema: GraphQLSchema,
  def: OperationDefinitionNode,
  document: Types.DocumentFile,
  fileReference: FileReferenceFunction,
): Code {
  const name = def.name?.value;
  const hasVariables = (def.variableDefinitions?.length || 0) > 0;
  const operation = `${def.operation.charAt(0).toUpperCase()}${def.operation.slice(1)}`;
  const rootType = operation === "Query" ? schema.getQueryType() : schema.getMutationType();

  return code`
    interface ${name}DataOptions {
        ${def.selectionSet.selections.map((s) => {
          if (s.kind === "Field") {
            const name = s.name.value;
            const key = s.alias?.value || name;
            const field = rootType?.getFields()[name];
            if (field) {
              let type = maybeDenull(field.type) as GraphQLNamedType;
              if (type instanceof GraphQLList) {
                type = maybeDenull(type.ofType) as GraphQLNamedType;
                return `${key}?: (${type.name} | ${type.name}Options)[];`;
              } else {
                const orNull = field.type instanceof GraphQLNonNull ? "" : " | null";
                return `${key}?: ${type.name} | ${type.name}Options${orNull};`;
              }
            }
          }
        })}
    }

    export function new${name}Data(data: ${name}DataOptions): ${fileReference(name + operation, document)} {
      return {
        __typename: "${operation}" as const,
        ${def.selectionSet.selections.map((s) => {
          // This is the top-level Mutation/Query result, so usually/basically always has a single
          // field like `saveAuthor: AuthorResult!` where we can use the existing `newAuthorResult` factory.
          if (s.kind === "Field") {
            const name = s.name.value;
            const key = s.alias?.value || name;
            const field = rootType?.getFields()[name];
            if (field) {
              let type = maybeDenull(field.type);
              if (type instanceof GraphQLList) {
                type = maybeDenull(type.ofType);
                if (type instanceof GraphQLInterfaceType) {
                  return `${key}: data["${key}"]?.map(d => maybeNew("${type.name}", d, {})) || [],`;
                } else if (type instanceof GraphQLObjectType) {
                  return `${key}: data["${key}"]?.map(d => new${type.name}(d)) || [],`;
                } else {
                  throw new Error(`Unsupported return type ${type}`);
                }
              } else {
                const orNull = field.type instanceof GraphQLNonNull ? "" : "OrNull";
                return `${key}: maybeNew${orNull}("${
                  (type as GraphQLObjectType).name
                }", data["${key}"] || undefined, {}),`;
              }
            }
          }
        })}
      } as any;
    }

    export function new${name}Response(
      ${hasVariables ? code`variables: ${fileReference(`${name}${operation}Variables`, document)},` : ""}
      data: ${name}DataOptions | Error
    ): MockedResponse<${maybeImport(config, `${name}${operation}Variables`)}, ${name}${operation}> {
      return {
        request: { query: ${fileReference(name + "Document", document)}, ${hasVariables ? "variables, " : ""} },
        result: { data: data instanceof Error ? undefined : new${name}Data(data) },
        error: data instanceof Error ? data : undefined,
      };
    }`;

  // The ^ `as any` is because when queries return type unions, i.e. `items {
  // ...on Project {} ...on Trade {} }`, the type union has `{ __typename: "Project" } |
  // { __typename: "Trade" }` where `__typename` is required, but currently the POJOs
  // have just `interface Project { __typename?: "Project" }`, which does not match.
  //
  // We could turn on `nonOptionalTypeName` but it breaks a lot of existing tests in
  // `internal-frontend`, that arguably should be using factories to create their data.
}

const mockedResponse = `
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
`;

function maybeDenull(o: GraphQLOutputType): GraphQLOutputType {
  return o instanceof GraphQLNonNull ? o.ofType : o;
}

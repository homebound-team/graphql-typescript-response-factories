import { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLSchema,
  OperationDefinitionNode,
} from "graphql";
import { Code, code } from "ts-poet";
import PluginOutput = Types.PluginOutput;

/** Generates `newQueryResponse({ ... })` factory functions in our `graphql-types` codegen output. */
export const plugin: PluginFunction = async (schema, documents) => {
  const factories: Code[] = [];
  documents.forEach((d) => {
    if (d.document) {
      d.document.definitions.forEach((d) => {
        if (d.kind === "OperationDefinition" && d.name) {
          factories.push(newOperationFactory(schema, d));
        }
      });
    }
  });
  const content = (await code`${factories}`.toStringWithImports()) + mockedResponse;
  return { content } as PluginOutput;
};

function newOperationFactory(schema: GraphQLSchema, def: OperationDefinitionNode): Code {
  const name = def.name?.value;
  const hasVariables = (def.variableDefinitions?.length || 0) > 0;
  const operation = `${def.operation.charAt(0).toUpperCase()}${def.operation.slice(1)}`;
  // TODO skip Subscription operations until we figure out how to support
  if (operation === "Subscription") {
    return code``;
  }
  const rootType = operation === "Query" ? schema.getQueryType() : schema.getMutationType();

  return code`
    interface ${name}DataOptions {
        ${def.selectionSet.selections.map((s) => {
          if (s.kind === "Field") {
            const name = s.name.value;
            const field = rootType?.getFields()[name];
            if (field) {
              let type = maybeDenull(field.type);
              if (type instanceof GraphQLList) {
                type = maybeDenull(type.ofType);
                return `${name}?: ${(type as any).name}Options[];`;
              } else {
                const orNull = field.type instanceof GraphQLNonNull ? "" : " | null";
                return `${name}?: ${(type as GraphQLObjectType).name}Options${orNull};`;
              }
            }
          }
        })}
    }

    export function new${name}Data(data: ${name}DataOptions) {
      return {
        __typename: "${operation}" as const,
        ${def.selectionSet.selections.map((s) => {
          // This is the top-level Mutation/Query result, so usually/basically always has a single
          // field like `saveAuthor: AuthorResult!` where we can use the existing `newAuthorResult` factory.
          if (s.kind === "Field") {
            const name = s.name.value;
            const field = rootType?.getFields()[name];
            if (field) {
              let type = maybeDenull(field.type);
              if (type instanceof GraphQLList) {
                type = maybeDenull(type.ofType);
                return `${name}: data["${name}"]?.map(d => new${(type as GraphQLObjectType).name}(d)) || [],`;
              } else {
                const orNull = field.type instanceof GraphQLNonNull ? "" : "OrNull";
                return `${name}: maybeNew${orNull}${
                  (type as GraphQLObjectType).name
                }(data["${name}"] || undefined, {}),`;
              }
            }
          }
        })}
      }
    }

    export function new${name}Response(
      ${hasVariables ? `variables: ${name}${operation}Variables,` : ""}
      data: ${name}DataOptions | Error
    ): MockedResponse<${name}${operation}Variables, ${name}${operation}> {
      return {
        request: { query: ${name}Document, ${hasVariables ? "variables, " : ""} },
        result: { data: data instanceof Error ? undefined : new${name}Data(data) },
        error: data instanceof Error ? data : undefined,
      };
    }`;
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
  };
`;

function maybeDenull(o: GraphQLOutputType): GraphQLOutputType {
  return o instanceof GraphQLNonNull ? o.ofType : o;
}

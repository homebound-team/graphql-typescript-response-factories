import type { Types } from "@graphql-codegen/plugin-helpers";
import { code, imp, type Code } from "ts-poet";
import type { Config } from "./types";
import { generateNearOperationFileImport } from "./nearOperationFileImport";

export type FileReferenceFunction = (typeName: string, documentFile: Types.DocumentFile) => Code;

export function createFileReferenceFunction(config: Config): FileReferenceFunction {
  if (config.nearOperationFilePresetConfig) {
    return (typeName, documentFile) => {
      return code`${imp(`${typeName}@${generateNearOperationFileImport(config, documentFile.location)}`)}`;
    };
  } else if (config.typesFilePath) {
    return (typeName) => {
      return code`${imp(`${typeName}@${config.typesFilePath}`)}`;
    };
  } else {
    return (typeName) => {
      return code`${typeName}`;
    };
  }
}

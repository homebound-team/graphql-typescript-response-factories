import type { Types } from "@graphql-codegen/plugin-helpers";
import { code, imp, type Code } from "ts-poet";
import type { Config } from "./types";
import { generateNearOperationFileImport, type NearOperationFileConfigWithDefaults } from "./nearOperationFileImport";

export type FileReferenceFunction = (typeName: string, documentFile: Types.DocumentFile) => Code;

export function createFileReferenceFunction(config: Config): FileReferenceFunction {
  if (config.nearOperationFilePresetConfig) {
    // Defaults from
    // https://github.com/dotansimha/graphql-code-generator-community/blob/152d2ddbd9a7b86d1f75ab7d86dfaacff5caa2be/packages/presets/near-operation-file/src/index.ts#L220-L222
    const nearOperationFileConfig: NearOperationFileConfigWithDefaults = {
      fileName: config.nearOperationFilePresetConfig.fileName ?? "",
      extension: config.nearOperationFilePresetConfig.extension ?? ".generated.ts",
      folder: config.nearOperationFilePresetConfig.folder ?? "",
    };
    const cwd = process.cwd();

    return (typeName, documentFile) => {
      const importPath = generateNearOperationFileImport(nearOperationFileConfig, documentFile.location!, {
        emitLegacyCommonJSImports: !!config.emitLegacyCommonJSImports,
        cwd,
      });
      return code`${imp(`${typeName}@${importPath}`)}`;
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

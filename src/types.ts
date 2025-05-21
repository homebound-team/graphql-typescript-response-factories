import { RawConfig } from "@graphql-codegen/visitor-plugin-common";

/** The config values we read from the graphql-codegen.yml file. */
export type Config = RawConfig & {
  typesFilePath?: string;
  nearOperationFilePresetConfig?: NearOperationFilePresetConfig;
};

export interface NearOperationFilePresetConfig {
  extension?: string;
  folder?: string;
  fileName?: string;
  cwd?: string;
}

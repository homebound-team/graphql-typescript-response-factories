import { RawConfig } from "@graphql-codegen/visitor-plugin-common";

/** The config values we read from the graphql-codegen.yml file. */
export type Config = RawConfig & {
  typesFilePath?: string;
  nearOperationFilePresetConfig?: NearOperationFilePresetConfig;
};

/**
 * These are the config values we are about from the `near-operation-file` preset.
 * We require this information to determine the correct import path for our generated factories.
 */
export interface NearOperationFilePresetConfig {
  extension?: string;
  folder?: string;
  fileName?: string;
  cwd?: string;
}

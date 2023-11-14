import { PLUGIN_TYPES } from '../constants';

export type CliArgs = {
  pluginName: string;
  pluginDescription: string;
  orgName: string;
  pluginType: PLUGIN_TYPES;
  hasBackend: boolean;
  hasGithubWorkflows: boolean;
  hasGithubLevitateWorkflow: boolean;
  hasGithubDatabaseWorkflow: boolean;
  hasGithubDatabaseTemplates: boolean;
};

export type TemplateData = {
  pluginId: string;
  packageManagerName: string;
  packageManagerInstallCmd: string;
  packageManagerVersion: string;
  isAppType: boolean;
  isNPM: boolean;
  version: string;
  bundleGrafanaUI: boolean;
};

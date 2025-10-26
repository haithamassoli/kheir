const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("cjs");

config.resolver.unstable_enablePackageExports = false;
config.resolver.unstable_conditionNames = ["browser"];

module.exports = config;

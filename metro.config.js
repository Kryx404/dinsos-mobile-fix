const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle React Native modules
config.resolver.platforms = ["ios", "android", "native", "web"];
config.resolver.assetExts.push("bin");

module.exports = config;

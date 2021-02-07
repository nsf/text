const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

exports.onCreateWebpackConfig = ({ stage, actions, plugins, getConfig, loaders }) => {
  actions.setWebpackConfig({
    devtool: '',
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

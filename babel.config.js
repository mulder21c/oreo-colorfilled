module.exports = api => {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["> 1%", "last 2 versions", "IE >= 11"]
        },
        useBuiltIns: "usage",
        corejs: 3,
        debug: true,
        shippedProposals: true
      }
    ]
  ];
  const plugins = [];

  return {
    presets,
    plugins,
  }
}
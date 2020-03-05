module.exports = api => {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        debug: true,
        shippedProposals: true
      }
    ]
  ];
  const plugins = [
    "@babel/plugin-transform-runtime",
    "syntax-async-functions",
  ];

  return {
    presets,
    plugins,
  }
}
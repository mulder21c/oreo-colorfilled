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
    [
      "@babel/plugin-transform-runtime",
      { 
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
      },
    ],
    "syntax-async-functions",
  ];

  return {
    presets,
    plugins,
  }
}
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        oneOf: [
          {
            use: [
              {
                loader: "@svgr/webpack",
                options: {
                  svgo: true,
                },
              },
            ],
            // We don't want to use SVGR loader for non-React source code
            // ie we don't want to use SVGR for CSS files...
            issuer: {
              and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
          },
        ],
      },
    ],
  },
};

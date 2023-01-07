module.exports = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.google.com",
      },
    ],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en-GB", "en-US", "fr", "nl-NL"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-GB",
  },
};

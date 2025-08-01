import boundaries from "eslint-plugin-boundaries";

export const eslintBoundariesConfig = {
  plugins: {
    boundaries,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/elements": [
      { type: "app", pattern: "src/app" },
      { type: "pages", pattern: "src/pages/*" },
      { type: "widgets", pattern: "src/widgets/*" },
      { type: "features", pattern: "src/features/*" },
      { type: "entities", pattern: "src/entities/*" },
      { type: "shared", pattern: "src/shared/*" },
    ],
  },
  rules: {
    "boundaries/element-types": [
      "error",
      {
        default: "allow",
        rules: [
          {
            from: "shared",
            disallow: ["entities", "features", "widgets", "pages", "app"],
            message:
              "A lower-layer module (${file.type}) cannot import a higher-layer module (${dependency.type})",
          },
          {
            from: "entities",
            disallow: ["features", "widgets", "pages", "app"],
            message:
              "A lower-layer module (${file.type}) cannot import a higher-layer module (${dependency.type})",
          },
          {
            from: "features",
            disallow: ["widgets", "pages", "app"],
            message:
              "A lower-layer module (${file.type}) cannot import a higher-layer module (${dependency.type})",
          },
          {
            from: "widgets",
            disallow: ["pages", "app"],
            message:
              "A lower-layer module (${file.type}) cannot import a higher-layer module (${dependency.type})",
          },
        ],
      },
    ],
    "boundaries/entry-point": [
      "error",
      {
        default: "disallow",
        message:
          "Modules of type '${file.type}' must import '${dependency.type}' via its public API only. Import from '${dependency.source}' is not allowed.",
        rules: [
          {
            target: ["shared", "entities", "features", "widgets"],
            allow: ["**/index.ts", "**/index.tsx", "**/*.page.tsx"],
          },
          {
            target: ["app", "pages"],
            allow: ["**"],
          },
        ],
      },
    ],
  },
};

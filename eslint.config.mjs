// ESLint 9 flat config.
// Replaces the legacy .eslintrc.json ("extends": "next/core-web-vitals").
//
// eslint-config-next 16 ships a flat-config array, so it can be spread directly
// instead of going through FlatCompat.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextCoreWebVitals,
  {
    // Generated output, vendored assets and local-only artefacts.
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'archive/**',
      'design-analysis/**',
    ],
  },
];

export default config;

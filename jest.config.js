module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/transformers/assetsTransformer.js',
    '\\.svg$': '<rootDir>/jest/transformers/svgTransformer.js',
  },
  setupFilesAfterEnv: [
    './jest/setupTests.ts',
    '@testing-library/jest-native/extend-expect',
  ],
}

/* eslint-disable camelcase */
const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const backend = [
  ...common,
  'tests/app/backend/features/**/*.feature',
  '--require tests/app/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  backend: backend
};

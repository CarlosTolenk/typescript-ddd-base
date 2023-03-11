import convict from 'convict';

const configBasic = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The Mongo connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017/backend-dev'
    }
  }
});

configBasic.loadFile([`${__dirname}/default.json`, `${__dirname}/${configBasic.get('env')}.json`]);

export default configBasic;

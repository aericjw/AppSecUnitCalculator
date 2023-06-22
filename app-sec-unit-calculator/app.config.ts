import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://xle26845.sprint.apps.dynatracelabs.com/',
  app: {
    name: 'AppSec Unit Calculator',
    version: '1.0.0',
    description: 'A simple projection calculator to estimate ASU consumption',
    id: 'my.app.sec.unit.calculator',
    scopes: [{ name: 'storage:logs:read', comment: 'default template' }, { name: 'storage:buckets:read', comment: 'default template' }, { name: 'environment-api:entities:read', comment: 'default template'}]
  },
};

module.exports = config;
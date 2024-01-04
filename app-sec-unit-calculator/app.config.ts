import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://<environmentID>.apps.dynatrace.com/',
  app: {
    name: 'AppSec Unit Calculator',
    version: '1.1.0',
    description: 'A simple projection calculator to estimate ASU consumption',
    id: 'my.app.sec.unit.calculator',
    scopes: [{ name: 'environment-api:entities:read', comment: 'Read Entities'}]
  },
};

module.exports = config;
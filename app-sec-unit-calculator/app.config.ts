import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://xle26845.sprint.apps.dynatracelabs.com/',
  app: {
    name: 'AppSec Unit Calculator',
    version: '0.0.0',
    description: 'A starting project with routing, fetching Grail™ data, and charting',
    id: 'my.app.sec.unit.calculator',
    scopes: [{ name: 'storage:logs:read', comment: 'default template' }, { name: 'storage:buckets:read', comment: 'default template' }, { name: 'environment-api:entities:read', comment: 'default template'}]
  },
};

module.exports = config;
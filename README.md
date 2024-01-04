# Application Security Unit Calculator for Dynatrace
A simple projection calculator to estimate ASU consumption in your Dynatrace Environment prior to enabling Application Security

Read more about Application Security Licensing:
 [Classic Licensing](https://docs.dynatrace.com/docs/shortlink/application-security-units)
 [DPS](https://docs.dynatrace.com/docs/shortlink/dps-appsec)
## Prerequisites (Custom App)

The Dynatrace App Toolkit is necessary to deploy an application to your Dynatrace Environment
```
cd AppSecUnitCalculator/app-sec-unit-calculator
npm install
```

Configure `app.config.ts` to point to your Dynatrace Environment URL

```
import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://<environmentID>.apps.dynatrace.com/',
  app: {
    name: 'AppSec Unit Calculator',
    version: '1.0.0',
    description: 'A simple projection calculator to estimate ASU consumption',
    id: 'my.app.sec.unit.calculator',
    scopes: [{ name: 'environment-api:entities:read', comment: 'Read Entities'}]
  },
};

module.exports = config;
```

Deploy Dynatrace App (run command inside app-sec-unit-calculator directory)
```
npm run deploy
```

## Prerequisites (Command Line)
This script will require an API token created from your Dynatrace environment with the `entities.read` scope

It will also require your tenant URL to be supplied without any leading slashes:

:white_check_mark: https://abc1234.live.dynatrace.com

:x: https://def5678.live.dynatrace.com/

The script reads from the following environment variables:

`DYNATRACE_ENV_URL` - for the URL

`DYNATRACE_API_TOKEN` - for the API token

## Entities considered for calculation
This calculator only considers Hosts that are currently running, have memory properties detected, and have a Node.js, .NET, Golang, Java, PHP, or Kubernetes process running on it.

> PLEASE NOTE: The calculator uses Dynatrace's Monitored Entities API to get host information. Due to API limitations, this calculator is likely to slightly overestimate projections. It's also not going to include any use of monitoring rules (see below)

### Monitoring Rules
Projections will be done for every host in the environment, but you may use monitoring rules to only specify where Application Security is enabled:

[Third-Party Vulnerability Monitoring Rules (RVA)](https://docs.dynatrace.com/docs/shortlink/tpv-monitoring-rules)

[Code-Level Vulnerability Monitoring Rules (RVA)](https://docs.dynatrace.com/docs/shortlink/clv-monitoring-rules)

[Application Protection Monitoring Rules (RAP)](https://docs.dynatrace.com/docs/shortlink/attack-rules)

## Support Policy
THIS IS NOT PART OF THE DYNATRACE PRODUCT. This is meant to be a simple way to provide a projection on ASU consumption.

## Current Development
A Dynatrace Custom App is currently being developed, all the relevant files are in the app-sec-unit-calculator directory.


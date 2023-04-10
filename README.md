# Application Security Unit Calculator for Dynatrace
A simple projection calculator to estimate ASU consumption in your Dynatrace Environment prior to enabling Application Security

## Prerequisites
This script will require an API token created from your Dynatrace environment with the `entities.read` scope

It will also require your tenant URL to be supplied without any leading slashes:

:white_check_mark: https://abc1234.live.dynatrace.com

:x: https://def5678.live.dynatrace.com/

The script reads from the following environment variables:

`DT_URL` - for the URL

`DT_API_TOKEN` - for the API token

## Support Policy
THIS IS NOT PART OF THE DYNATRACE PRODUCT. This is meant to be a simple way to provide a projection on ASU consumption.

## Future Development
The project is currently a command line script, which requires installing python and other modules which isn't always ideal or allowed. In development is a web-based Single Page Application (SPA) that can take the URL and API Token then print a resulting forecast through the browser.
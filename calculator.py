#!/usr/bin python3
import requests
import math
import os

# Step 1 - get all entityIDs from /?pageSize=2000&entitySelector=type(HOST),state(RUNNING),memoryTotal.exists()&from=now-365d&to=now&fields=+properties.memoryTotal
# Step 2 - get all physicalMemory from hosts with a state of "RUNNING"
# Step 3 - for each host, calculate the application security unit based off physicalMemory
# Calculation table - https://www.dynatrace.com/support/help/shortlink/application-security-units#how-capabilities-affect-monitoring-consumption
# Step 4 - show calculations for RVA and RVA & RAP options
# Step 4a - after 80gb it follows the N x 16 rule, so after 80gb it will be 96, 112, etc. basically you can take the ram size and divide by 16

def getEntityIDs(envUrl, token):
    api_token = "Api-Token " + token
    headers = {
        "Accept": "application/json; charset=utf8",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Authorization": api_token
    }
    # Entity Selector grabs all HOSTs that are in a RUNNING state and have the memoryTotal attribute defined
    # memoryTotal is an added property returned by the web request so we don't have to do any additional calls
    # paasMemoryLimit is the actual used limit when using application-only monitoring - https://www.dynatrace.com/support/help/manage/monitoring-consumption/application-and-infrastructure-monitoring#application-only-monitoring
    url = envUrl + "/api/v2/entities?pageSize=2000&entitySelector=type(HOST),state(RUNNING),memoryTotal.exists()&from=now-365d&to=now&fields=+properties.memoryTotal,+properties.paasMemoryLimit"
    entities = requests.get(url, headers=headers)
    return entities.json()['entities']

def getPhysicalMemory(envUrl, token, entities):
    RAMs = []
    for entity in entities:
        try:
            # the memoryTotal is in number of bytes, dividing by 1024^3 will represent that in GB, calculations are done on whole number of GB so math.ceil rounds up by whole number
            # example: 31700000000 bytes is 31.7 GB -> 32 GB of RAM after ceiling function
            if 'paasMemoryLimit' not in entity['properties']:
                RAM = int(math.ceil(int(entity['properties']['memoryTotal']) / (1024**3)))
            else:
                RAM = int(math.ceil(int(entity['properties']['paasMemoryLimit']) / (1024**3)))
            RAMs.append(RAM)
        except Exception as e:
            print(entity['entityId'])
            print(e)
    return RAMs

def calculateUnits(RAMs):
    RVA_estimate = 0
    RVA_RAP_estimate = 0
    for memory in RAMs:
        # can't divide by 16 when memory size is less than 16GB as we'll get fractions instead of whole numbers
        if memory < 4:
            RVA_estimate = RVA_estimate + 0.10
        elif memory >= 4 and memory < 8:
            RVA_estimate = RVA_estimate + 0.25
        elif memory >= 8 and memory < 16:
            RVA_estimate = RVA_estimate + 0.50
        else:
            RVA_estimate = RVA_estimate + (memory // 16)
    RVA_RAP_estimate = RVA_estimate * 2
    return (RVA_estimate, RVA_RAP_estimate)

def main(envUrl, token):
    entityIds = getEntityIDs(envUrl, token)
    RAMs = getPhysicalMemory(envUrl, token, entityIds)
    calculations = calculateUnits(RAMs)
    print("For Runtime Vulnerability Analytics, ASUs will be consumed at " + str(round(calculations[0],2)) + " units per hour")
    print("For Runtime Vulnerability Analytics and Runtime Application Protection, ASUs will be consumed at " + str(round(calculations[1],2)) + " units per hour")

def init():
    # DT_URL should not have the leading slash, example: https://guu84124.live.dynatrace.com
    envUrl = os.environ.get("DT_URL")
    # DT_API_TOKEN should have an API token with entities.read scope
    token = os.environ.get("DT_API_TOKEN")
    main(envUrl, token)

if __name__ == "__main__":
    init()
    
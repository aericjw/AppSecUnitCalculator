import React from "react";
import { useState, useEffect } from "react";
import { Flex, DataTable, TableColumn, useCurrentTheme, Heading, SingleValue } from "@dynatrace/strato-components-preview";
import { functions } from '@dynatrace-sdk/app-utils';

export const Home = () => {
  const theme = useCurrentTheme();
  const [monitoredEntities, setMonitoredEntities] = useState([])
  const [RVA, setRVA] = useState(0)
  const [RVARAP, setRVARAP] = useState(0)
  const columns: TableColumn[] = [
    {
      header: 'Host',
      accessor: 'displayName',
      ratioWidth: 1,
    },
    {
      header: 'Total Memory (GB)',
      accessor: 'properties.memoryTotal',
      ratioWidth: 1,
    },
    {
      header: 'AppSec Units (RVA only) per hour',
      accessor: 'appsecUnitRVA',
      ratioWidth: 1,
    },
    {
      header: 'AppSec Units (RVA + RAP) per hour',
      accessor: 'appsecUnitRVARAP',
      ratioWidth: 1
    }
  ];

  const getHostInformation = async () => {
    const response = await functions.call("get-running-hosts-information");
    const response_1 = await response.json();
    return response_1['entities'];
  }

  const calculateAppSecUnits = (memory) => {
    let RVA_estimate = 0
    let RVA_RAP_estimate = 0
        if (memory < 4){
            RVA_estimate = RVA_estimate + 0.10
        }
        else if (memory >= 4 && memory < 8){
            RVA_estimate = RVA_estimate + 0.25
        }
        else if (memory >= 8 && memory < 16){
            RVA_estimate = RVA_estimate + 0.50
        }
        else {
            RVA_estimate = RVA_estimate + Math.floor(memory / 16)
        }
        RVA_RAP_estimate = RVA_estimate * 2
    return [RVA_estimate, RVA_RAP_estimate]
  }

  useEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    getHostInformation().then((response) => {
      let RVA_estimate = 0
      let RVA_RAP_estimate = 0
      response.forEach((entity) => {
        entity.properties.memoryTotal = Math.ceil(entity.properties.memoryTotal / (1024 * 1024 * 1024))
        let calculations = calculateAppSecUnits(entity.properties.memoryTotal)
        RVA_estimate += calculations[0]
        RVA_RAP_estimate += calculations[1]
        entity.appsecUnitRVA = calculations[0]
        entity.appsecUnitRVARAP = calculations[1]
      })
      setMonitoredEntities(response)
      setRVA(RVA_estimate)
      setRVARAP(RVA_RAP_estimate)
    })
    return () => {
      abortController.abort();
    }
  }, [monitoredEntities])
  
  return (
    <Flex flexDirection="column" alignItems="center" padding={32}>
      <Heading>
        RVA Estimate
      </Heading>
      <SingleValue data={RVA}/>
      <Heading>
        RVA + RAP Estimate
      </Heading>
      <SingleValue data={RVARAP}/>
      <DataTable columns={columns} data={monitoredEntities} fullWidth>
        <DataTable.Toolbar>
          <DataTable.Toolbar.DownloadData/>
        </DataTable.Toolbar>
        <DataTable.Pagination defaultPageSize={20}/>
      </DataTable>
    </Flex>
  );
};

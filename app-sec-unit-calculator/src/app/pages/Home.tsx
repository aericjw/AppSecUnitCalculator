import React from "react";
import { Flex, useCurrentTheme, Heading, SingleValue } from "@dynatrace/strato-components-preview";
import { HostTable } from "../components/HostTable";
import { useEntitiesAPI } from "../hooks/useEntitiesAPI";

export const Home = () => {
  const [monitoredEntities, RVA, RVARAP] = useEntitiesAPI()
  return (
    <Flex flexDirection="column" alignItems="center" padding={32}>
      <Flex flexDirection="row">
        <Heading>
          RVA Estimate
        </Heading>
        <SingleValue data={RVA}/>
        <Heading>
          RVA + RAP Estimate
        </Heading>
        <SingleValue data={RVARAP}/>
      </Flex>
      <HostTable data={monitoredEntities}/>
    </Flex>
  );
};

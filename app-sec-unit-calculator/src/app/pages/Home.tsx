import React from "react";
import { Flex, Heading, SingleValue } from "@dynatrace/strato-components-preview";
import { HostTable } from "../components/HostTable";
import { useEntitiesAPI } from "../hooks/useEntitiesAPI";
import styled from 'styled-components';

export const Home = () => {
  const [monitoredEntities, RVA, RVARAP] = useEntitiesAPI()
  const StyledContainer = styled.div`
  width: 350px;
  height: 100px;
  margin-bottom: 16px;
`;
  return (
    <>
      <Flex flexDirection="column" alignItems="center" padding={32}>
        <Flex flexDirection="row">
          <StyledContainer>
            <Heading>RVA Estimate</Heading>
            <SingleValue data={RVA}/>
          </StyledContainer>
          <StyledContainer>
            <Heading>RVA + RAP Estimate</Heading>
            <SingleValue data={RVARAP}/>
          </StyledContainer>
        </Flex>
        <HostTable data={monitoredEntities}/>
      </Flex>
    </>
  );
};

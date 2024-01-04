import { useEffect, useState } from "react";
import { monitoredEntitiesClient } from '@dynatrace-sdk/client-classic-environment-v2';

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

export const useEntitiesAPI = (): [Object[], number, number] => {
    const [monitoredEntities, setMonitoredEntities] = useState<Object[]>([])
    const [RVA, setRVA] = useState<number>(0)
    const [RVARAP, setRVARAP] = useState<number>(0)
    useEffect(() => {
        const abortController = new AbortController();
        const abortSignal = abortController.signal;

        const config: Object = {
            entitySelector: "type(HOST),state(RUNNING),toRelationships.isProcessOf(type(PROCESS_GROUP_INSTANCE),softwareTechnologies.type(NODE_JS,DOTNET,GO,JAVA,KUBERNETES,PHP)),memoryTotal.exists()",
            from: "now-365d",
            to: "now",
            fields: "+properties.memoryTotal,+properties.paasMemoryLimit",
            abortSignal: abortSignal
        }

        monitoredEntitiesClient.getEntities(config)
        .then((response) => {
            let RVA_estimate = 0
            let RVA_RAP_estimate = 0
            response.entities?.forEach(entity => {
                if (entity.properties !== undefined){
                    entity.properties.memoryTotal = Math.ceil(entity.properties.memoryTotal / (1024 * 1024 * 1024))
                    let calculations = calculateAppSecUnits(entity.properties.memoryTotal)
                    RVA_estimate += calculations[0]
                    RVA_RAP_estimate += calculations[1]
                    entity['appsecUnitRVA'] = calculations[0]
                    entity['appsecUnitRVARAP'] = calculations[1]
                }
            })

            if (response.entities) {
                setMonitoredEntities(response.entities)
            }

            setRVA(RVA_estimate)
            setRVARAP(RVA_RAP_estimate)
        })
        return () => {
          abortController.abort();
        }
      }, [])
      return [monitoredEntities, RVA, RVARAP]
}


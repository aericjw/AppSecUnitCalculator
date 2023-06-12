import { monitoredEntitiesClient } from '@dynatrace-sdk/client-classic-environment-v2';
var get_running_hosts_information = async () => {
  const config: Object = {
    entitySelector: "type(HOST),state(RUNNING),memoryTotal.exists()",
    from: "now-365d",
    to: "now",
    fields: "+properties.memoryTotal,+properties.paasMemoryLimit"
  }
  return monitoredEntitiesClient.getEntities(config)
}
export {
  get_running_hosts_information as default
};
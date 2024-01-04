import  React  from 'react'
import { DataTable, TableColumn, TableUserActions } from '@dynatrace/strato-components-preview'
import { IntentPayload, sendIntent } from '@dynatrace-sdk/navigation'

interface HostTableProps {
    data: Object[]
}

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

export const HostTable = ({data}: HostTableProps) => {
    return (
        <DataTable columns={columns} data={data} fullWidth>
        <DataTable.Toolbar>
          <DataTable.DownloadData/>
        </DataTable.Toolbar>
        <DataTable.Pagination defaultPageSize={20}/>
        <DataTable.UserActions>
            <DataTable.CellActions column="displayName">
            {({ row }) => (
                <TableUserActions>
                <TableUserActions.Item
                    onSelect={() => {
                        const payload: IntentPayload = {
                            'dt.entity.host': data[row['id']]['entityId']
                        }
                        sendIntent(payload)
                    }}
                >
                    Open with...
                </TableUserActions.Item>
                </TableUserActions>
            )}
            </DataTable.CellActions>
        </DataTable.UserActions>
      </DataTable>
    )
}


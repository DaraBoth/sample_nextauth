"use client"
import React from 'react'
import { Table } from 'flowbite-react';
import { calculateMoney, functionRenderColumns } from "@/utils/CustomFn"
import { useSearchParams } from 'next/navigation';

export type Member = {
    group_id: number,
    id: number,
    mem_name: string,
    paid: number
}

export type Row = {
    id: number
    name: string
    paid: string
    remain: string
    unpaid: string
}

export type Column = {
    field: string
    headerName: string
    headerAlign: string
    align: string
    minWidth: number
    hideable: boolean
    width: string
}

const CustomTable = (props: { members: Member[], trips: any }) => {

    const { members, trips } = props;
    const { newData } = calculateMoney(members, trips);
    const rows: Row[] = newData;
    const columns: Column[] = functionRenderColumns(rows);

    return (
        <div className='overflow-x-auto shadow-lg rounded-xl max-h-96'>
            <Table hoverable striped >
                <Table.Head>
                    {columns.map((column) => {
                        return (
                            <React.Fragment key={column.headerName}>
                                <Table.HeadCell className={`text-${column.headerAlign} sticky top-0`}>{column.headerName}</Table.HeadCell>
                            </React.Fragment>
                        )
                    })}
                </Table.Head>
                <Table.Body className="divide-y overflow-y-auto">
                    {rows.map((row: any) => {
                        const rowKeys = Object.keys(row)
                        return (
                            <Table.Row key={row.id} className={`bg-white dark:border-gray-700 dark:bg-gray-800 `}>
                                {rowKeys.map((rowKey, index: number) => {
                                    return (
                                        <Table.Cell key={rowKey} className={`text-${columns[index].align} w-[${columns[index].width}] min-w-[${columns[index].minWidth}]`} >{row[rowKey]}</Table.Cell>
                                    )
                                })}
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}

export default CustomTable
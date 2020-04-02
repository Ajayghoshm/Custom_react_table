import React, { Fragment,useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
  useBlockLayout,
  useRowSelect
} from "react-table";
import { Styles, BlockStyles } from "./TableStyle";

import {
  GlobalFilterComponent,
  DefaultColumnFilterComponent,
  SelectColumnFilterComponent,
  SliderColumnFilterComponent,
  NumberRangeColumnFilterComponent,
  IndeterminateCheckboxComponent
} from "./Components";


import { fuzzyTextFilterFn, globalFilterFunction,numberFilterFunction,textFilterFunction} from "./Functions"

function Table({ columns, data }) {

  const [filterToggle, setfilterToggle] = useState(false)
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilterComponent
    }),
    []
  );

  const sortTypes = React.useMemo(
    () => ({
      custom: fuzzyTextFilterFn,
    }), [])




  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      custom: globalFilterFunction,
      text: textFilterFunction,
      number: numberFilterFunction,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    preGlobalFilteredRows,
    setGlobalFilter,
    prepareRow,
    state,
    state: { pageIndex, pageSize, selectedRowIds, sortby },
    page,
    canNextPage,
    canPerviousPage,
    nextPage,
    previousPage,
    setPageSize,
    gotoPage,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
      filterTypes,
      sortTypes,
      getRowId: React.useCallback(row => row.id, []),
      //globalFilter:"custom",
      manualSorting: true
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useBlockLayout,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: "selection",
          width:50,
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Fragment>
              <IndeterminateCheckboxComponent
                {...getToggleAllRowsSelectedProps()}
              />
            </Fragment>
          ),
          Cell: ({ row }) => (
            <Fragment>
              <IndeterminateCheckboxComponent
                {...row.getToggleRowSelectedProps()}
              />
            </Fragment>
          )
        },
        ...columns
      ]);
    }
  );

  return (
    <>
    <div style={{display:"flex",justifyContent:"space-between",borderTop:"1px solid black"}}>
      <GlobalFilterComponent
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <button onClick={()=>setfilterToggle(state=>!state)}>Toggle</button>
      </div>
      <BlockStyles>

      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup, i) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className="tr">
                  <div {...column.getSortByToggleProps()} className="th">
                    <div>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <>&darr;</>
                          : <>&uarr;</>	
                        : ""}
                    </span>
                    </div>
                  </div>
                  {filterToggle?<div>{column.canFilter ? column.render("Filter") : null}</div>:""}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell, i) => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      </BlockStyles>
      <div style={{display:"flex",justifyContent:"center"}}>
      <button onClick={() => previousPage()} disabled={!canPerviousPage}>
        Previous
      </button>
      <input
        type="number"
        defaultValue={pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(page);
        }}
      />
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        Next
      </button>
      </div>
      <pre>
        <code>{JSON.stringify({
          state,
          'selectedRows Ids': selectedFlatRows.map(
            d => d.original.id
          ),
        }, null, 2)}</code>
      </pre>
    </>
  );
}

export { Table }
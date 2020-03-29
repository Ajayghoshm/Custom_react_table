import React from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
  useBlockLayout,
  useRowSelect
} from "react-table";

import {
  GlobalFilterComponent,
  DefaultColumnFilterComponent,
  SelectColumnFilterComponent,
  SliderColumnFilterComponent,
  NumberRangeColumnFilterComponent,
  IndeterminateCheckboxComponent
} from "./Components";


import {fuzzyTextFilterFn,globalFilterFunction} from "./Functions"
function Table({ columns, data }) {
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
    }),[])

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      custom:globalFilterFunction,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
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
      globalFilter:"custom",
      manualSorting:true
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
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckboxComponent
                {...getToggleAllRowsSelectedProps()}
              />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckboxComponent
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          )
        },
        ...columns
      ]);
    }
  );

  return (
    <>
      <GlobalFilterComponent
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <div>{Object.keys(selectedRowIds)}</div>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup, i) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className="tr">
                  <div {...column.getSortByToggleProps()} className="th">
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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
      <pre>
        <code>{JSON.stringify({state,
          'selectedRows Ids': selectedFlatRows.map(
                d => d.original.id
              ),}, null, 2)}</code>
      </pre>
    </>
  );
}

export {Table}
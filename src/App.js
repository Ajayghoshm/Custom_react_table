import React from "react";
import {
  GlobalFilterComponent,
  DefaultColumnFilterComponent,
  SelectColumnFilterComponent,
  SliderColumnFilterComponent,
  NumberRangeColumnFilterComponent,
  IndeterminateCheckboxComponent
} from "./Components";
import matchSorter from "match-sorter";
import { Styles, BlockStyles } from "./TableStyle";
import makeData from "./makeData";
import {Table} from "./TableComponent"
import {customSort} from "./Functions"

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== "number";

function App() {

  const columns = React.useMemo(
    () => [


          {
            id:"hai",
            Header: "First Name",
            accessor: "firstName",
            minWidth: 150,
            filter:'fuzzyText',
            sortType: customSort,
            Cell:(props)=>{
            return <div>
            {props.cell.value.ajay}
            <h6>{props.cell.value.name}</h6>
              </div>}
          },

          {
            Header: "Custom",
            accessor: "custom",
            minWidth: 150,
            sortType: customSort,
            filter:"custom"
          },
          {
            Header: "Last Name",
            accessor: "lastName",
            sortType: customSort,
            minWidth: 150,
            // Use our custom `fuzzyText` filter on this column
            filter: "fuzzyText"
          },
          {
            Header: "Age",
            accessor: "age",
            minWidth: 150,
            Filter: SliderColumnFilterComponent,
            filter: "equals"
          },
          {
            Header: "Visits",
            accessor: "visits",
            minWidth: 150,
            Filter: NumberRangeColumnFilterComponent,
            filter: "between"
          },
          {
            Header: "Status",
            accessor: "status",
            minWidth: 150,
            Filter: SelectColumnFilterComponent,
            filter: "includes"
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
            minWidth: 150,
            Filter: SliderColumnFilterComponent,
            filter: filterGreaterThan
          }],
    []
  );

  const data = React.useMemo(() => makeData(100), []);

  return (
    <BlockStyles>
      <Table columns={columns} data={data} />
    </BlockStyles>
  );
}

export default App;

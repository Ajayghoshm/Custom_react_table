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
import { Table } from "./TableComponent"
import { customSort } from "./Functions"

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
        id: "ids",
        Header: "ID",
        accessor: "id",
        minWidth: 50,
        filter: 'number',
        sortType: customSort,
      },
      {
        id: "number",
        Header: "Number",
        accessor: "number",
        minWidth: 50,
        filter: 'number',
        sortType: customSort,
      },
      {
        id: "string",
        Header: "String",
        accessor: "string",
        minWidth: 50,
        filter: 'text',
        sortType: customSort,
      },
      {
        id: "boolean",
        Header: "Boolean",
        accessor: "boolean",
        minWidth: 150,
        filter: 'fuzzyText',
        sortType: customSort,
      },
      {
        Header: "Object",
        accessor: "object",
        minWidth: 150,
        //sortType: customSort,
        // you can have custom filter logic as per requirement, you can have array , object and combination of many,
        // Currently facing issue with component passed as an object
        filter: (rowvalues,id,filtervalue)=>{
          console.log("customeFilter",rowvalues)
          return rowvalues.filter(item=>{
            return item.values.object["ghosh"]===filtervalue?true:false
          })
        },
        Cell:(props)=>(<div>{props.cell.value.name}</div>)
      },
      {
        id: "Component",
        Header: "Component",
        accessor: "component",
        minWidth: 150,
        filter: 'component',
        sortType: customSort,
        Cell:(value)=> {
          return <a href="#">{value.cell.render(value.cell.value)}</a>
        },
      },


      {
        Header: "Normal",
        accessor: "lastName",
        sortType: customSort,
        minWidth: 150,
        // Use our custom `fuzzyText` filter on this column
        filter: "fuzzyText"
      },
      {
        Header: "Slider",
        accessor: "age",
        minWidth: 150,
        Filter: SliderColumnFilterComponent,
        filter: "equals"
      },
      {
        Header: "Number",
        accessor: "visits",
        minWidth: 150,
        Filter: NumberRangeColumnFilterComponent,
        filter: "between"
      },
      {
        Header: "Select",
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
    <>
    <div style={{display:"flex",justifyContent:"center"}}>
    <h3>Table Component</h3>
    </div>
      <Table columns={columns} data={data} />
    </>
  );
}

export default App;

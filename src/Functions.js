import matchSorter from 'match-sorter'
import React from "react"
function fuzzyTextFilterFn(rows, id, filterValue) {
    console.log("fzzy")
    return rows.filter(row => {
      console.log("each",row)
      const rowValue = row.values[id].ajay
      return rowValue !== undefined
        ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
        : true
    })
  }


  const globalFilterFunction=(rows,id,filterValue)=>{
    console.log("global",rows,id,filterValue)
    return rows
    }
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

  const customSort = ((rowA, rowB, columnId, desc) => {
      
      const value=desc
      ? rowA.values[columnId] <= rowB.values[columnId]
      : rowA.values[columnId] > rowB.values[columnId];
      console.log("desc",desc,value)
    return rowA.values[columnId] - rowB.values[columnId];
  });

  const numberFilterFunction = (rows, id, filterValue) => {
    console.log("numberFilter", id, rows, filterValue)
    return rows.filter(row => {
      const rowValue = row.values[id]
      console.log("number", rowValue)
      return rowValue !== undefined && rowValue.toString().indexOf(filterValue)
        ? false
        : true
    })
  }

  const textFilterFunction = (rows, id, filterValue) => {
    return rows.filter(row => {
      const rowValue = row.values[id]
      return rowValue !== undefined
        ? String(rowValue)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase())
        : true
    })
  }



  export {globalFilterFunction,fuzzyTextFilterFn,customSort,numberFilterFunction,textFilterFunction}
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
  const customFilter=(rows,id,filterValue)=>{
  console.log("custom",rows,id,filterValue)
  return rows
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


  export {globalFilterFunction,fuzzyTextFilterFn,customSort}
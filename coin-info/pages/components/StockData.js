import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './StockColumns'

export function StockData(props) {
  const [mostActiveStock, setStocks] = React.useState([]);

  const fetchStocks = async () => {

    const response = await axios.get("https://financialmodelingprep.com/api/v3/stock/actives?apikey=5ad03cf4649705c9cdf569f3edc1f6a1", {
    }).catch(err => console.log(err));

    
    if(response) {
      const { mostActiveStock = [] } = response.data;

      console.log("Stocks: ", mostActiveStock);
      setStocks(mostActiveStock);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const stocksData = useMemo(() => [...mostActiveStock], [mostActiveStock]);

  const tableInstance = useTable( { columns: COLUMNS, data: stocksData });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <table className="vert-spacing mb-auto table table-dark px-3 table-hover" {...getTableProps()}>
      <thead className="table-bordered">
        {headerGroups.map((headerGroup,) => (
          <tr className="table-body-color" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                { column.render("Header") }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, idx) => (
                <td {...cell.getCellProps()}>
                  { cell.render("Cell") }
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};
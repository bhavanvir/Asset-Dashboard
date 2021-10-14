import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './CoinColumns'

export function CoinData(props) {
  const [coins, setCoins] = React.useState([]);

  const fetchCoins = async () => {

    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "cad",
        per_page: "250",
        page: "1",
        sparkline: "true"
      }
    }).catch(err => console.log(err));

    if(response) {
      const coins = response.data;

      console.log("Coins: ", coins);
      setCoins(coins);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const coinsData = useMemo(() => [...coins], [coins]);

  const tableInstance = useTable( { columns: COLUMNS, data: coinsData });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <table className="vert-spacing mb-auto table table-dark px-3 container-animation" {...getTableProps()}>
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
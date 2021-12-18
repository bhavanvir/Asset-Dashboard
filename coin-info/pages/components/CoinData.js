import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './CoinColumns'

export function CoinData(props) {
  const [coins, setCoins] = React.useState([]);

  const fetchCoins = async () => {

    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "cad",
        per_page: "100",
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable( 
    { columns: COLUMNS, 
      data: coinsData 
    },
      useSortBy
    )
  return (
    <table className="vert-spacing mb-auto table table-dark px-3 table-hover" {...getTableProps()}>
      <thead className="th-align-left">
        {headerGroups.map((headerGroup,) => (
          <tr className="table-body-color" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                { column.render("Header") }
                <span {...column.getSortByToggleProps()}>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? 
                          <svg className="th-align-left" focusable="false" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                          </svg>
                        : 
                          <svg className="th-align-left" focusable="false" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                          </svg>
                        : ''
                    }
                  </span>
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
import React from "react";

const formatPercent = number => 
    `${new Number(number).toFixed(2)}%`

const formatDollar = (number, maximumSignificantDigits) =>
  new Intl.NumberFormat(
    'en-CA', 
    { 
      style: 'currency', 
      currency: 'CAD',
      maximumSignificantDigits
    })
    .format(number);

export const COLUMNS = [
  {
    Header: '#',
    id: 'number',
    accessor: d => (
      <div className="th-align-left">
        {d.market_cap_rank}
      </div>
    ),
  },

  {
    Header: 'Name',
    id: 'name',
    accessor: d => (
      <div className="row">
        <div className="center block th-align-left id-text">
          <img
            src={d.image}
            style={{ width: 25, height: 25, marginRight: 20, marginLeft: 10 }} />
          {d.name}
        </div>
      </div>
    ),
  },

  {
    Header: '',
    id: 'sym',
    
    accessor: d => (
        <div className="th-align-left th-upper-case">
          {d.symbol}
        </div>
    ),
  },

  {
    Header: 'Price',
    id: 'price',
    accessor: d => (
      <div className="th-align-left">
        {formatDollar(d.current_price,20)}
      </div>
    ),
  },
  
  {
    Header: '24%',
    id: '24_percentage',
    accessor: d => (
      <div className="th-align-left">
        <span
          className={
            d.price_change_percentage_24h < 0
              ? "text-danger"
              : "text-success"
          }
        >
          {" "}
          {d.price_change_percentage_24h < 0 ? (
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          ) : (
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg>
          )}
          {formatPercent(Math.abs(d.price_change_percentage_24h))}
        </span>
      </div>
    ),
  },

  {
    Header: '24h Change',
    id: '24h_change',
    accessor: d => (
      <div className="th-align-left">
        <span
          className={
            d.price_change_24h < 0
              ? "text-danger"
              : "text-success"
          }
        >
          {" "}
          {d.price_change_24h < 0 ? (
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          ) : (
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg>
          )}
          {formatDollar(Math.abs(d.price_change_24h))}
        </span>
      </div>
    ),
  },

  {
    Header: '24_volume',
    id: '24h_volume',
    accessor: d => (
      <div className="th-align-left">
        {formatDollar(d.total_volume, 12)}
      </div>
    ),
  },

  {
    Header: 'Market Cap',
    id: 'market_cap',
    accessor: d => (
      <div className="th-align-left">
        {formatDollar(d.market_cap, 12)}
      </div>
    ),
  }
]
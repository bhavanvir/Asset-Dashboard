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
    accessor: d => (
      <div className="center">
        {d.market_cap_rank}
      </div>
    ),
  },
  {
    Header: 'Coin',
    accessor: d => (
      <div className="row">
        <div className="center block th-align-left coin-id-text">
          <img
            src={d.image}
            style={{ width: 25, height: 25, marginRight: 20, marginLeft: 10 }} />
          {d.name}
        </div>
        <div className="center block th-align-right th-upper-case">
          {d.symbol}
        </div>
      </div>
    ),
  },
  {
    Header: 'Price',
    accessor: d => (
      <div className="center th-align-right">
        {formatDollar(d.current_price,20)}
      </div>
    ),
  },
  {
    Header: '24 %',
    accessor: d => (
      <div className="center th-align-right">
        <span
            className={d.price_change_percentage_24h > 0 ? (
            'text-success'
            ) : 'text-danger'}
        >
        {formatPercent(d.price_change_percentage_24h)}
        </span>
      </div>
    ),
  },
  {
    Header: '24h Change',
    accessor: d => (
      <div className="center th-align-right">
        <span
          className={d.price_change_24h > 0 ? (
          'text-success' 
          ) : 'text-danger'}
      >
      {formatDollar(d.price_change_24h, 6)}
      </span>
      </div>
    ),
  },
  {
    Header: '24h Volume',
    accessor: d => (
      <div className="center th-align-right">
        {formatDollar(d.total_volume, 12)}
      </div>
    ),
  },
  {
    Header: 'Market Cap',
    accessor: d => (
      <div className="center th-align-right">
        {formatDollar(d.market_cap, 12)}
      </div>
    ),
  }
]
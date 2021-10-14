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
    Header: () => (
      <div style={{ textAlign: "left", marginLeft: 10 }}>Coins</div>
    ),
    id: 'coin',
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
    Header: () => (
      <div style={{ textAlign: "right" }}>Price</div>
    ),
    id: 'price',
    accessor: d => (
      <div className="center th-align-right">
        {formatDollar(d.current_price,20)}
      </div>
    ),
  },
  {
    Header: () => (
      <div style={{ textAlign: "right" }}>24 %</div>
    ),
    id: '24_percentage',
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
    Header: () => (
      <div style={{ textAlign: "right" }}>24h Change</div>
    ),
    id: '24h_change',
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
    Header: () => (
      <div style={{ textAlign: "right" }}>24h Volume</div>
    ),
    id: '24h_volume',
    accessor: d => (
      <div className="center th-align-right">
        {formatDollar(d.total_volume, 12)}
      </div>
    ),
  },
  {
    Header: () => (
      <div style={{ textAlign: "right" }}>Market Cap</div>
    ),
    id: 'market_cap',
    accessor: d => (
      <div className="center th-align-right">
        {formatDollar(d.market_cap, 12)}
      </div>
    ),
  }
]
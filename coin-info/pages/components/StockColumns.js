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
    Header: () => (
      <div style={{ textAlign: "left" }}>Companies</div>
    ),
    id: 'company',
    accessor: d => (
      <div className="row">
        <div className="center block th-align-left id-text">
          {d.companyName}
        </div>
        <div className="center block th-align-right th-upper-case">
          {d.ticker}
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
        {formatDollar(d.price, 4)}
      </div>
    ),
  },
  {
    Header: () => (
      <div style={{ textAlign: "right" }}>24h %</div>
    ),
    id: '24_percentage',
    accessor: d => (
      <div className="center th-align-right">
        <span
            className={d.changesPercentage > 0 ? (
            'text-success'
            ) : 'text-danger'}
        >
        {formatPercent(d.changesPercentage)}
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
          className={d.changes > 0 ? (
          'text-success' 
          ) : 'text-danger'}
      >
      {formatDollar(d.changes)}
      </span>
      </div>
    ),
  },
]
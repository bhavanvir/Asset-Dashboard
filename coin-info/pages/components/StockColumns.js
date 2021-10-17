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
      <div style={{ textAlign: "left" }}>Company</div>
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
          className={
            d.changesPercentage < 0
              ? "text-danger"
              : "text-success"
          }
        >
          {" "}
          {d.changesPercentage < 0 ? (
            <div>
              <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
            </div>
          ) : (
            <div >
              <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
              </svg>
            </div>
          )}
          {formatDollar(Math.abs(d.changesPercentage))}
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
          className={
            d.changes < 0
              ? "text-danger"
              : "text-success"
          }
        >
          {" "}
          {d.changes < 0 ? (
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          ) : (
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg>
          )}
          {formatDollar(Math.abs(d.changes))}
        </span>
      </div>
    ),
  },
]
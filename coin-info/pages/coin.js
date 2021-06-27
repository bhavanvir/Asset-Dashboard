import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
import Link from 'next/link'
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const {data} = props.result;
  console.log(data)
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Twofold: Stock and Cryptocurrency Prices</title>
      </Head>

    <body class="d-flex h-100 text-white bg-dark">
        <div class="d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header class="mb-auto">
                <div>
                    <h3 class="float-md-start mb-0">Twofold</h3>
                    <nav class="nav nav-masthead justify-content-center float-md-end">
                        <Link href="/">
                            <a class="nav-link">Home</a>
                        </Link>
                        <a class="nav-link" href="#">Stocks</a>
                        <a class="nav-link active" aria-current="page">Coins</a>
                        <a class="nav-link" href="#">About</a>
                    </nav>
                </div>
            </header>

            <main class="px-3 container">
                <div class="table-responsive">
                    <table class="mb-auto table table-hover table-dark px-3 container">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h %</th>
                        <th>24h Change</th>
                        <th>Market cap</th>
                        <th>Total Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(coins => (
                        <tr key={coins.id}>
                            <td>
                            <img 
                                src={coins.image} 
                                style={{width: 25, height: 25, marginRight: 10}} 
                            />
                            {coins.symbol.toUpperCase()}
                            </td>
                            <td>{formatDollar(coins.current_price, 20)}</td>
                            <td> 
                                <span
                                    className={coins.price_change_percentage_24h > 0 ? (
                                    'text-success' 
                                    ) : 'text-danger'}
                                >
                                {formatDollar(coins.price_change_percentage_24h)}
                                </span>
                            </td>
                            <td>
                                <span
                                    className={coins.price_change_24h > 0 ? (
                                    'text-success' 
                                    ) : 'text-danger'}
                                >
                                {formatDollar(coins.price_change_24h, 6)}
                                </span>
                            </td>
                            <td>{formatDollar(coins.market_cap, 12)}</td>
                            <td>{formatDollar(coins.total_volume, 12)}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </main>
        </div>
    </body>
    </div>
  )
}

export async function getServerSideProps(context) {
  const result = await coinGeckoClient.coins.markets({
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
    vs_currency: 'cad'
  });
  return {
    props: {
      result
    },
  }
}
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/favicon-32x32.png'
import CoinGecko from 'coingecko-api';
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

    <body className="d-flex h-100 text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"> 
            <header className="mb-auto">
                <div>
                    <a href="/">
                      <img className="float-md-start mb-0 img-icons" src={Logo}/>
                    </a>
                    <h3 className="float-md-start mb-0">Twofold</h3>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                        <Link href="/">
                            <a className="nav-link">Home</a>
                        </Link>
                        <Link href="/stock">
                        <a className="nav-link" href="#">Stocks</a>
                        </Link>
                        <a className="nav-link active" aria-current="page">Coins</a>
                        <a className="nav-link" href="#">About</a>
                    </nav>
                </div>
            </header>
            <main className="px-3 container">
                <div className="table-responsive">
                    <table className="vert-spacing mb-auto table table-dark px-3 container" >
                    <thead className="table-bordered">
                        <tr className="table-body-color">
                        <th>Coin</th>
                        <th>Price</th>
                        <th>24h %</th>
                        <th>24h Change</th>
                        <th>24h Volume</th>
                        <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(coins => (
                        <tr key={coins.id}>
                            <td className="coin-id-text" align="left">
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
                                {formatPercent(coins.price_change_percentage_24h)}
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
                            <td>{formatDollar(coins.total_volume, 12)}</td>
                            <td align="right">{formatDollar(coins.market_cap, 12)}</td>
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

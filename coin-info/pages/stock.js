import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/favicon-32x32.png'

export default function Home({ data }) {
  const { mostActiveStock = []} = data;

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
                        <a className="nav-link active" aria-current="page">Stocks</a>
                        <Link href="/coin">
                        <a className="nav-link">Coins</a>
                        </Link>
                        <a className="nav-link" href="#">About</a>
                    </nav>
                </div>
            </header>
            <main className="px-3 container">
                <div className="table-responsive">
                    <table className="vert-spacing mb-auto table table-dark px-3 container" >
                    <thead className="table-bordered">
                        <tr className="table-body-color">
                        <th>Ticker</th>
                        <th>Company Name</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>24h %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mostActiveStock.map(stock => (
                            <tr key={stock.ticker}>
                                <td className="coin-id-text" align="left">{stock.ticker}</td>
                                <td>{stock.companyName}</td>
                                <td>{formatDollar(stock.price, 4)}</td>
                                <td> 
                                <span
                                    className={stock.changes > 0 ? (
                                        'text-success'
                                    ) : 'text-danger'}
                                >
                                    {formatDollar(stock.changes)}
                                </span>
                            </td>
                                <td> 
                                <span
                                    className={stock.changesPercentage > 0 ? (
                                        'text-success'
                                    ) : 'text-danger'}
                                >
                                    {formatPercent(stock.changesPercentage)}
                                </span>
                            </td>
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
    const res = await fetch('https://financialmodelingprep.com/api/v3/stock/actives?apikey=5ad03cf4649705c9cdf569f3edc1f6a1');
    const data = await res.json();
  
    return {
      props: {
        data
      },
    }
}
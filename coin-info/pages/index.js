import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/favicon-32x32.png'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twofold: Stock and Cryptocurrency Prices</title>
      </Head>

      <body className="d-flex h-100 text-center text-white bg-dark">
        <div className="d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header className="nav-bar-container mx-auto w-100 mb-auto container-animation">
                <div>
                    <img className="float-md-start mb-0 img-icons" src={Logo}/>
                    <h3 className="float-md-start mb-0">Twofold</h3>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                      <a className="nav-link active" aria-current="page">Home</a>
                      <Link href="/stock">
                      <a className="nav-link" href="#">Stocks</a>
                      </Link>
                      <Link href="/coin">
                        <a className="nav-link">Coins</a>
                      </Link>
                      <a className="nav-link" href="#">About</a>
                    </nav>
                </div>
            </header>
        
            <main>
                <div className="typewriter">
                    <h1>Manage your assets.</h1>
                </div>
                <div className="homeParagraph container-animation">
                    <p>Twofold is an online platform for Stock and Cryptocurrency. Track the progress of your favourite assets with accurate and regularly updated figures.</p>
                </div>
            </main>

            <footer className="mt-auto text-white-50 container-animation">
                <p>Developed by <a href="https://github.com/bhavanvir" className="text-white">@bhavanvir</a> and <a href="https://github.com/alexwholland" className="text-white">@alexwholland</a>.</p>
            </footer>
        </div>
    </body>
    </div>
  )
}

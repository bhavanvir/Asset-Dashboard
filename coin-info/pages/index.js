import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twofold: Stock and Cryptocurrency Prices</title>
      </Head>

      <body class="d-flex h-100 text-center text-white bg-dark">
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header class="mb-auto">
                <div>
                    <h3 class="float-md-start mb-0">Twofold</h3>
                    <nav class="nav nav-masthead justify-content-center float-md-end">
                      <a class="nav-link active" aria-current="page">Home</a>
                      <a class="nav-link" href="#">Stocks</a>
                      <Link href="/coin">
                        <a class="nav-link">Coins</a>
                      </Link>
                      <a class="nav-link" href="#">About</a>
                    </nav>
                </div>
            </header>
        
            <main class="px-3 container">
                <div class="typewriter">
                    <h1>Manage your assets.</h1>
                </div>
                <p class="lead">Twofold is an online platform for Stock and Cryptocurrency. Track the progress of your favourite assets with accurate and regularly updated figures.</p>
            </main>

            <footer class="mt-auto text-white-50">
                <p>Developed by <a href="https://github.com/bhavanvir" class="text-white">@bhavanvir</a> and <a href="https://github.com/alexwholland" class="text-white">@alexwholland</a>.</p>
            </footer>
        </div>
    </body>
    </div>
  )
}
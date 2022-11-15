import Head from 'next/head';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import { GlobalContext } from "../context/GlobalContext";
import Card from "../HOC/Card";
import Layout from "../widget/Layout";

export const getServerSideProps = async () => {
  let res = await fetch(`http://service-example.sanbercloud.com/api/product`)
  let product = await res.json();

  return {
    props : {
      product
    }
  }
}

export default function Home({product}) {
  const [dataProduct, setDataProduct] = useState(product);
  const [indexLimit, setIndexLimit] = useState(8);

  /* indikator */
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [randomIndex, setRandomIndex] = useState(null);

  const {state} = useContext(GlobalContext);
  let {fetchStatus, setFetchStatus} = state;

  useEffect(() => {
    if(fetchStatus) {
      fetchDataRealtime();
      setFetchStatus(false);
    }

    if (product !== null) {
      let filter = product.filter(result => {
        return result.available === 1;
      })
      
      let random = Math.floor(Math.random() * filter.length);
      // console.info(random)

      setRandomIndex(random);
    }
  }, [fetchStatus, setFetchStatus]);

  const fetchDataRealtime = () => {
    axios.get('http://service-example.sanbercloud.com/api/product')
      .then(result => {
        let dataProductRealtime = result.data;
        setDataProduct(dataProductRealtime);
      })
      .catch(error => {
        console.info(error);
      })
  }

  const handleCounterFilter = () => {
    setDisplaySpinner(true);
    setTimeout(()=>{
      setIndexLimit(indexLimit += 8)
      setDisplaySpinner(false)
    }, 1200)
  }

  // console.info(dataProduct);
  
  return (
    <>
      <Head>
        <title>Atlantis Store</title>
        <meta name="description" content="Atlantis Store"/>
        <link rel="icon" href="/atl_icon.png" />
      </Head>
      <Layout>
        <div className="lg:mx-10">
          <Banner/>
          <br/>
          <hr/>
          <div className="my-14 mx-7 lg:mx-5">
            <h1 className="text-2xl font-bold">Produk Rekomendasi</h1>
          </div>
          <div className="flex flex-wrap gap-10 justify-center items-center">
            {dataProduct.length !== 0 && dataProduct.filter((result,index) => {
              return result.available === 1 && index > randomIndex && index < randomIndex + 4
            }).map(result => {
              return (
                <Card
                  key={result.id}
                  data={result}
                />
              )
            })}
          </div>
          <div className="my-16 mx-7 lg:mx-5">
            <h1 className="font-bold text-2xl">Semua Produk</h1>
          </div>
          <div className="flex flex-wrap gap-10 justify-center items-center">
            {dataProduct.length !== 0 && dataProduct.filter((result,index) => {
              return result.available === 1 && index < indexLimit;
            }).map(result => {
              return (
                <Card
                  key={result.id}
                  data={result}
                />
              )
            })}
          </div>
          {!displaySpinner && (
            <div className="container flex w-full justify-center items-center mx-auto my-20">
              <button onClick={handleCounterFilter} type="button" className="flex py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Load more
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l-4 4m0 0l-4-4m4 4V3"></path></svg>
              </button>
            </div>
          )}
          {displaySpinner && (
            <div className="container flex w-full justify-center items-center mx-auto my-20" role="status">
              <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

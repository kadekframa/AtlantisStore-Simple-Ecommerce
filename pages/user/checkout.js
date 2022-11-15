import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CardCheckout from "../../HOC/CardCheckout";
import Layout from "../../widget/Layout";


const Checkout = () => {
  let {state, handleFunction} = useContext(GlobalContext);
  let {
    user, setUser,
    fetchCheckoutStatus, setFetchCheckoutStatus,
    getCheckoutUser, setGetCheckoutUser,
    dataCheckoutUser, setDataCheckoutUser,
  } = state;
  let {
    fetchCheckOutUser,
    formatRupiah,
    sumTotal,
    quantityAllProductCheckout,
  } = handleFunction;

  // console.info(dataCheckoutUser);

  useEffect(() => {
    if (Cookies.get('token_user') !== undefined) {
      if (user === undefined) {
        setUser(JSON.parse(Cookies.get('user')))
      }
    }

    if (user !== undefined) {
      if (fetchCheckoutStatus) {
        fetchCheckOutUser();
        setFetchCheckoutStatus(false)
      }
    }

  }, [user, setUser, fetchCheckoutStatus, setFetchCheckoutStatus, fetchCheckOutUser])

  return (
      <Layout>
        <div className="h-full mx-0 lg:mx-56">
          <div className="container mx-auto mt-10 mb-6">
            <h1 className="text-2xl font-bold text-gray-700 pl-2 sm:pl-0">Keranjang</h1>
          </div>
          {/* {dataProduct !== null && ( */}
            <div className="mb-10">
              <div className={["grid grid-cols-1 lg:grid-cols-checkout-product md:grid-cols-checkout-product gap-2 sm:gap-16 w-full bg-white px-2 md:px-0 lg:px-0 h-full "]}>

                <div className="flex flex-col w-full border-t-4 border-gray-100">
                {dataCheckoutUser !== null && dataCheckoutUser.map(result => {
                  return (
                    <CardCheckout
                      key={result.id}
                      product_name={result.product.product_name}
                      terjual={result.product.stock_to_checkout}
                      rating={result.product.rating}
                      imageProduct={result.product.image_url}
                      deskripsi={result.product.description}
                      price={result.unit_price}
                      qty={result.quantity}
                    />
                  )
                })}
                </div>

                <div className="mt-6 sm:m-card-transaksi">
                  <div className="sticky mt-6 sm:mt-0 top-32 shadow-md shadow-gray-200 rounded-lg p-3">
                    <div className="border-b">
                      <h1 className="text-md font-bold text-gray-700">Ringkasan Belanja</h1>
                      <div className="flex justify-between items-center mt-3">
                        <h1 className="text-md text-gray-600">Total Harga ({dataCheckoutUser !== null && quantityAllProductCheckout(dataCheckoutUser)} barang)</h1>
                          {/* <p className="text-lg text-gray-700 font-bold">{formatRupiah(dataProduct.price, "Rp")}</p> */}
                        <p className="text-md font-semibold text-gray-600">{dataCheckoutUser !== null && sumTotal(dataCheckoutUser)}</p>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-md text-gray-600">Total Diskon Barang</h1>
                          {/* <p className="text-lg text-gray-700 font-bold">{formatRupiah(dataProduct.price, "Rp")}</p> */}
                        <p className="text-md font-semibold text-gray-600">Rp. 0</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <h1 className="text-md font-bold text-gray-700">Total Harga</h1>
                        {/* <p className="text-lg text-gray-700 font-bold">{formatRupiah(dataProduct.price, "Rp")}</p> */}
                      <p className="text-lg text-gray-700 font-bold">{dataCheckoutUser !== null && sumTotal(dataCheckoutUser)}</p>
                    </div>
                    <div className="flex flex-col mt-3">
                      <button className="text-xl text-amber-500 font-semibold border rounded-md py-2 mt-2 border border-amber-400 hover:bg-amber-400 hover:text-white focus:text-gray-50 transition focus:duration-150 hover:duration-500">Transaction ({getCheckoutUser})</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* )} */}
        </div>
      </Layout>
  )
}

export default Checkout;
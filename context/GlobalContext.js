import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [getCheckoutUser, setGetCheckoutUser] = useState(0);
  const [dataCheckoutUser, setDataCheckoutUser] = useState(null);
  
  
  // indikator.
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchCheckoutStatus, setFetchCheckoutStatus] = useState(true);


  let fetchCheckOutUser = async () => {
    try {
      let result = await axios.get(`https://service-example.sanbercloud.com/api/checkout-product-user/${user.id}`,
        {
          headers: {"Authorization": "Bearer " + Cookies.get("token_user")}
        }
      )
      
      setGetCheckoutUser(result.data.length);
      setDataCheckoutUser(result.data);

    } catch (error) {
      console.info(error);
    }
  }

    /* Fungsi formatRupiah */
  const formatRupiah = (angka, prefix) => {
		var number_string = angka.replace(/[^,\d]/g, '').toString(),
		split   		= number_string.split(','),
		sisa     		= split[0].length % 3,
		rupiah     		= split[0].substr(0, sisa),
		ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
    // tambahkan titik jika yang di input sudah menjadi angka ribuan
		if(ribuan){
			let separator = sisa ? '.' : '';
			rupiah += separator + ribuan.join('.');
		}
 
		rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
		return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
	}

  const quantityAllProductCheckout = (parameter) => {
    let getQuantity = parameter.filter(value => {
      return value.is_transaction === 0;
    }).map(result => {
      return result.quantity;
    })

    // convert quantity menjadi integer
    const qty = getQuantity.map(Number);

    // Menjumlahkan quatity yang ada di dalam array
    let result = qty.reduce((initialIndex, nextIndex) => initialIndex + nextIndex, 0);
    return result;
  }

  const sumTotal = (param) => {
    let getUnitPrice = param.filter(value => {
      return value.is_transaction === 0
    }).map(result => {
      return result.unit_price
    })

    // convert unitPrice menjadi integer
    const unitPrice = getUnitPrice.map(Number);

    // Menjumlahkan uniPrice yang ada di dalam array
    let result = unitPrice.reduce((initialIndex, nextIndex) => initialIndex + nextIndex, 0);
    return formatRupiah(result + '', "Rp");
  }

  let state = {
    user, setUser,
    fetchStatus, setFetchStatus,
    fetchCheckoutStatus, setFetchCheckoutStatus,
    getCheckoutUser, setGetCheckoutUser,
    dataCheckoutUser, setDataCheckoutUser,
  }

  let handleFunction = {
    fetchCheckOutUser,
    formatRupiah,
    sumTotal,
    quantityAllProductCheckout,
  } 

  return (
    <GlobalContext.Provider value={{
        state,
        handleFunction
    }}>
        {props.children}
    </GlobalContext.Provider>
  )
}
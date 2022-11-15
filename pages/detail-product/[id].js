import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Layout from "../../widget/Layout";

const DetailData = () => {
    const router = useRouter();
    const {id} = router.query;

    const [dataProduct, setDataProduct] = useState(null);
    let {state} = useContext(GlobalContext);
    let {
        user, setUser,
        fetchStatus, setFetchStatus,
        fetchCheckoutStatus, setFetchCheckoutStatus,
    } = state;

    const [quantity, setQuantity] = useState(1);
    const [displaySpinner, setDisplaySpinner] = useState(false);
    const [fetchStatusDetail, setFetchStatusDetail] = useState(true);

    useEffect(() => {
        if (id !== undefined) {
            if(fetchStatusDetail) {
                axios.get(`https://service-example.sanbercloud.com/api/product/${id}`)
                    .then(result => {
                        // console.info(result);
                        let data = result.data;
                        setDataProduct(data);
                    })
                setFetchStatusDetail(false);
            }
        }

        /* Conditional button quantity for checkout */
        if (Cookies.get('token_user') !== undefined) {
            if (user === undefined) {
                setUser(JSON.parse(Cookies.get('user')))
            }
        }

    }, [user, setUser, fetchStatusDetail, setFetchStatusDetail]);

    // console.info(user.id)
    // console.info(JSON.parse(Cookies.get('user')))

    const handleCheckout = (event) => {
        if (!user) {
            router.push('/user/checkout');
        } else {
            let idProduct = event.target.value;
            
            let postCheckout = async () => {
                try {
                    setDisplaySpinner(true);

                    let result = await axios.post(`https://service-example.sanbercloud.com/api/checkout/1/${idProduct}`, {quantity},
                        {
                            headers: {"Authorization": "Bearer " + Cookies.get('token_user')}
                        }
                    )

                    setDisplaySpinner(false);
                    setFetchStatusDetail(true);
                    setFetchCheckoutStatus(true);

                    // console.info(result)
                    
                } catch (error) {
                    console.info(error);
                }
            }

            postCheckout();
        }
    }

    /* Get Category Product form Cookies */
    // const categoryProduct = JSON.parse(Cookies.get('category_product'));
    const categoryProduct = Cookies.get('category_product');

    /* Fungsi formatRupiah */
	function formatRupiah (angka, prefix) {
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

    const handleQuantityPlus = () => {
        setQuantity(quantity + 1);
    }

    const handleQuantityMin = () => {
        setQuantity(quantity - 1);

        if (quantity < 2) {
            setQuantity(1);
        }
    }

    const handleChange = () => {}

    return (
        <Layout>
            <div className="h-full mx-0 lg:mx-40">
                <div className="container mx-auto my-2">
                    {dataProduct !== null && (
                        <p className="flex text-sm px-2 md:px-0 lg:px-0 mt-8 items-center">
                            <Link href={'/'}><button className="text-amber-400">Home</button></Link> <svg className="w-3 h-3 mx-1" color="grey" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            <Link href={'/'}><button className="text-amber-400">{categoryProduct}</button></Link> <svg className="w-3 h-3 mx-1" fill="none" color="gray" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            {dataProduct.product_name}
                        </p>
                    )}
                </div>
                {dataProduct !== null && (
                    <div className="mb-10">
                        <div className={["lg:grid grid-cols-detail-product gap-10 w-full bg-white px-2 md:px-0 lg:px-0 h-full "]}>
                            <div className="">
                                <div className='sticky top-24'>
                                    <div className="relative fixed object-cover w-full lg:w-full h-96 md:h-48 lg:h-56 xl:h-80 mt-6">
                                        <Image
                                            src={`/api/imageproxy?url=${encodeURIComponent(dataProduct.image_url)}`}
                                            alt="Gambar Produk"
                                            className=''
                                            layout='fill'
                                            objectFit='cover'
                                            quality={80}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className=" flex flex-col w-full p-4">
                                <h1 className="text-gray-900 font-bold text-lg">
                                    {dataProduct.product_name}
                                </h1>
                                <div className="flex items-end">
                                    <p className="text-sm">Terjual <span className="text-gray-400">{dataProduct.stock_to_checkout}</span></p>
                                    <p className="text-xl text-gray-400 font-semibold mx-2">.</p>
                                    <p className="flex items-end text-sm">
                                        <svg className="w-5 h-5 mr-1" color="#FFEE63" fill="#FFEE63" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                        {dataProduct.rating}
                                    </p>
                                </div>
                                <div className="flex item-center justify-between mt-5">
                                    <h1 className="text-gray-700 font-bold text-3xl">
                                        {formatRupiah(dataProduct.price, 'Rp')}
                                    </h1>
                                </div>
                                <div className="flex w-full border-t border-b mt-6">
                                    <button className="text-sm text-amber-500 font-semibold border-b-2 border-amber-400 px-5 py-2">Detail</button>
                                    <button className="text-sm text-gray-400 font-semibold border-b-2 px-5 py-2">Info Penting</button>
                                </div>
                                <p className="mt-4 text-gray-600 text-sm h-full">
                                    {dataProduct.description}
                                </p>
                            </div>

                            <div className="">
                                <div className="sticky mt-6 top-24 border rounded-lg p-2.5">
                                    <h1 className="text-md font-semibold">Atur jumlah dan catatan</h1>
                                    <div className="flex flex-row w-full">
                                        {user && (
                                            <>
                                            <div className="basis-2/5 flex items-center justify-between mt-4 border">
                                                {quantity < 2 ? (
                                                    <button onClick={handleQuantityMin} className="h-full px-2 text-gray-300 text-xl">-</button>
                                                ) : (
                                                    <button onClick={handleQuantityMin} className="h-full px-2 text-amber-500 text-xl">-</button>
                                                )}
                                                <input value={quantity} onChange={handleChange} className="inline-block w-full h-full text-center focus:outline-none" placeholder="1" />
                                                <button onClick={handleQuantityPlus} className="h-full px-2 text-amber-500 text-lg">+</button>
                                            </div>
                                            <p className="text-sm basis-3/5 ml-2 flex items-end pb-1">Stok Total: <span className="font-bold text-gray-700">&nbsp; {dataProduct.stock}</span></p>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-5">
                                        <p className="text-sm">Sub Total:</p>
                                        <p className="text-lg text-gray-700 font-bold">{formatRupiah(dataProduct.price, "Rp")}</p>
                                    </div>
                                    <div className="flex flex-col mt-5">
                                        {!displaySpinner && (
                                        <button value={id} onClick={handleCheckout} className="flex justify-center items-center text-white font-semibold border rounded-md py-2 bg-amber-400 hover:bg-yellow-400 focus:text-gray-100 transition focus:duration-150 hover:duration-1000">
                                            + Keranjang
                                        </button>
                                        )}
                                        {displaySpinner && (
                                        <button onClick={handleCheckout} className="flex justify-center items-center p-4 text-white font-semibold border rounded-md py-2 bg-amber-400 hover:bg-yellow-400 focus:text-gray-100 transition focus:duration-150 hover:duration-1000">
                                            <div role="status" className=''>
                                                <svg aria-hidden="true" className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            + Keranjang
                                        </button>
                                        )}
                                        <button className="text-amber-500 font-semibold border rounded-md py-2 mt-2 border border-amber-400 focus:bg-gray-100 duration-300">Beli Langsung</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default DetailData;
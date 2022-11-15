import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";



const CardCheckout = (props) => {
    let {state, handleFunction} = useContext(GlobalContext);
    let {} = state;
    let { formatRupiah } = handleFunction;

    const {product_name, terjual, rating, imageProduct, deskripsi, price, qty} = props;

    const handleText = (parameter) => {
        if (parameter === null) {
            return ""
        } else {
            return parameter.slice(0, 64) + "...";
        }
    }

    return (
        <div className="border-b-4 border-gray-100 p-0 py-4 sm:p-4">
            <h1 className="text-gray-900 font-bold text-md">
                {product_name}
            </h1>
            <div className="flex items-center">
                <p className="text-xs">Terjual <span className="text-gray-400">{terjual} Stok</span></p>
                <p className="text-xl text-gray-400 font-semibold mx-2">.</p>
                <p className="flex items-center text-xs">
                    <svg className="w-4 h-4 mr-1" color="#FFEE63" fill="#FFEE63" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    {rating}
                </p>
            </div>
            <div className="flex w-full mt-4">
                <button className="relative h-20 w-20">
                    <Image
                        src={`/api/imageproxy?url=${encodeURIComponent(imageProduct)}`}
                        alt="Gambar Produk"
                        className='rounded-md'
                        layout='fill'
                        objectFit='cover'
                        quality={80}
                    />
                </button>
                <div className="flex flex-col justify-center ml-4">
                    <p>{handleText(deskripsi)}</p>
                    <p className="mt-1 font-bold text-gray-700 text-md">{formatRupiah(price, 'Rp')}</p>
                </div>
            </div>
            <div className="flex justify-between mt-6 text-gray-600 text-sm h-full">
                <p className="text-amber-500 cursor-pointer"><button onClick={() => alert("Fitur ini masih dalam pengembangan! :)")}>Tulis Catatan</button></p>
                <p>Qty: <span className="px-2 underline underline-offset-4 decoration-1 decoration-gray-100">&nbsp;&nbsp;&nbsp;&nbsp; {qty} &nbsp;&nbsp;&nbsp;&nbsp;</span></p>
            </div>
        </div>
    )
}

export default CardCheckout;
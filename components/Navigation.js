import axios from 'axios';
import {Navbar} from 'flowbite-react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import styles from '../styles/Navigation.module.css'

const Navigation = () => {
  const router = useRouter();

  const {state, handleFunction} = useContext(GlobalContext);
  const {
    user, setUser,
    fetchCheckoutStatus, setFetchCheckoutStatus,
    getCheckoutUser, setGetCheckoutUser,
  } = state;
  const {fetchCheckOutUser} = handleFunction;
  
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [displaySearch, setDisplaySearch] = useState(false);

  // Hover Cart Indicator.
  const [hoverCart, setHoverCart] = useState(false);


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

  }, [user, setUser, fetchCheckoutStatus, setFetchCheckoutStatus])

  const handleMouseOverCart = () => {
    setHoverCart(true);
  }

  const handleMouseOutCart = () => {
    setHoverCart(false);
  }

  const handleLogout = () => {
    Cookies.remove('token_user')
    Cookies.remove('user')
    setUser(undefined);

    router.push('/auth/user-login');
  }

  const handleSearch = (event) => {
    setDisplaySearch(true);
    setSearch(event.target.value);

    if (search !== "") {
      axios.get(`http://service-example.sanbercloud.com/api/product`)
        .then((result) => {
          console.info(result);
          
          let data = result.data.filter((value) => {
            return value.available !== 0
          });

          let searchData = data.filter(result => {
            return Object.values(result).join(" ").toLowerCase().includes(event.target.value.toLowerCase());
          });

          setData(searchData)
        })
    }
  }

  return (
    <Navbar
        fluid={false}
        rounded={true}
        className={[styles.sticky, 'mx-auto shadow-md shadow-gray-100 z-20']}
    >
        <div className='container flex flex-wrap justify-between items-center mx-0 lg:mx-10'>
          <Navbar.Brand href="/">
            <Image 
              src='/logo.png'
              width={40}
              height={40}
            />
            <span className="text-3xl text-amber-400 font-bold self-center whitespace-nowrap font-semibold dark:text-white">
              AtlantisStore
            </span>
          </Navbar.Brand>
          <div className='flex lg:hidden'>
            <a href="#" className="flex py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </a>
            <Navbar.Toggle />
          </div>

          <div className='grow mx-0 lg:mx-20 px-0 lg:px-10'>
            <form className='relative'>   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input onChange={handleSearch} value={search} name='search' type="search" id="default-search" className="lg:mt-0 mt-5 block p-2 sm:p-1.5 pl-10 sm:pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-amber-300 focus:border-amber-400 dark:bg-amber-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400" placeholder="Search Mockups, Logos..." required />
              </div>
              {displaySearch && (
                <div className='z-10 absolute w-full p-5 max-h-96 overflow-y-auto bg-white border'>
                  <div className='pb-5'>
                    <button onClick={() => {
                      setDisplaySearch(false)
                      setSearch("")
                    }}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                  </div>
                  {data !== null && data.map(result => {
                    return (
                      <span onClick={() => router.push(`/detail-product/${result.id}`)} className='pb-2 border-b-2 cursor-pointer block'>{result.product_name}</span>
                    )
                  })}
                </div>
              )}
            </form>
          </div>

          <Navbar.Collapse>
            <ul className="flex flex-col items-center mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className='flex justify-center border-r-2 border-gray-100 pr-7'>
                <Link  href="/user/checkout">
                  <div onMouseOver={handleMouseOverCart} onMouseOut={handleMouseOutCart} className='p-3.5 cursor-pointer'>
                    <a className="relative flex py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <svg className="w-7 h-7" color='#FAC213' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">{getCheckoutUser}</div>
                    </a>
                  </div>
                </Link>
                {hoverCart && (
                  <div onMouseOver={handleMouseOverCart} onMouseOut={handleMouseOutCart} className='fixed top-16 w-96 p-10 border bg-gray-100 animate-pulse'>Cart Product</div>
                )}
              </li>
              {!user &&
                <li>
                  <Link href="/auth/user-login">
                    <a className="flex text-lg py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      <svg className="w-7 h-7" color='#FAC213' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                      Login
                    </a>
                  </Link>
                </li>
              }
              {user &&
                <li className='cursor-pointer'>
                  <span onClick={handleLogout} className="flex text-lg py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <svg className="w-6 h-6" color='#FAC213' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Logout
                  </span>
                </li>
              }
            </ul>
          </Navbar.Collapse>
        </div>
    </Navbar>
  )
}

export default Navigation;
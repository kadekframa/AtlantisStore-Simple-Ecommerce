import { useState } from "react";
import axios from 'axios';
import {useRouter} from 'next/router';
import jwtDecode from 'jwt-decode';
import Cookies from "js-cookie";
import Link from "next/link";
;

const Login = () => {
    const router = useRouter();
    const [inputLogin, setInputLogin] = useState({
        name: '',
        email: '',
        password: '',
        image_url: '',
    })

    const {email, password} = inputLogin;
    const fetchDataLogin = () => {
        axios.post('https://service-example.sanbercloud.com/api/login', {email, password})
            .then(result => {
                console.info('Hasil Login : ', result.data);

                let {token} = result.data;
                let {user} = result.data;

                let decoded = jwtDecode(token);
                console.info(decoded);

                if(decoded.role !== "admin") {
                    Cookies.set('token_user', token, {expires: 1});
                    Cookies.set('user', JSON.stringify(user), {expires: 1});
                }
                
                router.push('/')
            })
            .catch(error => {
                console.info('Error Login : ', error);
            })
    }

    const handleLogin = (events) => {
        events.preventDefault();
        fetchDataLogin();
    }

    const handleChangeTextLogin = (events) => {
        let name = events.target.name;
        let value = events.target.value;        

        setInputLogin({...inputLogin, [name]: value});
    }

    console.info(inputLogin);

    return (
        <div className="flex justify-center items-center w-full h-screen ">
            <form onSubmit={handleLogin} className="w-full lg:w-1/5 md:w-1/4 border border-gray-100 p-10 rounded-xl">
                <h1 className="text-3xl text-center font-semibold mb-7">Login</h1>
                <div className="mb-3">
                    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                        </div>
                        <input value={inputLogin.email} onChange={handleChangeTextLogin} type="text" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Password</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                        </div>
                        <input value={inputLogin.password} onChange={handleChangeTextLogin} type="text" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password..." />
                    </div>
                </div>
                <button type="submit" className="mt-5 text-white bg-sky-700 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Login</button>
                <p className="text-xs mt-8 text-center">
                    You don't have an account ?
                    <Link href={'/auth/user-register'}>
                        <a className="text-blue-400"> Register Account.</a>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login;
import { useState } from "react";
import axios from 'axios';
import {useRouter} from 'next/router';
import Link from "next/link";

const Register = () => {
    const router = useRouter();
    const [inputRegister, setInputRegister] = useState({
        name: '',
        email: '',
        password: '',
        image_url: '',
    })

    const {name, email, password, image_url} = inputRegister;
    const fetchDataRegister = () => {
        axios.post('https://service-example.sanbercloud.com/api/register', {name, email, password, image_url})
            .then(result => {
                console.info('Hasil Register : ', result);
                router.push('/')
            })
            .catch(error => {
                console.info('Error Register : ', error);
            })
    }

    const handleRegister = (events) => {
        events.preventDefault();
        fetchDataRegister();
    }

    const handleChangeTextRegister = (events) => {
        let name = events.target.name;
        let value = events.target.value;

        setInputRegister({...inputRegister, [name]: value});
    }

    console.info(inputRegister);

    return (
        <div className="flex justify-center items-center w-full h-screen ">
            <form onSubmit={handleRegister} className="w-full lg:w-1/4 md:w-1/4 border border-gray-100 p-10 rounded-xl">
                <h1 className="text-3xl text-center font-semibold mb-7">Register</h1>
                <div className="mb-3">
                    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                        </div>
                        <input value={inputRegister.name} onChange={handleChangeTextRegister} type="text" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name..." />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                        </div>
                        <input value={inputRegister.email} onChange={handleChangeTextRegister} type="text" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Password</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                        </div>
                        <input value={inputRegister.password} onChange={handleChangeTextRegister} type="text" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password..." />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Image URL</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <input value={inputRegister.image_url} onChange={handleChangeTextRegister} type="text" name='image_url' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Image url..." />
                    </div>
                </div>
                <button type="submit" className="mt-5 text-white bg-sky-700 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Register</button>
                <p className="text-xs mt-8 text-center">
                    Already have an account ?
                    <Link href={'/auth/user-login'}>
                        <a className="text-blue-400"> Login Account.</a>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;
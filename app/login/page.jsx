'use client';
import React, { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginUserApi } from '../config/apis';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

const Login = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });

    const loginUser = async (values) => {
        setLoading(true);
        const { data } = await axios.post(loginUserApi, values);
        localStorage.setItem("token", data.token);
    }

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
            setLoading(false);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login Successfully',
            });
            router.push("/dashboard")
        },
        onError: (err) => {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err?.response?.data?.message,
            });
        }
    })

    return <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image width={100} height={100} className="w-8 h-8 mr-2 transition-opacity duration-[2s]" src="https://res.cloudinary.com/dbyeoja4c/image/upload/v1696743463/1647721750966_rkrr7l.jpg" alt="logo" />
                Desol Int.
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={values => mutation.mutate(values)}
                    >
                        {({ handleChange, handleSubmit, errors, touched }) => (
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                    {
                                        (errors.email && touched) &&
                                        <span className="text-red-500">
                                            {errors.email}
                                        </span>
                                    }
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" onChange={handleChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    {
                                        (errors.password && touched) &&
                                        <span className="text-red-500">
                                            {errors.password}
                                        </span>
                                    }
                                </div>
                                <div>
                                    <button onClick={handleSubmit} type="submit" className="flex justify-center text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                        {loading ? <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg> : "Sign in"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </section>
}

export default Login;

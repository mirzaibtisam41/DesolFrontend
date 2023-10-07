"use client";
import React, { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addCarApi } from '../config/apis';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    model: Yup.string().min(3).required(),
    price: Yup.number().required(),
    phone: Yup.string().length(11).required(),
    city: Yup.string().required(),
    no_of_images: Yup.number().required(),
    image: Yup.array().required()
  });

  const loginUser = async (values) => {
    setLoading(true);
    if (values) {
      console.log(values);
      let formData = new FormData();
      formData.append("model", values.model);
      formData.append("price", values.price);
      formData.append("phone", values.phone);
      formData.append("city", values.city);
      formData.append("model", values.model);
      formData.append("no_of_images", Number(values.no_of_images));
      for (const file of values.image) {
        formData.append("image", file);
      }
      await axios.post(addCarApi, formData, {
        headers: {
          token: localStorage.getItem('token')
        }
      });
    }
  }

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      setLoading(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Car Added Successfully',
      });
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

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-2">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Enter Car Details</h1>
        </div>
        <Formik
          validationSchema={schema}
          initialValues={{
            model: '',
            price: '',
            phone: '',
            city: '',
            no_of_images: '',
            image: ''
          }}
          onSubmit={values => mutation.mutate(values)}
        >
          {({ handleChange, handleSubmit, errors, touched, setFieldValue, values }) => (
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlfor="name" className="leading-7 text-sm text-gray-600">Model</label>
                    <input onChange={handleChange} type="text" id="name" name="model" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {
                      (errors.model && touched.model) &&
                      <span className="text-red-500">
                        {errors.model}
                      </span>
                    }
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label htmlfor="email" className="leading-7 text-sm text-gray-600">Price</label>
                    <input onChange={handleChange} type="number" id="email" name="price" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {
                      (errors.price && touched.price) &&
                      <span className="text-red-500">
                        {errors.price}
                      </span>
                    }
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label htmlfor="email" className="leading-7 text-sm text-gray-600">Phone</label>
                    <input onChange={handleChange} type="number" id="email" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {
                      (errors.phone && touched.phone) &&
                      <span className="text-red-500">
                        {errors.phone}
                      </span>
                    }
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative flex">
                    <label htmlfor="email" className="leading-7 mr-4 text-sm text-gray-600">City</label>
                    <div className="flex">
                      <div className="flex items-center mr-4">
                        <input name="city" onChange={handleChange} id="inline-radio" type="radio" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlfor="inline-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lahore</label>
                      </div>
                      <div className="flex items-center mr-4">
                        <input name="city" onChange={handleChange} id="inline-2-radio" type="radio" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlfor="inline-2-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Karachi</label>
                      </div>
                      {
                        (errors.city && touched.city) &&
                        <span className="text-red-500">
                          {errors.city}
                        </span>
                      }
                    </div>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label htmlfor="message" className="leading-7 text-sm text-gray-600">No of Pictures</label>
                    <select onChange={handleChange} id="numbers" name='no_of_images' className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option defaultValue>Choose a number</option>
                      {
                        [1, 2, 3, 4, 5, 6, 7, 8].map(item => {
                          return <option key={item} value={item}>{item}</option>
                        })
                      }
                    </select>
                    {
                      (errors.no_of_images && touched.no_of_images) &&
                      <span className="text-red-500">
                        {errors.no_of_images}
                      </span>
                    }
                  </div>
                </div>
                <div className="flex items-center justify-center w-full mt-2">
                  <label htmlform="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    </div>
                    <input name="image" onChange={(e) => {
                      if (!values.no_of_images) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Please select no of pictures',
                        });
                      }
                      else if (values.image.length < Number(values.no_of_images)) {
                        setFieldValue('image', [...values.image, e.currentTarget.files[0]]);
                      }
                      else {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'You have reached total no of pictures',
                        });
                      }
                    }} id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
                <div className="flex mt-3">
                  {
                    values?.image?.length > 0 && values?.image?.map((item, index) => {
                      return <img style={{ width: '100px', height: '100px' }} className="mr-3" key={index} src={URL.createObjectURL(item)} />
                    })
                  }
                </div>
                {
                  (errors.image && touched.image) &&
                  <span className="text-red-500">
                    {errors.image}
                  </span>
                }
                <div className="p-2 w-full mt-2">
                  <button onClick={handleSubmit} type="submit" className="flex justify-center text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {loading ? <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default Dashboard;
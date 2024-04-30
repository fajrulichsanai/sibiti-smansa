import React, { Fragment, useState } from 'react';
// import Auth from '../api/auth/Auth';
import { message } from 'antd';
import Auth from '../api/auth/Auth';
import Loading from './Loading';
import Utils from '../utils/Utils';

const SignUp = () => {
    const { loading, showLoading, hideLoading } = Utils();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const onChangeInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });

        setError({
            ...error,
            [e.target.name]: ''
        });
    };

    const validateInput = () => {
        let isValid = true;
        const newError = {};

        if (data.email.trim() === '') {
            newError.email = 'Email is required';
            isValid = false;
        }
        if (data.password.trim() === '') {
            newError.password = 'Password is required';
            isValid = false;
        }

        setError(newError);

        return isValid;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        showLoading();
        if (validateInput()) {
            const {data : user, error} = await Auth.login(data.email.trim(), data.password);

            if (error) {
                message.error(error)
                hideLoading();
            } else {
                hideLoading();
                // window.location.href = "/cms/dashboard";
                console.log(user);
            }
        }
    };

    return (
        <Fragment>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form onSubmit={submitForm}>
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                        <input
                                            onChange={(e) => onChangeInput(e)}
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                            placeholder="username" />
                                        {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <input
                                            onChange={(e) => onChangeInput(e)}
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                                        {error.password && <p className="text-red-500 text-xs">{error.password}</p>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    onChange={() => setShowPassword(!showPassword)}
                                                    id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Show password</label>
                                            </div>
                                        </div>
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                                    </div>
                                    <button 
                                    onClick={(e) => submitForm(e)}
                                    type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline">Sign up</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {loading && <Loading />}
        </Fragment>
    );
};

export default SignUp;

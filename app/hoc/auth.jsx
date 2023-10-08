"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Auth = (Component) => {
    function HOC() {
        const router = useRouter();
        const User = typeof window !== undefined && localStorage.getItem('token');
        return <React.Fragment>
            {User ? <Component /> : router.push("/")}
        </React.Fragment>
    }
    return HOC;
}

export default Auth;
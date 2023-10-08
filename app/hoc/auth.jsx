"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Auth = (Component) => {
    const [User, setUser] = useState(null);
    useEffect(() => {
        const User = localStorage.getItem('token');
        setUser(User);
    }, []);
    function HOC() {
        const router = useRouter();
        return <React.Fragment>
            {User ? <Component /> : router.push("/")}
        </React.Fragment>
    }
    return HOC;
}

export default Auth;
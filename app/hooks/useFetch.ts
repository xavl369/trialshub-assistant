import { useState, useEffect } from 'react';

const useFetch = <T, U>(url:string, setData: ((data: T[]) => void), dependency:U, condition:boolean, options = {})  => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if(!dependency || !condition) return;
        fetch(url, options)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                if(data && data.length > 0){
                    setData(data);
                }
            })
            .then(()=> setLoading(false))
            .catch(setError);

    }, [url]);

    return { loading, error }
}

export default useFetch;
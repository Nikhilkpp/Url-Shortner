
import { useParams } from "react-router-dom";
import { getUrl } from "../services/api";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const Redirect=()=>{

    let id= useParams();
    const [error, setError]=useState(false);
    

    useEffect(()=>{

        const fetch=async()=>{
            try {
                const res = await getUrl(id.id);
                // const res = await axios.get(`http://localhost:4000/api/${id.id}`);
                // if(res.ok) window.location.href = res.data.redirectURL;
                if(res.status==200) window.location.href = res.data.originalUrl;
                else throw new Error;
                
                
            } catch (error) {
                console.log('error occured')
                
                 setError(true);
                
                
            }

        }
        fetch();
        
    },[])
    return (
        <>
        {error && <p>Entered key is incorrect.</p>}
        </>

    )
    }
export default Redirect;
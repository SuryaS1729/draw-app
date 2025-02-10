import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading]= useState(true)
    const [ socket,setSocket]= useState<WebSocket>()

    useEffect(()=>{
            const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZmY4OGJmYy05MTc2LTRlZDEtODg5ZS1mNzg5YzZkMGU2ZWIiLCJpYXQiOjE3Mzg0MjIzMzV9.CKUIwtBquZdGpvTXYWYDnso91URVS9z2ZC3RXI9Pf8o`)
            ws.onopen = ()=>{
                setLoading(false)
                setSocket(ws)
            }
    },[]);
    return{
        socket,
        loading
    }
}
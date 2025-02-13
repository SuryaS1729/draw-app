"use client"
export function AuthPage({isSignin}:{isSignin:boolean}){

    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded">
            <div><input type="text" placeholder="Email"></input></div>
            <div><input type="password" placeholder="password"></input></div>
            <button onClick={()=>{

            }}>{isSignin ? "sign in":"sign up"}</button>
        </div>
    </div>
}
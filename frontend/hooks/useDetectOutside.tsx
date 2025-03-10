import React, {RefObject, useEffect} from "react";
import { useRef } from "react";

interface DetectOutsideProps <T extends HTMLElement>{
    ref: RefObject<T>;
    callback: () => void; 
}

function useDetectOutside<T extends HTMLElement>({ ref, callback }: DetectOutsideProps<T>){
    useEffect(() => {
        //handler to detect clicks outside
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)){
                callback(); 
            }
        }; 

        //add event 
        document.addEventListener("mousedown", handleClickOutside); 

        //cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); 
        }; 
    }, [ref, callback]); 

}; 

export default useDetectOutside; 
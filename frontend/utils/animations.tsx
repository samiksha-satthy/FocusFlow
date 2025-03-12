import { px } from "framer-motion";

export const container = {
    hidden: {opacity: 0}, 
    visible: {
        opacity: 1, 
        transition: {
            delayChildren: 0.1, 
            staggerChildren: 0.1,
        },
    },
};

export const item = {
    hidden: {opacity: 0}, 
    visible: {opacity: 1}
}

export const sidebar = {
    hidden: {
        opacity: 0, 
        x: 0,
    },
    visible: {
        opacity: 1,
        x: 100,
    }
}
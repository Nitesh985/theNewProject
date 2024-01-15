import { createContext, useContext } from "react";


export const DrawerContext = createContext(false)

export default function useDrawerContext() {
    return useContext(DrawerContext)
}
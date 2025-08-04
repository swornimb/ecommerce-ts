import React, { createContext, useContext, useState, type ReactNode } from "react";

interface FilterContextType{
    searchQuery: string;
    setSearchQuery: (query:string)=>void

    selectedCategory: string;
    setSelectedCategory: (category: string)=>void

    minPrice: number|undefined
    setMinPrice: (price:number|undefined)=>void

    maxPrice: number|undefined
    setMaxPrice: (price:number|undefined)=>void

    keyword: string;
    setKeyword: (keyword: string)=> void

}


const filterContext = createContext<FilterContextType|undefined>(undefined);

export const FilterContextProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number|undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number|undefined>(undefined);
    const [keyword, setKeyword] = useState<string>('')

    return(
    <filterContext.Provider value={{searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyword, setKeyword}}>
        {children}
    </filterContext.Provider>
    )
}

export const useFilter=()=>{
    const context = useContext(filterContext)
    if(context===undefined){
        throw new Error('The component should be inside FilterProvider')
    }
    return context
}
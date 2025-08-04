import { useState, useEffect } from "react"
import { useFilter } from "../context/FilterContext";

interface Product{
    category: string;
}

interface ProductResponse{
    products: Product []
}

function Sidebar() {
  const [catregories, setCategories] = useState<string[]>([])
  const [keywords] = useState([
    "apple",
    "watch",
    'fashion',
    'trends',
    'shoes',
    'shirts'
])

const {searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, keyword, setKeyword} = useFilter()
const handleSearchQueryChange = (e:React.ChangeEvent<HTMLInputElement>)=>(setSearchQuery(e.target.value))
const handleMaxPriceChange = (e:React.ChangeEvent<HTMLInputElement>)=>(setMaxPrice(Number(e.target.value)))
const handleMinPriceChange = (e:React.ChangeEvent<HTMLInputElement>)=>(setMinPrice(Number(e.target.value)))
const handlCategoryChange = (e:React.ChangeEvent<HTMLInputElement>)=>(setSelectedCategory(e.target.value))
const handleReset = ()=>{setSelectedCategory(''); setKeyword(''); setSearchQuery(''); setMaxPrice(undefined); setMinPrice(undefined)}
const handleKeywordChange= (keyword: string)=>(setKeyword(keyword))

useEffect(()=>{
    const fetchCategories = async()=>{
        try{
            const res = await fetch('https://dummyjson.com/products')
            const data: ProductResponse = await res.json()
            const uniqueCategory = Array.from(new Set(data.products.map(product=>product.category)))
            setCategories(uniqueCategory)
        }catch(error){
        console.log("Error fetching products", error)
        }
    } 

    fetchCategories()
},[])

  return (
    <div className="w-100 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 p-2 w-full sm:mb-0"
          value={searchQuery}
          placeholder="Search Product"
          onChange={handleSearchQueryChange}
        />
        <div className="flex justify-center items-center">
          <input
            type="number"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            value={minPrice}
            placeholder="Min"
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            className="border-2  px-5 py-3 mb-5 mt-2 w-full"
            placeholder="Max"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Categories Section */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <div>
            {catregories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  className="mr-2 w-[16px] h-[16px]"
                  checked={selectedCategory===category}
                  onChange={handlCategoryChange}
                />
                {category.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
                onClick={()=>(handleKeywordChange(keyword))}
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar
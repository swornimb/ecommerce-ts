import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext"
import axios from "axios";
import BookCard from "./BookCard";

const MainContent = ()=>{
  const {searchQuery, selectedCategory, minPrice, maxPrice, keyword} = useFilter();
  const [products, setProducts] = useState<any[]>([]);
  const [openDropdoen, setOpenDropdown] = useState<boolean>(false);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12;
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  useEffect(()=>{
    let url =`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

    if(keyword){
        url = `https://dummyjson.com/products/search?q=${keyword}&limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
    }
    axios.get(url).then((res)=>{setProducts(res.data.products)}).catch((error)=>{console.error(error)})
  },[currentPage, keyword])

    const filteredProduct = ()=>{
    
    let filteredProducts = products;
    
    if(selectedCategory){
        filteredProducts=filteredProducts.filter((oneProduct)=>(
            oneProduct.category===selectedCategory))
    }
    if(minPrice!== undefined){
        filteredProducts=filteredProducts.filter((oneProduct)=>(
            oneProduct.price>=minPrice))
    }

     if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
     
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch(filter){
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  }
  const filteredProducts = filteredProduct();
     return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              onClick={() => setOpenDropdown(!openDropdoen)}
              className="border px-4 py-2 rounded-full flex items-center"
            >
              {filter === "ll"? "Filter": filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
            {openDropdoen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
        </div>
    </section>
  )
}

export default MainContent
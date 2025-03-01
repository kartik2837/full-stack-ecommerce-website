import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../Component/Title'
import ProductItem from '../Component/ProductItem'

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false)
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant')
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))

        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }
    const toggleSubcategory = (e) => {
        if (subCategory.includes(e.target.value)) {


            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }


    }

    const applyFilter = () => {
        let productCopy = products.slice();

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category))

        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }

        setFilterProducts(productCopy)
    }

    const sortProduct = () => {
        let fbcopy = filterProducts.slice();
        switch (sortType) {
            case 'low-high':
                setFilterProducts(fbcopy.sort((a, b) => (a.price - b.price)));
                break;
            case 'high-low':
                setFilterProducts(fbcopy.sort((a, b) => (b.price - a.price)))
                break;

            default:
                applyFilter();
                break;

        }
    }
    useEffect(() => {
        setFilterProducts(products);

    }, [])

    useEffect(() => {
        applyFilter()

    }, [category, subCategory, search, showSearch, products])

    useEffect(() => {
        sortProduct()
    }, [sortType])


    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/*filter*/}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-semibold'>Filters
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>

                {/*category filter*/}
                <div className={` border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-semibold'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2 font-semibold'>
                            <input className='w-3' type="checkbox" value="Men" onChange={toggleCategory} /> Men
                        </p>
                        <p className='flex gap-2 font-semibold'>
                            <input className='w-3 font-semibold' type="checkbox" value="Women" onChange={toggleCategory} /> Women
                        </p>
                        <p className='flex gap-2 font-semibold'>
                            <input className='w-3 ' type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
                        </p>


                    </div>

                </div>
                {/*subcategory*/}
                <div className={` border border-gray-300 pl-5 py-3  my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-semibold'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2 font-semibold'>
                            <input className='w-3' type="checkbox" value="Topwear" onChange={toggleSubcategory} /> Topwear
                        </p>
                        <p className='flex gap-2 font-semibold'>
                            <input className='w-3 font-semibold' type="checkbox" value="Bottomwear" onChange={toggleSubcategory} /> Bottomwear
                        </p>
                        <p className='flex gap-2 font-semibold'>
                            <input className='w-3 ' type="checkbox" value="Winterwear" onChange={toggleSubcategory} /> Winterwear
                        </p>


                    </div>

                </div>
            </div>
            {/*right*/}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/*sort*/}
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 font-semibold'>
                        <option value="relavent">Sort by Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>

                    </select>

                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4'>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))
                    }



                </div>

            </div>

        </div>
    )
}

export default Collection

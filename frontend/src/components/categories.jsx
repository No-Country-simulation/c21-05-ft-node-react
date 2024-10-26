import axios from 'axios';
import { ArrowPathIcon} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {

    const [categories, setCategories] =  useState ([])

    const getCategories = async () => {
        await axios 
            .get('https://c21-05-ft-node-react-mirror-backend.vercel.app/api/categories')
            .then( response => {
                setCategories(response.data)
            })
            .catch(error => {console.log(error)})
    }

    useEffect( () => {
        getCategories()
    }, [])

    const cards = categories.map((category) => {
        return(
            <div 
                key = {category._id} 
                className="p-5 sm:p-10 mt-5 sm:m-10 h-28 sm:h-44 min-w-26 max-w-3xl border rounded-2xl"
                style={
                    {backgroundImage: `url(${category.image})`}
                }
            >
                <Link to={`/api/products?category=${category._id}`}>
                    <div>
                        <p className="text-sm sm:text-base text-left hover:text-xl">{category.name}</p>   

                    </div>
                </Link>
            </div>
        )
    })

    if(!categories ){
        return(
            <>
                Loading <ArrowPathIcon className="h-6"/>
            </>
        )
    }

    return (
          <section className="pt-10 pb-10 min-h-screen">
            <h1 className="text-xl">Categorías</h1>
            <div className="grid grid-flow-* md:grid-cols-3 md:grid-rows-3 ">
                {cards}
            </div>
          </section>
      );
}

export default Categories;
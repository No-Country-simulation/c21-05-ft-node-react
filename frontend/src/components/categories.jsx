import { Link } from 'react-router-dom';

const Categories = () => {

    const categoryList = [ //provisorio hasta consumir de la api
        {
            id: "1",
            name: "Cerámica"
        },
        {
            id: "2",
            name: "Joyería"
        },
        {
            id: "3",
            name: "Textiles"
        },
        {
            id: "4",
            name: "Carpintería"
        },
        {
            id: "5",
            name: "Marroquinería"
        },
        {
            id: "6",
            name: "Cestería"
        },
        {
            id: "7",
            name: "Pinturas y esculturas"
        },
        {
            id: "8",
            name: "Velas y jabones"
        },
        {
            id: "9",
            name: "Alimentos artesanales"
        }];

    const cards = categoryList.map((category) => {
        return(
            <div key = {category.id} className="p-5 sm:p-10 mt-5 sm:m-10 h-28 sm:h-44 min-w-26 max-w-3xl border rounded-2xl">
                <Link to={`/api/products?category=${category.id}`}>
                    <div>
                        <p className="text-sm sm:text-base text-left hover:text-xl">{category.name}</p>   

                    </div>
                </Link>
            </div>
        )
    })

    return (
          <section className="pt-10 pb-10 min-h-screen">
            <h1 className="font-semi text-xl">Categorías</h1>
            <div className="grid grid-flow-* md:grid-cols-3 md:grid-rows-3 ">
                {cards}
            </div>
          </section>
      );
}

export default Categories;
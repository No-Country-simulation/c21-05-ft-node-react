import Layout from "../components/layout"
import NewsCarousel from "../components/news-carousel"
import Categories from "../components/categories"
import SearchBar from "../components/search-bar"
import FeaturedShop from '../components/featured-shop'
import ShopList from "../components/shop-list"

const Home = () => {
  return (
    <Layout>
      <SearchBar />
      <NewsCarousel />
      <main className="p-10 min-h-screen max-w-screen-2xl mx-auto">
        <ShopList />
        <Categories />
        <FeaturedShop shopId={'672433a66d7c6681e7e19048'} />
      </main>
    </Layout>
  )
}

export default Home
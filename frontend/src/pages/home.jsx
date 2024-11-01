import Layout from "../components/layout"
import NewsCarousel from "../components/news-carousel";
import Categories from "../components/categories";
import SearchBar from "../components/search-bar";

const Home = () => {
  return (
    <Layout>
      <SearchBar/>
      <NewsCarousel />
      <main className="p-10 min-h-screen max-w-screen-2xl mx-auto">
        <Categories />
      </main>
    </Layout>
  );
}

export default Home;
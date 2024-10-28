import Layout from "../components/layout"
import NewsCarousel from "../components/news-carousel";
import Categories from "../components/categories";

const Home = () => {
  return (
    <Layout>
      <NewsCarousel />
      <main className="p-10 min-h-screen">
        <Categories />
      </main>
    </Layout>
  );
}

export default Home;
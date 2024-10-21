import Layout from "../components/layout"
import Categories from "../components/categories";

const Home = () => {
  return (
    <Layout>
      <main className="p-10 min-h-screen">
      <Categories/>
      </main>
    </Layout>
  );
}

export default Home;
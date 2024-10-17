import Header from "./header"
import Footer from "./footer"
import NewsCarousel from "./NewsCarousel";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NewsCarousel />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;
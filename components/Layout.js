import NavBar from "components/NavBar";
import Footer from "components/Footer";
import ActiveResource from "components/ActiveResource";

const Layout = ({children}) =>

    <>
        <NavBar />
        <ActiveResource />
        {children}
        <Footer />
    </>


export default Layout;
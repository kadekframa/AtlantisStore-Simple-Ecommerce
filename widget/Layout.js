import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const Layout = (props) => {
  return (
    <>
      <Navigation />
      <div className='container mx-auto mt-6'>
        {props.children}
      </div>
      <Footer />
    </>
  )
}

export default Layout;
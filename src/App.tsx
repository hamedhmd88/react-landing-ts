
import './App.css'
import About from './components/About'
import CompanyLogo from './components/CompanyLogo'
import CustomerSection from './components/CustomerSection'
import DesignSection from './components/DesignSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ScrollTriggered from './components/ScrollTriggered'
import TryNow from './components/TryNow'

function App() {

  return (
    <>
    <Navbar/>
    <Hero/>
    <CompanyLogo/>
    <DesignSection/>
    <CustomerSection/>
      <About/>

      {/* <ScrollTriggered/> */}
      <TryNow/>
      <Footer/>
        
    </>
  )
}

export default App


import { useEffect, useState } from 'react';

// styles
import './App.css';

// components
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';


function App() {

  const [page,setPage] = useState('Home')

  const handlePageChange = (pageName)=>{
    setPage(pageName)
  }

  useEffect(()=>{},[page])

  return (
    <div className="App">
      
        <Navbar currentPage={page} onPageChange={handlePageChange}/>

        <Content>
       
          {page==='Home' && <Home/>}
          {page==='About' && <About/>}
          
        </Content>
     
   
        <Footer/>

    </div>
  );
}

export default App;

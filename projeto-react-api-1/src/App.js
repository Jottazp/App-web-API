import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Livros from './pages/Livros';
import NovoLivro from './pages/NovoLivro';
import Container from './components/Container';
import EditarLivro from './pages/EditarLivro';

function App() {
  return (
    <div className="App">
              
      <BrowserRouter>

        <Container>

          <Routes>
            <Route path='/' element={<NavBar />}>

              <Route index element={<Home />} />
              <Route path='/Livros' element={<Livros />} />
              <Route path='/novoLivro' element={<NovoLivro />} />
              <Route path='/editarLivro/:id' element={<EditarLivro />} />

            </Route>
          </Routes>

        </Container>

      </BrowserRouter>

    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../components/message/Message';
import CardBook from '../components/cardBook/CardBook'
import styles from './Livros.module.css'

function Livros() {

  const [books, setBooks] = useState([]);

  useEffect(()=>{

    fetch('http://localhost:5000/books', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application.json'
      },
    })
    .then((resp)=>resp.json())
    .then((data)=>{setBooks(data)})
    .catch((err)=>{console.log(err)});

  }, []);

  const location = useLocation();
  let message='';

  console.log('LOCATION STATE: ' + location.state)

  if (location.state) {
    message = location.state
  }

  return(
    <section className={styles.livros_container}>

      <h1>Aqui serão listados os seus livros</h1>

      {
        message && (<Message
                      msg={message}
                      type='success'
                    /> 
        )
      }

      {

       books.map((book)=>(
        
        <CardBook
          id={book.id}
          livro={book.nome_livro}
          autor={book.nome_autor}
          categoria={book.category.category}
        />

       )) 

      }

    </section>
  )
}

export default Livros;
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../components/message/Message';
import CardBook from '../components/cardBook/CardBook'
import styles from './Livros.module.css'

function Livros() {

  const [books, setBooks] = useState([]);

  /* ESTADO DE DADOS DA MENSAGEM DE EXCLUSÃO DE LIVRO */
  const [bookMessage, setBookMessage] = useState('');

  useEffect(()=>{

    fetch('http://localhost:5000/listagemLivros',{
      method: 'GET',
      mode: 'cors',
      headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'*',
      },
    })
    .then((resp)=>resp.json())
    .then((data)=>{setBooks(data)})
    .catch((err)=>{console.log(err)});

  }, [books]);

  /* FUNÇÃO DE EXCLUSÃO DE LIVRO */
  function removeBooks(id) {
    
    fetch('http://localhost:5000/excluirLivro/${id}', {
      method: 'DELETE',
      mode: 'cors',
      headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers':'*',
      },
    })
    .then(resp=> resp.json())
    .then(
      (data)=>{
        // setBooks(books.filter((book_data)=>book_data.id !== id))
        // alert('LIVRO EXCLUÍDO')
        setBookMessage('LIVRO EXCLUÍDO COM SUCESSO!')
      }
    )
    .catch(err=>console.log(err));

  }

  const location = useLocation();
  let message='';

  console.log('LOCATION STATE: ' + location.state)

  if (location.state) {
    message = location.state
  }

  return(
    <section className={styles.livros_container}>

      <h1>Aqui serão listados os seus livros</h1>

      {/* MENSAGEM DE SUCESSO PARA CADASTRO */}
      {
        message && (<Message
                      msg={message}
                      type='success'
                    /> 
        )
      }

      {/* MENSAGEM DE SUCESSO PARA EXCLUSÃO */}
      {
        bookMessage && (<Message
                      msg={bookMessage}
                      type='success'
                    /> 
        )
      }

      {

  books.map((book)=>(
    
    <CardBook
        id={book.cod_livro}
        livro={book.nome_livro}
        autor={book.nome_autor}
        // category={turmas.category.category}
        key={book.cod_livro}
        handlerRemover={removeBooks}
    />
    
  ))

      }

    </section>
  )
}

export default Livros;
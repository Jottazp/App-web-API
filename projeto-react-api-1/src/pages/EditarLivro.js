import styles from './EditarLivro.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../components/form/Input';
import Select from '../components/form/Select'

function EditarLivro(){

    /*STATE DE DADOS DAS CATEGORIAS VINDAS DO ARQUIVO db.json*/
    const [categories, setCategories] = useState([]);

    const {id} = useParams();
    console.log('ID' + id)

    const[book, setBook] = useState({});

    /*RECUPERA OS DADOS DE CATEGORIA DO ARQUIVO db.json*/
    useEffect (()=>{
      fetch(
          'http://localhost:5000/categories',
          {
              method:'GET',
              headers:{
                  'Content-Type':'application/json'
              }
          }).then(
              (resp)=>resp.json()
          ).then(
              (data)=>{
                  setCategories(data);
                  console.log(data);
              }
          ).catch(
              (error)=>{
                  console.log(error)
              }
          )
      }, [])

    /*RECUPERANDO OS DADOS DE LIVROS PARA EDIÇÃO*/
    useEffect(()=>{

        fetch(`http://localhost:5000/books${id}`, {
          method: 'GET',
          headers: {
            'Content-Type' : 'application.json'
          },
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            setBook(data);
            console.log(data);
        })
        .catch((err)=>{console.log(err)});
    
      }, []);

      /*HANDLER DE CAPTURA DOS DADOS DE SELECT (ID, CATEGORIA)*/
      function handlerChangeBook(event) {
        setBook({...book, [event.target.name] : event.target.value});
        console.log(book)
      }
      function handlerChangeCategory(event) {
        setBook({...book, category : {
            id: event.target.value,
            category: event.target.options[event.target.selectedIndex].text
        }});
        // console.log(book)
      }

    return(
        <div className={styles.book_container}>
            <h1>EDIÇÃO DE LIVRO</h1>

            <form>

              <Input
                type="text"
                name="nome_livro"   
                id="nome_livro"
                placeholder="Digite o título do livro"
                text="Digite o título do livro"
                value={book.nome_livro}
                // handlerOnchange={handlerChangeBook}
              />

              <Input
                type="text"
                name="nome_autor"
                id="nome_autor"
                placeholder="Digite o nome do autor"
                text="Digite o nome do autor"
                value={book.nome_autor}
                // handlerOnchange={handlerChangeBook}
              />

              <Input
                type="text"
                name="descricao"
                id="descricao"
                placeholder="Digite uma descrição para o livro"
                text="descricao"
                value={book.descricao}
                // handlerOnchange={handlerChangeBook}
              />

              <Select
                name="categoria_id"
                text="Selecione a categoria do livro"
                options={categories}
                // handlerOnchange={handlerChangeCategory}
              />

            </form>

        </div>
    )
    
}

export default EditarLivro;
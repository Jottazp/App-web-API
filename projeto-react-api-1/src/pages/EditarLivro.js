import styles from './EditarLivro.module.css';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../components/form/Input';
import Select from '../components/form/Select'

function EditarLivro(){

    /*STATE DE DADOS DAS CATEGORIAS VINDAS DO ARQUIVO db.json*/
    const [categories, setCategories] = useState([]);

    /*RECUPERANDO O ID DA URL*/
    const {id} = useParams();
    console.log('ID' + id)

    /*OBJETO DE NAVEGAÇÃO*/
    const navigate = useNavigate();

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

        fetch(`http://localhost:5000/books/${id}`, {
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

    /*FUNCIONALIDADE DE EDIÇÃO DE LIVRO*/
    function editBook(book){

      fetch(`http://localhost:5000/books/${book.id}`, {
        method:'PATCH',
        headers: {
          'Content-Type' : 'application.json'
        },
        body: JSON.stringify(book)
      })
      .then(resp=>resp.json())
      .then((data)=>{
        setBook(data);
        navigate('/livros', {state:'Livro alterado com sucesso!'})
      })
      .catch(err=>(console.log(err)))
    }

    /*FUNÇÃO DE SUBMIT CONTROLADO DOS DADOS*/
    function submit(event) {
      event.preventDefault();
      editBook(book);
    }

    return(
        <div className={styles.book_container}>
            <h1>EDIÇÃO DE LIVRO</h1>

            <form onSubmit={submit}>

              <Input
                type="text"
                name="nome_livro"   
                id="nome_livro"
                placeholder="Digite o título do livro"
                text="Digite o título do livro"
                value={book.nome_livro}
                handlerOnchange={handlerChangeBook}
              />

              <Input
                type="text"
                name="nome_autor"
                id="nome_autor"
                placeholder="Digite o nome do autor"
                text="Digite o nome do autor"
                value={book.nome_autor}
                handlerOnchange={handlerChangeBook}
              />

              <Input
                type="text"
                name="descricao"
                id="descricao"
                placeholder="Digite uma descrição para o livro"
                text="descricao"
                value={book.descricao}
                handlerOnchange={handlerChangeBook}
              />

              <Select
                name="categoria_id"
                text="Selecione a categoria do livro"
                options={categories}
                handlerOnchange={handlerChangeCategory}
              />
              
              <p>
                 <input type='submit' value='Editar Livro'/>
              </p>

            </form>

        </div>
    )
    
}

export default EditarLivro;
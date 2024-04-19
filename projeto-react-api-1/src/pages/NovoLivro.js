import { useState, useEffect } from 'react';
import Input from '../components/form/Input';
import Select from '../components/form/Select'

import styles from './NovoLivro.module.css'
import { useNavigate } from 'react-router-dom';

function NovoLivro() {

    /*OBJETO DE NAVEGAÇÃO*/
    const navigate = useNavigate();

    /*STATE DE DADOS DAS CATEGORIAS VINDAS DO ARQUIVO db.json*/
    const [categories, setCategories] = useState([]);

    /*STATE DE DADOS QUE VAI ARMAZENAR O OBJETO JSON DO LIVRO*/
    const [book, setBook] = useState({});

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
        console.log(book)

        /*INSERÇÃO DOS DADOS DE LIVROS*/
        function createBook(book) {

            fetch('http://localhost:5000/books', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(book)
            })
            .then(
                (resp)=>resp.json()
            )
            .then(
                (data)=>{
                    console.log(data);
                    navigate('/livros', {state: 'LIVRO CADASTRADO COM SUCESSO'});
                }
            )
            .catch(
                (err)=>{ console.log(err) }
            )
        }

        /*FUNÇÃO DE SUBMIT*/
        function submit(event) {
            event.preventDefault();
            createBook(book);
        }

    return(
        <section className={styles.novo_livro_container}>

            <h1>Cadastro de Livro</h1>

            <form onSubmit={submit}>

                {/* <p>
                    <input type='text' placeholder='Nome do livro' />
                </p> */}
                <Input
                    type="text"
                    name="nome_livro"   
                    id="nome_livro"
                    placeholder="Digite o título do livro"
                    text="Digite o título do livro"
                    handlerOnchange={handlerChangeBook}
                />

                {/* <p>
                    <input type='text' placeholder='Nome do autor' />
                </p> */}
                <Input
                    type="text"
                    name="nome_autor"
                    id="nome_autor"
                    placeholder="Digite o nome do autor"
                    text="Digite o nome do autor"
                    handlerOnchange={handlerChangeBook}
                />

                {/* <p>
                    <input type='text' placeholder='Descrição do livro' />
                </p> */}
                <Input
                    type="text"
                    name="descricao"
                    id="descricao"
                    placeholder="Digite uma descrição para o livro"
                    text="descricao"
                    handlerOnchange={handlerChangeBook}
                />

                <Select
                    name="categoria_id"
                    text="Selecione a categoria do livro"
                    options={categories}
                    handlerOnchange={handlerChangeCategory}
                />

                <p>
                <input type='submit' value="Cadastrar livro" />
                </p>

            </form>

        </section>
    )
}

export default NovoLivro;
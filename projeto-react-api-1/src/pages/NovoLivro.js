import Input from '../components/form/Input';

import styles from './NovoLivro.module.css'

function NovoLivro() {
    return(
        <section className={styles.novo_livro_container}>

            <h1>Cadastro de Livro</h1>

            <form>

                {/* <p>
                    <input type='text' placeholder='Nome do livro' />
                </p> */}
                <Input
                    type="text"
                    name="nome_livro"
                    id="nome_livro"
                    placeholder="Digite o título do livro"
                    text="Digite o título do livro"
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
                />

                <p>
                <input type='submit' value="Cadastrar livro" />
                </p>

            </form>

        </section>
    )
}

export default NovoLivro;
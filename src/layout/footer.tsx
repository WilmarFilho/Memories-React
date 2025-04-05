
export default function Footer() {
    return (
        <footer>
            <section className="col-12 row topFooter">
                <div className="col-12 col-md-4 col-lg-4 d-flex">
                    <h4>Menu</h4>
                    <ul className='NavFooter'>
                        <li><a href='https://seudrink.framer.website'>Home</a></li> 
                        <li><a href='http://localhost:3000/pesquisa'>Pesquisar</a></li>
                        <li><a href='https://seudrink.framer.website/#form'>Seja Colaborador</a></li>
                    </ul>
                </div>
                <div className="col-12 col-md-4 col-lg-4 d-flex content-sobre">
                    <h4>Sobre</h4>
                    <p>Web Service criado para ajudar amantes de drinks</p>
                </div>
                <div className="col-9 col-md-4 col-lg-4 d-flex content-Logo">
                <a href='https://seudrink.framer.website'><h2>Memories</h2></a>
                </div>
            </section>
            <section className="col-12 d-flex copy">

                <p>Copyright (c) 2025 Wilmar Filho - Todos os direitos reservados </p>

            </section>
        </footer>
    )
};

import iconWpp from '../assets/Wpp.svg';
import iconInsta from '../assets/Insta.svg'
import './index.css'

export default function Footer() {
    return (
        <footer>

            <section className="col-12 row topFooter">

                <div className="col-12 col-md-4 col-lg-4 d-flex content-Logo-Footer">
                    <div className='footerWrapper'>
                        <a href='https://memorias.framer.website'><h4>Memories</h4></a>
                    </div>
                    <div className='wrapperSobre col-11'>
                        <p className='bio'>Transforme momentos especiais em lembranças eternas.</p>
                        <div className="iconsFooter">
                            <a href='https://www.instagram.com/wilmar.wf/'><img src={iconWpp} /></a>
                            <a href='https://www.instagram.com/wilmar.wf/'><img src={iconInsta} /></a>
                            <div></div>
                        </div>
                    </div>

                </div>


                <div className="col-12 col-md-4 col-lg-4 d-flex content-Menu">
                    <div className='footerWrapper'>
                        <h4>Menu</h4>
                    </div>
                    <ul className='NavFooter'>
                        <li><a href='https://memorias.framer.website/'>Home</a></li>
                        <li><a href='https://memorias.framer.website/#paraquem'>Para quem</a></li>
                        <li><a href='https://memorias.framer.website/#steps'>Como usar</a></li>
                        <li><a href='https://memorias.framer.website/#depoimentos'>depoimentos</a></li>
                    </ul>
                </div>

                <div className="col-12 col-md-4 col-lg-4 d-flex content-Menu-2">
                    <div className='footerWrapper'>
                        <h4>Ajuda</h4>
                    </div>
                    <ul className='NavFooter'>
                        <li><a href='https://memorias.framer.website/'>Política de privacidade</a></li>
                        <li><a href='https://memorias.framer.website/'>Termos de uso</a></li>
                        <li><a href='https://memorias.framer.website/'>Suporte</a></li>
                    </ul>
                </div>


            </section>

            <section className="col-12 d-flex copy">

                <p>Copyright (c) 2025 Memories - Todos os direitos reservados </p>

            </section>
        </footer>
    )
};
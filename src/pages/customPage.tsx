import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../services/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Page from '../types/page';


export default function CustomPage() {

    const { hash } = useParams<{ hash: string }>();
    const [paginas, setPaginas] = useState<Page[] | null>([]);


    useEffect(() => {
        if (hash) {
            const rota = '/pages/' + hash;

            api.get(rota)
                .then((response) => setPaginas(response.data));
        }
    }, [hash]);

    const resetAnimations = () => {
        const animatedElements = document.querySelectorAll('.slide-in-top, .slide-in-top-2, .slide-in-top-3');
        animatedElements.forEach((el) => {
            el.classList.remove('slide-in-top', 'slide-in-top-2', 'slide-in-top-3');
            // Força o reflow pra garantir o reinício da animação
            void el.clientHeight;
            el.classList.add('slide-in-top');
        });
    };

    return (
        <div className='customPage'>

            {paginas ? (
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
                    spaceBetween={0}
                    slidesPerView={1}
                    centeredSlides={true}
                    observer={true}
                    observeParents={true}
                    initialSlide={0}
                    scrollbar={{ draggable: true }}
                    onSlideChange={() => resetAnimations()}
                    navigation // ← Ativa as setas
                    mousewheel={true} // ← Habilita scroll com mouse

                >

                    {paginas.map((pagina, index) => (
                        <SwiperSlide>
                            <div className='content-slide'>

                                <div className='SlidePageBot slide-in-top-3'>
                                    <p>
                                        {pagina.descricao}
                                    </p>
                                </div>
                                <div className='SlidePageTop'>
                                    <div className='contentImagesPageTop col-12'>
                                        <div className='imgPageTeste slide-in-top'>
                                            <img className='image-blur-bg' src={`https://apimemories.celleta.com/${pagina.img_01}`} />
                                            <img className='image-main' src={`https://apimemories.celleta.com/${pagina.img_01}`} />
                                        </div>
                                        <div className='imgPageTeste slide-in-top-2'>
                                            <img className='image-blur-bg' src={`https://apimemories.celleta.com/${pagina.img_02}`} />
                                            <img className='image-main' src={`https://apimemories.celleta.com/${pagina.img_02}`} />
                                        </div>

                                    </div>
                                    <div className='contentImagesPageBot col-12' >
                                        <div className='imgPageTeste slide-in-top-3'>
                                            <img className='image-blur-bg' src={`https://apimemories.celleta.com/${pagina.img_03}`} />
                                            <img className='image-main' src={`https://apimemories.celleta.com/${pagina.img_03}`} />
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </SwiperSlide>
                    ))}


                </Swiper>
            ) : (
                null
            )
            }



        </div>
    )
}
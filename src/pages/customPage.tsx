import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import './assets/page.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




export default function CustomPage() {

    interface Page {
        id: number;
        created_at: string;
        updated_at: string;
        img_01: string;
        img_02: string;
        img_03: string;
        descricao: string;
        hash_id: string;
        user_id: number;
    }

    const { hash } = useParams<{ hash: string }>();
    const [paginas, setPaginas] = useState<Page[] | null>([]);


    useEffect(() => {
        if (hash) {
            const rota = '/pages/' + hash;

            api.get(rota)
                .then((response) => setPaginas(response.data));
        }
    }, [hash]);

    //<img src={`https://apimemories.celleta.com/${pagina.img_01}`} />

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
                    navigation // ← Ativa as setas
                    mousewheel={true} // ← Habilita scroll com mouse

                >

                    {paginas.map((pagina, index) => (
                        <SwiperSlide>
                            <div className='content-slide'>

                                <div className='SlidePageBot'>
                                    <p>
                                        {pagina.descricao}
                                    </p>
                                </div>
                                <div className='SlidePageTop'>
                                    <div className='contentImagesPageTop col-12'>
                                        <img className='imgPageTeste' src={`https://apimemories.celleta.com/${pagina.img_01}`} />
                                        <img className='imgPageTeste' src={`https://apimemories.celleta.com/${pagina.img_02}`} />
                                    </div>
                                    <div className='contentImagesPageBot col-12' >
                                        <img className='imgPageTeste' src={`https://apimemories.celleta.com/${pagina.img_03}`} />
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
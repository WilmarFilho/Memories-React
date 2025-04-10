import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import api from '../services/api';
import { paginasState } from '../recoil/atoms';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function CustomPage() {
  const { hash } = useParams<{ hash: string }>();
  const [paginas, setPaginas] = useRecoilState(paginasState);

  useEffect(() => {
    if (hash) {
      api.get(`/pages/${hash}`)
        .then((response) => setPaginas(response.data))
        .catch((error) => console.error('Erro ao buscar páginas:', error));
    }
  }, [hash, setPaginas]);

  const resetAnimations = () => {
    const animatedElements = document.querySelectorAll(
      '.slide-in-top, .slide-in-top-2, .slide-in-top-3'
    );
    animatedElements.forEach((el) => {
      el.classList.remove('slide-in-top', 'slide-in-top-2', 'slide-in-top-3');
      void el.clientHeight;
      el.classList.add('slide-in-top');
    });
  };

  const renderImage = (src?: string, animationClass?: string) => {
    if (!src) return null;
    const fullSrc = `https://apimemories.celleta.com/${src}`;
    return (
      <div className={`imgPageTeste ${animationClass}`}>
        <img className='image-blur-bg' src={fullSrc} alt='' />
        <img className='image-main' src={fullSrc} alt='' />
      </div>
    );
  };

  if (!paginas || paginas.length === 0) return null;

  return (
    <div className='customPage'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides
        observer
        observeParents
        initialSlide={0}
        scrollbar={{ draggable: true }}
        navigation
        mousewheel
        onSlideChange={resetAnimations}
      >
        {paginas.map((pagina, index) => (
          <SwiperSlide key={index}>
            <div className='content-slide'>
              <div className='SlidePageBot slide-in-top-3'>
                <p>{pagina.descricao}</p>
              </div>

              <div className='SlidePageTop'>
                <div className='contentImagesPageTop col-12'>
                  {renderImage(pagina.img_01, 'slide-in-top')}
                  {renderImage(pagina.img_02, 'slide-in-top-2')}
                </div>

                <div className='contentImagesPageBot col-12'>
                  {renderImage(pagina.img_03, 'slide-in-top-3')}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

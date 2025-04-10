import { useRecoilValue } from 'recoil';
import usePaginasCompartilhadas from '../recoil/hooks/usePaginasCompartilhadas';
import { paginasState } from '../recoil/atoms';
import { resetAnimations } from '../utils/animation';
import {renderImage} from '../utils/render'

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
  
  const paginas = useRecoilValue(paginasState);

  usePaginasCompartilhadas();

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

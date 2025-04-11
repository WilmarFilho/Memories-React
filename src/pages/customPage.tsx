// Bibliotecas e módulos
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
} from 'swiper/modules';

// Estado global e hooks
import usePaginasCompartilhadas from '../recoil/hooks/usePaginasCompartilhadas';
import { paginasState } from '../recoil/atoms';

// Utilitários
import { resetAnimations } from '../utils/animation';
import { renderImage } from '../utils/render';

// Estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function CustomPage() {

  const loading = usePaginasCompartilhadas();
  const paginas = useRecoilValue(paginasState);

  if (loading) return null;

  if (!paginas || paginas.length === 0) {
    return <Navigate to="/login" replace />;
  }

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
          <SwiperSlide key={pagina.id}>
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

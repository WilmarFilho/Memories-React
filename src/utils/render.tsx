export function renderImage(src?: string, animationClass?: string) {
  if (!src) return null;

  const fullSrc = `https://apimemories.celleta.com/${src}`;
  return (
    <div className={`imgPageTeste ${animationClass}`}>
      <img className='image-blur-bg' src={fullSrc} alt='Imagem de Fundo com Blur' />
      <img className='image-main' src={fullSrc} alt='Imagem do Momento Especial' />
    </div>
  );
}

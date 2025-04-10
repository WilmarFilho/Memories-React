export function renderImage(src?: string, animationClass?: string) {
  if (!src) return null;

  const fullSrc = `https://apimemories.celleta.com/${src}`;
  return (
    <div className={`imgPageTeste ${animationClass}`}>
      <img className='image-blur-bg' src={fullSrc} alt='' />
      <img className='image-main' src={fullSrc} alt='' />
    </div>
  );
}

import PropTypes from 'prop-types';

/**
 * Moldura de celular: coluna fluida no aparelho (largura toda), moldura de
 * ~390px centralizada no desktop (P-03). As telas são responsivas dentro dela.
 * @param {{ children: import('react').ReactNode }} props
 */
export default function MobileFrame({ children }) {
  // dvh, não vh: no celular o 100vh mede a viewport com a barra de URL
  // recolhida — a coluna estourava a tela e cortava o RodapeAcao.
  return (
    <div className="flex min-h-dvh justify-center bg-slate-200">
      <div className="flex min-h-dvh w-full flex-col bg-white shadow-xl sm:max-w-[390px]">
        {children}
      </div>
    </div>
  );
}

MobileFrame.propTypes = {
  children: PropTypes.node,
};

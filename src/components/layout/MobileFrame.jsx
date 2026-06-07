import PropTypes from 'prop-types';

/**
 * Moldura de celular: centraliza o app numa coluna ~390px no desktop (P-03).
 * Mobile-first — no celular ocupa a largura toda; no desktop vira "telefone".
 * @param {{ children: import('react').ReactNode }} props
 */
export default function MobileFrame({ children }) {
  return (
    <div className="flex min-h-screen justify-center bg-slate-200">
      <div className="flex min-h-screen w-full max-w-[390px] flex-col bg-white shadow-xl">
        {children}
      </div>
    </div>
  );
}

MobileFrame.propTypes = {
  children: PropTypes.node,
};

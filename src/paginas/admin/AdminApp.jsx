import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { sessaoAtual, observarSessao } from '../../services/auth.js';
import AdminLayout from './AdminLayout.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminEscolas from './AdminEscolas.jsx';
import AdminEscolaEdicao from './AdminEscolaEdicao.jsx';

// Raiz do backoffice (rota /admin/*). Gate de sessão: sem login → tela de login;
// com login → layout + rotas internas. A sessão é observada (login/logout/expira).
export default function AdminApp() {
  const [sessao, setSessao] = useState(undefined); // undefined = ainda carregando

  useEffect(() => {
    sessaoAtual().then(setSessao);
    return observarSessao(setSessao);
  }, []);

  if (sessao === undefined) {
    return (
      <div className="grid min-h-dvh place-items-center bg-slate-100 text-slate-500">
        Carregando…
      </div>
    );
  }
  if (!sessao) return <AdminLogin />;

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminEscolas />} />
        <Route path="escolas/novo" element={<AdminEscolaEdicao />} />
        <Route path="escolas/:escolaId" element={<AdminEscolaEdicao />} />
        <Route path="*" element={<AdminEscolas />} />
      </Routes>
    </AdminLayout>
  );
}

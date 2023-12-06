import { Link } from 'react-router-dom';

function Navs() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-xl font-bold">Clinica Geral Genérica</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Consultas</Link>
          <Link to="/medicos" className="hover:text-gray-300">Médicos</Link>
          <Link to="/pacientes" className="hover:text-gray-300">Pacientes</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navs;

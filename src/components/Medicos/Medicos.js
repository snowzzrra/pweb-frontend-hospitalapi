import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useState, useEffect } from 'react';

const instance = Axios.create({
  baseURL: 'http://localhost:8082/medico-ms',
});

const Medicos = () => {
  const [medicos, setMedicos] = useState([]);

  function deletar(id) {
    instance.delete(`medicos/${id}`).then(setMedicos(medicos.filter(medico => medico.id !== id)));
  }

  const fetchMedicos = () => {
    instance
      .get(`/medicos/consulta`)
      .then((response) => {
        console.log("Resposta da API:", response.data);

        // Verifica se a resposta é um array antes de atualizar o estado
        if (Array.isArray(response.data)) {
          setMedicos(response.data);
        } else {
          console.error("A resposta da API não é um array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar médicos:", error);
      });
  };

  useEffect(() => {
    fetchMedicos();
  }, []);  

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">Clinica Geral Genérica</Link>
            <Link to='/medicos/adicionar' className="bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-600">Adicionar Médico</Link>
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-4">
          {medicos.map(medico => (
            <div key={medico.id} className="bg-white text-black p-4 rounded shadow-md flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button onClick={() => deletar(medico.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-red-500" viewBox="0 0 16 16">
                      <path d="M5.5 1a.5.5 0 0 1 .5.5V14a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V1.5a.5.5 0 0 1 1 0V14a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V1.5a.5.5 0 0 1 .5-.5z" />
                      <path d="M12 3V1H4v2h8z" />
                    </svg>
                  </button>
                  <Link to={`/medico/edit/${medico.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen text-black" viewBox="0 0 16 16">
                      <path d="M13.498.795l1.2 1.2L2 14.998l-1.2-1.2A1.207 1.207 0 1 1 2.5 13.5l.2.2a1.5 1.5 0 0 1 .1 2.002l-.1.1a1.5 1.5 0 0 1-2.002.001l-.1-.1a1.5 1.5 0 0 1 0-2.002l.1-.1 11-11zm.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                    </svg>
                  </Link>
                </div>
                <div>
                  <h3 className="font-bold text-xl">{medico.nome}</h3>
                  <p>Email: {medico.email}</p>
                  <p>CRM: {medico.crm}</p>
                  <p>Especialidade: {medico.especialidade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Medicos;

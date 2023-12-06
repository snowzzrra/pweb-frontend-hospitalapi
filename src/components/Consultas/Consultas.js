import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:8082/consulta-ms',
});

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    instance.get(`/consultas`).then(data => {
      console.log(data);
      setConsultas(data.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Clínica Geral Genérica</h1>
        <div className="space-y-4">
          {consultas.map(consulta => (
            <div key={consulta.id} className="border p-4 rounded-md">
              <h3 className="text-xl font-bold mb-2">Especialidade: {consulta.medico && consulta.medico.especialidade}</h3>
              <p>Médico: {consulta.medico && consulta.medico.nome}</p>
              <p>Crm: {consulta.medico && consulta.medico.crm}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Consultas;

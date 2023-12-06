import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:8082/paciente-ms',
});

const EditarMedicos = () => {
  const [valoresIniciais, setValoresIniciais] = useState([]);
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const filteredId = location.pathname.replace('/paciente/edit/', '');
  const navigate = useNavigate();

  useEffect(() => {
    instance.get(`/pacientes/${filteredId}`).then(data => {
      setValoresIniciais(data.data);
      console.log(data.data);
      setUpdate(true);
    }).catch();
  }, []);

  const schema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatório"),
    telefone: yup.string().required("Esse campo é obrigatório"),
    UF: yup.string().required("Esse campo é obrigatório"),
    cidade: yup.string().required("Esse campo é obrigatório"),
    bairro: yup.string().required("Esse campo é obrigatório"),
    logradouro: yup.string().required("Esse campo é obrigatório"),
    cep: yup.string().required("Esse campo é obrigatório")
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div style={{ display: 'flex', flexDirection: 'center' }} className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div style={{ display: 'flex', flex: '2' }} className="row align-items-center g-lg-5 py-5">
          <div style={{ display: 'flex', flexDirection: 'column', flexGap: '1rem' }} className="col-md-10 mx-auto col-lg-7">
            <div className='my-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <h2>Clinica Geral Genérica</h2>
              </div>
            </div>
            <div className='my-3' style={{ display: 'flex', justifyContent: 'space-between' }}><h5>Editar Médico</h5>
              <Link to='/medicos'> <Button style={{ backgroundColor: '#641864', borderColor: 'black' }} className="w-10 btn btn-sm btn-primary">Voltar</Button> </Link>
            </div>

            {update && <Formik
              validator={() => ({})}
              validationSchema={schema}
              onSubmit={values => {
                console.log('mandei');
                instance.put(`/pacientes/${filteredId}`, {
                  nome: values.nome, telefone: values.telefone, endereco: {
                    UF: values.UF,
                    cidade: values.cidade,
                    bairro: values.bairro,
                    logradouro: values.logradouro,
                    cep: values.cep,
                    numero: values.numero,
                    complemento: values.complemento
                  }
                }).then(datads => {
                  console.log(datads, 'a info que retorna');
                  navigate('/medicos');
                }).catch(e => console.log(e.response.data.errors[0]));
              }}
              initialValues={{
                nome: valoresIniciais.nome,
                telefone: valoresIniciais.telefone,
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={values.nome}
                      onChange={handleChange}
                      isInvalid={errors.nome}
                      placeholder="Nome..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.token}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="text"
                      name="telefone"
                      value={values.telefone}
                      onChange={handleChange}
                      isInvalid={errors.telefone}
                      placeholder="Telefone..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.balance}</Form.Control.Feedback>
                  </Form.Group>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button style={{ backgroundColor: '#641864', borderColor: 'black' }} type="submit" className="w-10 btn btn-sm btn-primary px-5 my-3 " >Save</Button>
                  </div>
                </Form>
              )}
            </Formik>}

          </div>
        </div>
      </div>
      <div style={{ display: 'none' }} data-testid='test'></div>
    </div>
  );
}

export default EditarMedicos;

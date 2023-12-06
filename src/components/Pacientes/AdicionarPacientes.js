import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:8082/paciente-ms',
});

const AdicionarPacientes = () => {
  const [pacienteError, setPacienteError] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatorio"),
    email: yup.string().required("Esse campo é obrigatorio"),
    cpf: yup.string().required("Esse campo é obrigatorio"),
    telefone: yup.string().required("Esse campo é obrigatorio"),
    UF: yup.string().required("Esse campo é obrigatorio"),
    cidade: yup.string().required("Esse campo é obrigatorio"),
    bairro: yup.string().required("Esse campo é obrigatorio"),
    logradouro: yup.string().required("Esse campo é obrigatorio"),
    cep: yup.string().required("Esse campo é obrigatorio")
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
            <div className='my-3' style={{ display: 'flex', justifyContent: 'space-between' }}><h5>Adicionar Paciente</h5>
              <Link to='/pacientes'>
                <Button style={{ backgroundColor: '#641864', borderColor: 'black' }} className="w-10 btn btn-sm btn-primary">Voltar</Button>
              </Link>
            </div>

            <Formik
              validator={() => ({})}
              validationSchema={schema}
              onSubmit={values => {
                instance.post(`/pacientes`, {
                  nome: values.nome, telefone: values.telefone, email: values.email, cpf: values.cpf, endereco: {
                    UF: values.UF,
                    cidade: values.cidade,
                    bairro: values.bairro,
                    logradouro: values.logradouro,
                    cep: values.cep,
                    numero: values.numero,
                    complemento: values.complemento
                  }
                }).then(datads => {
                  console.log(datads, 'a info que retorna')
                  navigate('/pacientes')
                })
                  .catch(e => setPacienteError(e.response.data.errors[0]))
              }}
              initialValues={{
                nome: '',
                telefone: '',
                email: '',
                cpf: '',
                UF: '',
                cidade: '',
                bairro: '',
                logradouro: '',
                cep: '',
                numero: '',
                complemento: '',
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
                      isInvalid={errors.nome || pacienteError}
                      placeholder="Nome..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>{pacienteError}</Form.Control.Feedback>
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
                    <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={errors.email}
                      placeholder="Email..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Cpf</Form.Label>
                    <Form.Control
                      type="text"
                      name="cpf"
                      value={values.cpf}
                      onChange={handleChange}
                      isInvalid={errors.cpf}
                      placeholder="Cpf..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>UF</Form.Label>
                    <Form.Control
                      type="text"
                      name="UF"
                      value={values.UF}
                      onChange={handleChange}
                      isInvalid={errors.UF}
                      placeholder="UF..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.UF}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      name="cidade"
                      value={values.cidade}
                      onChange={handleChange}
                      isInvalid={errors.cidade}
                      placeholder="Cidade..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.cidade}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      type="text"
                      name="bairro"
                      value={values.bairro}
                      onChange={handleChange}
                      isInvalid={errors.bairro}
                      placeholder="Bairro..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.bairro}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Logradouro</Form.Label>
                    <Form.Control
                      type="text"
                      name="logradouro"
                      value={values.logradouro}
                      onChange={handleChange}
                      isInvalid={errors.logradouro}
                      placeholder="Logradouro..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.logradouro}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                      type="text"
                      name="cep"
                      value={values.cep}
                      onChange={handleChange}
                      isInvalid={errors.cep}
                      placeholder="CEP..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.cep}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control
                      type="text"
                      name="numero"
                      value={values.numero}
                      onChange={handleChange}
                      isInvalid={errors.numero}
                      placeholder="Numero..."
                      required
                    />
                    <Form.Control.Feedback type='invalid'>{errors.numero}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md="10" controlId="validationFormik01">
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control
                      type="text"
                      name="complemento"
                      value={values.complemento}
                      onChange={handleChange}
                      isInvalid={errors.complemento}
                      placeholder="Complemento..."
                    />
                    <Form.Control.Feedback type='invalid'>{errors.complemento}</Form.Control.Feedback>
                  </Form.Group>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button style={{ backgroundColor: '#641864', borderColor: 'black' }} type="submit" className="w-10 btn btn-sm btn-primary px-5 my-3 " >Save</Button>
                  </div>
                </Form>
              )}
            </Formik>

          </div>
        </div>
      </div>
      <div style={{ display: 'none' }} data-testid='test'></div>
    </div>
  );
}

export default AdicionarPacientes;

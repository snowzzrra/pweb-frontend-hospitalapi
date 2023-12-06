import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:8082/medico-ms',
});

const EditarMedicos = () => {
  const [valoresIniciais, setValoresIniciais] = useState([]);
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const filteredId = location.pathname.replace('/medico/edit/', '');
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(`/medicos/consulta/${filteredId}`)
      .then((data) => {
        setValoresIniciais(data.data);
        console.log(data.data);
        setUpdate(true);
      })
      .catch((e) => console.log(e));
  }, []);

  const schema = yup.object().shape({
    nome: yup.string().required('Esse campo é obrigatório'),
    telefone: yup.string().required('Esse campo é obrigatório'),
    UF: yup.string().required('Esse campo é obrigatório'),
    cidade: yup.string().required('Esse campo é obrigatório'),
    bairro: yup.string().required('Esse campo é obrigatório'),
    logradouro: yup.string().required('Esse campo é obrigatório'),
    cep: yup.string().required('Esse campo é obrigatório'),
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">
              Wish Wallet
            </Link>
            <Link
              to="/medicos"
              className="bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              Voltar
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h5 className="text-3xl mb-4">Editar Médico</h5>

          {update && <Formik
            validator={() => ({})}
            validationSchema={schema}
            onSubmit={values => {
              console.log('mandei')
              instance.put(`/medicos/${filteredId}`, {
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
                console.log(datads, 'a info que retorna')
                navigate('/medicos')
              })
                .catch(e => console.log(e.response.data.errors[0]))
            }}
            initialValues={{
              nome: valoresIniciais.nome,
              telefone: valoresIniciais.telefone,
              UF: valoresIniciais.endereco.uf,
              cidade: valoresIniciais.endereco.cidade,
              bairro: valoresIniciais.endereco.bairro,
              logradouro: valoresIniciais.endereco.logradouro,
              cep: valoresIniciais.endereco.cep,
              numero: valoresIniciais.endereco.numero,
              complemento: valoresIniciais.endereco.complemento,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors
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
                  <Form.Control.Feedback type='invalid'>{errors.balance}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="10" controlId="validationFormik01">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    type="text"
                    name="bairro"
                    value={values.bairro}
                    onChange={handleChange}
                    isInvalid={errors.bairro}
                    placeholder="BAirro..."
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
          })
        </div>
      </div>
    </div>
  );
};

export default EditarMedicos;

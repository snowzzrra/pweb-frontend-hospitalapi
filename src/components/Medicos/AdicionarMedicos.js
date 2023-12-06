import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:8082/medico-ms',
});

const AdicionarMedicos = () => {
  const [medicoError, setMedicoError] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    nome: yup.string().required("Esse campo é obrigatorio"),
    email: yup.string().required("Esse campo é obrigatorio"),
    crm: yup.string().required("Esse campo é obrigatorio"),
    especialidade: yup.string().required("Esse campo é obrigatorio"),
    telefone: yup.string().required("Esse campo é obrigatorio"),
    UF: yup.string().required("Esse campo é obrigatorio"),
    cidade: yup.string().required("Esse campo é obrigatorio"),
    bairro: yup.string().required("Esse campo é obrigatorio"),
    logradouro: yup.string().required("Esse campo é obrigatorio"),
    cep: yup.string().required("Esse campo é obrigatorio")
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">Clinica Geral Genérica</Link>
            <Link to='/medicos' className="bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-600">Voltar</Link>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h5 className="text-3xl mb-4">Adicionar Médico</h5>

          <Formik
            validator={() => ({})}
            validationSchema={schema}
            onSubmit={values => {
              instance.post(`/medicos`, {
                nome: values.nome, telefone: values.telefone, email: values.email, crm: values.crm, especialidade: values.especialidade, endereco: {
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
                .catch(e => setMedicoError(e.response.data.errors[0]))
            }}
            initialValues={{
              nome: '',
              telefone: '',
              email: '',
              crm: '',
              especialidade: '',
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
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              isValidating,
              validate,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>

                <Form.Group md="10" controlId="validationFormik01">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    isInvalid={errors.nome || medicoError}
                    placeholder="Nome..."
                    required
                  />
                  <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>{medicoError}</Form.Control.Feedback>
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
                  <Form.Label>Crm</Form.Label>
                  <Form.Control
                    type="text"
                    name="crm"
                    value={values.crm}
                    onChange={handleChange}
                    isInvalid={errors.crm}
                    placeholder="Crm..."
                    required
                  />
                  <Form.Control.Feedback type='invalid'>{errors.crm}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="10" controlId="validationFormik01">
                  <Form.Label>Especialidade</Form.Label>
                  <Form.Control
                    as='select'
                    name="especialidade"
                    value={values.especialidade}
                    onChange={handleChange}
                    isInvalid={errors.especialidade}
                    placeholder="Email..."
                    required
                  >
                    <option disabled value="">Selecione a Especialidade</option>
                    <option value='ORTOPEDIA'>ORTOPEDIA</option>
                    <option value='CARDIOLOGIA'>CARDIOLOGIA</option>
                    <option value='GINECOLOGIA'>GINECOLOGIA</option>
                    <option value='DERMATOLOGIA'>DERMATOLOGIA</option>

                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>{errors.especialidade}</Form.Control.Feedback>
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
  );
}

export default AdicionarMedicos;

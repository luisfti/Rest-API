import React, { useState } from "react";
import customersService from "../../services/customers.service";

const CustomersForm = () => {
  const initialCustomerState = {
    name: "",
    email: "",
    phone: "",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [customer, setCustomer] = useState(initialCustomerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = () => {
    var data = {
      name: name,
      email: email,
      phone: phone,
    };

    customersService
      .create(data)
      .then(response => {
        setCustomer({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCustomer = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCustomer(initialCustomerState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Cliente adicionado com Sucesso!</h4>
          <button className="btn btn-success" onClick={newCustomer}>
            Ok
          </button>
        </div>
      ) : (
        <div className="container">
          <div className="">
            <h2 className="mb-4">Formulário:</h2>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <label for="floatingInput">Nome</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
              <label for="floatingPassword">Telefone</label>
            </div>
          </div>
          <button onClick={saveCustomer} className="btn btn-success">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomersForm;

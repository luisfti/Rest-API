import React, { useState, useEffect } from "react";
import customersService from "../../services/customers.service";
import { Link } from "react-router-dom";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomers, setCurrentCustomers] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveCustomers();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCustomers = () => {
    customersService
      .getAll()
      .then(response => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCustomers();
    setCurrentCustomers(null);
    setCurrentIndex(-1);
  };

  const setActiveCustomer = (customer, index) => {
    setCurrentCustomers(customer);
    setCurrentIndex(index);
  };

  const removeAllCustomers = () => {
    customersService
      .removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    console.log(searchName);
    customersService
      .findByName(searchName)
      .then(response => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Procurar por nome"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Clientes</h4>

        <ul className="list-group">
          {customers &&
            customers.map((customer, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCustomer(customer, index)}
                key={index}
              >
                {customer.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCustomers}
        >
          Remover Todos
        </button>
      </div>
      <div className="col-md-6">
        {currentCustomers ? (
          <div>
            <h4>Cliente</h4>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentCustomers.name}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentCustomers.email}
            </div>
            <div>
              <label>
                <strong>Telefone:</strong>
              </label>{" "}
              {currentCustomers.phone}
            </div>

            <Link to={"/customers/" + currentCustomers.id}>
              <div className="badge text-bg-primary text-wrap">Editar</div>
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione um cliente...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersList;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customersService from "../../services/customers.service";

const CustomerProfile = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialCustomerState = {
    id: null,
    name: "",
    email: "",
    phone: false,
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState("");

  const getCustomer = id => {
    customersService
      .get(id)
      .then(response => {
        setCurrentCustomer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getCustomer(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentCustomer.id,
      name: currentCustomer.name,
      email: currentCustomer.email,
      phone: currentCustomer.phone,
    };

    customersService
      .update(currentCustomer.id, data)
      .then(response => {
        setCurrentCustomer({ ...currentCustomer, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCustomer = () => {
    customersService
      .update(currentCustomer.id, currentCustomer)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCustomer = () => {
    customersService
      .remove(currentCustomer.id)
      .then(response => {
        console.log(response.data);
        navigate("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCustomer ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentCustomer.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCustomer.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCustomer.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentCustomer.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteCustomer}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCustomer}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Dados incorretos</p>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;

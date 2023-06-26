import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import useRequet from "../../hooks/useRequest";
import Swal from "sweetalert2";

const NewTicket = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const { request } = useRequet({
    method: "post",
    url: "/api/tickets",
    body: {
      title,
      price,
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Ticket Added!",
        icon: "success",
      });
      setPrice(0);
      setTitle("");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    request();
  };

  return (
    <div>
      <Navbar currentUser={currentUser} />
      <div className="w-25rem px-4 mx-auto">
        <Card>
          <h2>Add Ticket</h2>
          <form onSubmit={onSubmit}>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className="p-inputgroup flex-1 py-4">
              <span className="p-inputgroup-addon">$</span>
              <InputNumber
                maxFractionDigits={2}
                value={price}
                onChange={(e) => setPrice(e.value)}
                placeholder="Price"
              />
            </div>

            <Button label="Submit" type="submit" />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewTicket;

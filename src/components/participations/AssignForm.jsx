import React, { useEffect, useState } from "react";
import { Button, Modal, Select } from "antd";
import axios from "axios";
export default function AssignForm(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  let [employee, setEmployee] = useState({
    nom: "",
    prenom: "",
    age: "",
    telephone: "",
    formations: [],
  });
  const showModal = () => {
    setIsModalOpen(true);
    console.log(props);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setEmployee({
      nom: selectedEmployee.nom,
      prenom: selectedEmployee.prenom,
      age: selectedEmployee.age,
      telephone: selectedEmployee.telephone,
      formations: [
        ...(selectedEmployee.formations ? selectedEmployee.formations : ""),
        {
          id: props.formationId,
          title: props.title,
          status: props.status,
        },
      ],
    });
  }, [selectedEmployee ? selectedEmployee : null]);
  const handleOk = () => {
    console.log(employee);
    axios.put(
      "http://localhost:8000/employees/" + selectedEmployee.id,
      employee
    );
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button
        type="primary"
        className="bg-blue-500"
        // onClick={}
        onClick={showModal}
      >
        Assign
      </Button>
      <Modal
        title={props.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okType="default"
      >
        <div>Assign formation to Employee</div>
        <Select
          placeholder="Select a person"
          style={{ width: 200 }}
          onChange={(value) => {
            setSelectedEmployee(props.employees.find((e) => e.id == value));
          }}
          fieldNames={{ label: "nom", value: "id" }}
          options={props.employees ? props.employees : ""}
        ></Select>
      </Modal>
    </div>
  );
}

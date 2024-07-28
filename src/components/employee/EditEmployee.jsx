import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Select, Button } from "antd";

export function EditEmployee() {
  let [employee, setEmployee] = useState([]);
  const { id } = useParams();
  let [nom, setNom] = useState();
  let [prenom, setPrenom] = useState();
  let [age, setAge] = useState();
  let [telephone, setTelephone] = useState();
  let [formations, setFormations] = useState();
  useEffect(() => {
    axios.get("http://localhost:8000/employees/" + id).then((res) => {
      setEmployee(res.data);
      setNom(res.data.nom);
      setPrenom(res.data.prenom);
      setAge(res.data.age);
      setTelephone(res.data.telephone);
      setFormations(res.data.formations ? res.data.formations : []);
    });
    console.log(formations);
  }, []);
  const navigate = useNavigate();
  function confirmEdit(e) {
    e.preventDefault();
    const obj = {
      id: id,
      nom: nom,
      prenom: prenom,
      age: age,
      telephone: telephone,
      formations: formations,
    };
    axios
      .put("http://localhost:8000/employees/" + id, obj)
      .then((res) => {
        console.log("updated successfully");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    navigate(-1);
  }
  function cancelEdit() {
    console.log("canceled");
    navigate(-1);
  }
  return (
    <div className="">
      <form
        className="flex justify-center bg-slate-400 py-4 h-screen"
        onSubmit={(e) => confirmEdit(e)}
      >
        <div className="flex flex-col mt-4 ">
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="id">Id</label>
            <input
              type="text"
              name="id"
              placeholder="id"
              defaultValue={employee.id}
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1  "
              disabled
            />
          </div>
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              defaultValue={employee.nom}
              onChange={(e) => {
                setNom(e.target.value);
              }}
              placeholder="entrer le nom"
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1 "
            />
          </div>
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="prenom">Prenom</label>
            <input
              type="text"
              name="prenom"
              defaultValue={employee.prenom}
              onChange={(e) => {
                setPrenom(e.target.value);
              }}
              placeholder="entrer le prenom"
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1"
            />
          </div>
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              defaultValue={employee.age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              placeholder="entrer l'age"
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1"
            />
          </div>
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="telephone">Telephone</label>
            <input
              type="text"
              name="telephone"
              defaultValue={employee.telephone}
              onChange={(e) => {
                setTelephone(e.target.value);
              }}
              placeholder="entrer le telephone"
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1"
            />
          </div>
          <div className=" my-2 flex justify-end ">
            <Button type="primary" className="bg-blue-500" htmlType="submit">
              Confirm
            </Button>
            <Button className="mx-4" type="default" ghost onClick={cancelEdit}>
              Annuler
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

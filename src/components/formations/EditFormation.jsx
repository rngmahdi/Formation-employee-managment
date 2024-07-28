import axios from "axios";
import React, { useEffect, useState } from "react";
import { DatePicker, Input, Button, Modal, Select, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { setFormations } from "../../redux/actions";

export function EditFormation(props) {
  let [title, setTitle] = useState(props.title);
  let [dateDebut, setDateDebut] = useState(props.startDate);
  let [dateFin, setDateFin] = useState(props.finishDate);
  let [status, setStatus] = useState(props.status);
  let { id } = useParams();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let now = new Date();
  let date_fin = new Date(dateFin);
  let date_debut = new Date(dateDebut);

  const showModal = () => {
    setIsModalOpen(true);
    // console.log(props);
  };

  const handleOk = () => {
    if (status != "Canceled") {
      if (now > date_fin) {
        setStatus("Finished");
      } else if (now < date_fin && now >= date_debut) {
        setStatus("In Progress");
      } else if (now < date_debut) {
        setStatus = "Not Started";
      }
    }
    const obj = {
      title: title,
      start_date: dateDebut,
      finish_date: dateFin,
      status: status,
    };
    axios
      .put("http://localhost:8000/formations/" + props.id, obj)
      .then((res) => {
        // console.log("updated successfully");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://localhost:8000/formations").then((res) => {
      dispatch(setFormations(res.data));
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    // axios.get("http://localhost:8000/formations" + id).then((res) => {
    //   setTitle(res.data.title);
    //   setDateDebut(res.data.start_date);
    //   setDateFin(res.data.finish_date);
    // });
    // console.log(title);
  }, []);
  function confirmAdd(e) {
    // console.log(e)
    e.preventDefault();
    const data = {
      title: title,
      // start_date: dayjs(new Date(dateDebut)),
      // finish_date: dateFin,
    };
    axios.post("http://localhost:8000/formations", data);
    navigate(-1);
  }
  function cancelAdd() {
    navigate(-1);
  }
  return (
    <div>
      <IconEdit showModal={showModal} />
      {/* <Button type="primary" onClick={showModal}>
          Open Modal
        </Button> */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okType="default"
      >
        <Form
          initialValues={{
            title: props.title,
            start_date: dayjs(new Date(props.startDate)),
            finish_date: dayjs(new Date(props.finishDate)),
            status: props.status,
          }}
        >
          <Form.Item name={"title"} label="title">
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item name={"start_date"} label="date debut">
            <DatePicker
              required
              placeholder="entrer la date de debut"
              onChange={(date, dateString) => {
                setDateDebut(dateString);
              }}
            />
          </Form.Item>
          <Form.Item name={"finish_date"} label="date fin">
            <DatePicker
              required
              placeholder="entrer la date de fin"
              onChange={(date, dateString) => {
                setDateFin(dateString);
              }}
            />
          </Form.Item>
          <Form.Item name={"status"} label="status">
            <Select
              style={{ width: 120 }}
              onChange={(value) => {
                setStatus(value);
              }}
              disabled={props.status == "Finished" ? true : false}
              options={[
                { value: "In Progress", label: "In Progress", disabled: true },
                { value: "Finished", label: "Finished", disabled: true },
                { value: "Not Started", label: "Not Started", disabled: true },
                { value: "Canceled", label: "Canceled" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export const IconEdit = (prop) => (
  <span
    onClick={prop.showModal}
    className="font-medium text-blue-500  group cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 hidden group-hover:block"
    >
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 group-hover:hidden"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  </span>
);

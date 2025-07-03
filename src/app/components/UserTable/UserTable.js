"use client";
import { tableHeader } from "@/app/data/helpers";
import React, { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "@/app/store/slice/userslice";
import FormFields from "../FormFields/FormFields";
import "./UserTable.scss";

const UserTable = () => {
  const initialFormState = {
    name: "",
    email: "",
    linkedin: "",
    gender: "",
    address: {
      line1: "",
      line2: "",
      state: "",
      city: "",
      pin: "",
    },
  };
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [formData, setFormData] = useState(initialFormState);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeletedId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleModal = (user) => {
    if (user) {
      setFormData(user);
      setEditIndex(user.id);
    } else {
      setFormData(initialFormState);
      setEditIndex(null);
    }
    setShow(!show);
  };

  const handleDeleteModal = (id) => {
    if (id) {
      setDeletedId(id);
    }
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(deleteId));
    setShowDeleteModal(!showDeleteModal);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (keys.length === 1) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (keys.length === 2) {
      const [parent, child] = keys;
      console.log(keys);
      if (parent === "address" && child === "state") {
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            state: value,
            city: "",
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    const { name, email, linkedin, address } = formData;

    if (!name.trim()) {
      errors.name = "Name is required.";
    } else if (name.length < 3) {
      errors.name = "Name must be at least 3 characters.";
    } else if (name.length > 20) {
      errors.name = "Name must be at most 20 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
    if (!linkedin.trim()) {
      errors.linkedin = "LinkedIn URL is required.";
    } else if (!linkedinRegex.test(linkedin)) {
      errors.linkedin = "Invalid LinkedIn URL.";
    }

    if (!address.line1.trim()) {
      errors.line1 = "Addreess line 1 is required";
    }

    const pinRegex = /^\d{6}$/;
    if (!address.pin.trim()) {
      errors.pin = "PIN code is required.";
    } else if (!pinRegex.test(address.pin)) {
      errors.pin = "Invalid PIN code (must be 6 digits).";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }
    if (editIndex !== null) {
      dispatch(updateUser(formData));
    } else {
      const newUser = { ...formData };
      dispatch(addUser(newUser));
    }

    setShow(false);
    setEditIndex(null);
    setErrorMessage("");

    console.log(formData, "form logged");
  };

  console.log(users, "uses");

  return (
    <section className="container user_table-container">
      <div className="heading-wrap">
        <h1>User Management Dashboard</h1>
        <button className="btn-primary" onClick={() => handleModal()}>
          Add user
        </button>
      </div>

      {users?.length > 0 ? (
        <div className="user-table-info">
          <table>
            <thead>
              <tr>
                {tableHeader?.map((item) => (
                  <td key={item.value}>{item.label}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="linkedin-cell">{user.linkedin}</td>
                  <td>{user.gender}</td>
                  <td className="address-cell">{`${user.address.line1} ${user.address.line2} ${user.address.city} ${user.address.state}`}</td>
                  <td>
                    <button
                      className="btn-voilet"
                      onClick={() => handleModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteModal(user.id)}
                      // onClick={() => dispatch(deleteUser(user.id))}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no_user-container">
          <p>Add user by clicking button on top right</p>
        </div>
      )}

      <FormFields
        show={show}
        handleModal={handleModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        errorMessage={errorMessage}
      />

      <CustomModal
        className="delete_entry_modal"
        show={showDeleteModal}
        onClose={handleDeleteModal}
      >
        <h3>Are you sure you want to delete this user details</h3>
        <div className="yes_no_cta">
          <button
            className="btn-voilet"
            type="button"
            onClick={handleDeleteUser}
          >
            Yes
          </button>
          <button
            className="btn-danger"
            type="button"
            onClick={handleDeleteModal}
          >
            No
          </button>
        </div>
      </CustomModal>
    </section>
  );
};

export default UserTable;

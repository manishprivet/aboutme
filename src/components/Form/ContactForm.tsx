import React, { useState, FormEvent, ChangeEvent } from "react";
import { Axios, db } from "../../firebase/firebaseConfig";
import { firestore } from "firebase";
import styles from "./ContactForm.module.scss";
import Spinner from "../Spinner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await sendEmail();
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setLoading(false);
    setSubmitted(true);
  };
  const sendEmail = async () => {
    try {
      await Axios.post(
        "https://us-central1-portfolio-3af99.cloudfunctions.net/submit",
        formData
      );
      await db.collection("emails").add({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date(),
      } as firestore.DocumentData);
    } catch (err) {
      console.log(err);
    }
  };

  if (submitted)
    return (
      <div className={styles.thankYouContainer}>
        <h1>Thank you for contacting me {`;)`}</h1>
        <h2>Will get back to you soon</h2>
      </div>
    );

  if (loading) return <Spinner />;

  return (
    <div className={styles.formContainer}>
      <h1>Have any queries?</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={updateInput}
          value={formData.name || ""}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={updateInput}
          value={formData.email || ""}
        />
        <textarea
          name='message'
          placeholder='Message'
          onChange={updateInput}
          value={formData.message || ""}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;

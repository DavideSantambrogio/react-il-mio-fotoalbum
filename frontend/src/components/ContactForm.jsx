import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/contacts', {
        email,
        message
      });
      // Se la richiesta ha successo, svuota il form e mostra un toast di successo
      setEmail('');
      setMessage('');
      Toastify({
        text: "Messaggio inviato con successo!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    } catch (error) {
      console.error('Errore nell\'invio del messaggio:', error);
      Toastify({
        text: "Errore nell'invio del messaggio. Per favore riprova.",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
      }).showToast();
    }
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <p>Per qualsiasi domanda, non esitare a contattarci utilizzando il modulo qui accanto.</p>
        </Col>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Messaggio</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary">Invia</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ContactForm;

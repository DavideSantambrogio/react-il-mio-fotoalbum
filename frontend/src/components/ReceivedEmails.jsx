import React, { useState, useEffect } from 'react';
import { Container, Card, CardHeader, CardBody, Button, Collapse } from 'reactstrap';
import axios from 'axios';

const ReceivedEmails = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const [openAccordion, setOpenAccordion] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/contacts');
                setContacts(response.data);
            } catch (error) {
                setError('Failed to fetch contacts.');
            }
        };

        fetchContacts();
    }, []);

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <Container>
            <div style={{ height: '50vh', overflowY: 'auto' }}>
                <h2 className="text-center my-4">Messaggi Ricevuti</h2>
                {error && <p className="text-danger">{error}</p>}
                {contacts.map((contact) => (
                    <Card key={contact.id} className="mb-3">
                        <CardHeader onClick={() => toggleAccordion(contact.id)}>
                            <Button color="link">{contact.email}</Button>
                        </CardHeader>
                        <Collapse isOpen={openAccordion === contact.id}>
                            <CardBody>
                                <p><strong>Email:</strong> {contact.email}</p>
                                <p><strong>Message:</strong> {contact.message}</p>
                                <p><strong>Received At:</strong> {new Date(contact.createdAt).toLocaleString()}</p>
                            </CardBody>
                        </Collapse>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default ReceivedEmails;

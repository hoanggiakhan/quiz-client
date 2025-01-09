import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const EmailSender: React.FC = () => {
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        body: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/email/send', emailData)
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error('There was an error sending the email!', error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Send Email</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                <div className="form-group">
                    <label htmlFor="to">To:</label>
                    <input
                        type="email"
                        id="to"
                        name="to"
                        className="form-control"
                        value={emailData.to}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                        value={emailData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        name="body"
                        className="form-control"
                        rows={5}
                        value={emailData.body}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Send Email</button>
            </form>
        </div>
    );
};

export default EmailSender;

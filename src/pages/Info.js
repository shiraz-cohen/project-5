import React from "react";
import './Info.css'


export default function Info() {
    const user = JSON.parse(localStorage.getItem('user'));
    const { name, username, email, phone, website, address, company } = user;
    return (
        <div className="user-card">
            <div className="user-header">
                <h2>{name}</h2>
                <p><strong>Username:</strong> {username}</p>
            </div>
            <div className="user-body"></div>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Website:</strong> {website}</p>
            <p><strong>Address:</strong> {address.street}, {address.suite}, {address.city} {address.zipcode}</p>
            <p><strong>Company:</strong> {company.name}</p>

        </div>
    );
}






















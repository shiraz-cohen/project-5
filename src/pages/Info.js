import React from "react";
import { UserContext } from "../App";
import { useContext } from "react";

export default function Info  ()  {
    const authorizedUser = useContext(UserContext);
    const { name, username, email, phone, website, address, company } = authorizedUser;
    

    console.log(authorizedUser, "This is the userInfo data");

return(
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






















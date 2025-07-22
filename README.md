# React REST API Project - User Dashboard

Welcome to the repository of the **React REST API Project**, an interactive platform that consumes data from an external API to present user-specific information in a dynamic dashboard.

---

🌟 **Features**

* **User Authentication:**

  * Login form with username and password.
  * Password validation based on the user's geolocation data from the API.
  * Session persistence using Local Storage.

* **Dynamic User Dashboard:**

  * Personalized homepage displaying user information and navigation links.
  * Accessible pages: Info, Todos, Posts, Albums, Logout.

* **Resource Display:**

  * **Info Page:** Displays complete user details.
  * **Todos:** List of user's tasks with completion toggles and sorting.
  * **Posts:** User's posts with nested comments on selection.
  * **Albums:** List of user's albums with nested photos, including a photo slider.

* **Dynamic Routing:**

  * Clean and REST-like URL structures, e.g., `/users/2/albums/5/photos`.

* **Caching & Proxy:**

  * Optimized API consumption with caching strategies.
  

---

🛠️ **Technologies Used**

* React
* React Router
* React Hooks (useState, useEffect)
* React Forms
* JavaScript (ES6+)
* Fetch API with Async-Await
* Local Storage for session persistence
* CSS 

---

📌 **Usage Instructions**
To run the project locally:

1. **Clone the repository:**

```bash
git clone https://github.com/shiraz-cohen/project-5.git
```

2. **Install dependencies:**

```bash
cd project-5
npm install
```

3. **Run the project:**

```bash
npm start
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

---

🔐 **Login Instructions**

* **Username:** Any username from the Users API: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
* **Password:** The **last 4 digits of the `lat` field** from the user's address geo-location.

For example, for user `Bret`:

```json
"geo": {
  "lat": "-37.3159"
}
```

Password will be: **3159**.

---

🔗 **Live Website**
Check out the live project here:

> [**link**](https://shiraz-cohen.github.io/project-5/)

---

✅ **Status**
The project is completed and ready for deployment.

---

Thank you for visiting the React REST API Project repository! 😊

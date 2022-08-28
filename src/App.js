import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const baseURL = "https://bbva20220828000830.azurewebsites.net/api";
  const PIbaseURL = "https://human-detector-test.herokuapp.com/detect";
  const [offices, setOffices] = useState(Array);
  const [office, setOffice] = useState(Object);
  const [CustomersOut, setCustomerOut] = useState(String);

  useEffect(() => {
    fetch(`${baseURL}/Office`)
      .then((response) => response.json())
      .then((data) => setOffices(data));
  }, []);

  const encodeImageFileAsURL = async (element) => {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64String: reader.result }),
      };
      fetch(`${PIbaseURL}`, requestOptions)
        .then((response) => response.json())
        .then((data) => setCustomerOut(data.n_personas));
      console.log(CustomersOut);
    };
    reader.readAsDataURL(file);
    const requestOptionsOffice = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude: office.latitude, longitude: office.longitude, cantidadAfuera: CustomersOut }),
    }

    fetch(`${baseURL}/Office`, requestOptionsOffice)
      .then((response) => response.json())
      .then((data) => setCustomerOut(data.n_personas));
  };
  return (
    <div className="App">
      <header className="App-header">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Selecciona la agencia
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setOffice(e.target.value)}
          >
            {offices.map((office) => (
              <option value={office}>{office.place}</option>
            ))}
          </select>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Agregar
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Atender
          </button>

          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            for="user_avatar"
          >
            Procesamiento de Imagenes
          </label>
          <input
            class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={(e) => encodeImageFileAsURL(e.target)}
          ></input>
          <div
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          ></div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            for="user_avatar"
          >
          </label>
        </div>
      </header>
    </div>
  );
}

export default App;

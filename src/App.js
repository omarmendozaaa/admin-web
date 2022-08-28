import "./App.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';


function App() {
  const baseURL = "https://bbva20220828000830.azurewebsites.net/api";
  const PIbaseURL = "https://human-detector-test.herokuapp.com/detect";
  const [offices, setOffices] = useState([])
  const [idSel, getIdSel] = useState("")

  const now = new Date();


  useEffect(() => {
    fetch(`${baseURL}/Office`).then((response) => response.json()).then((data) => setOffices(data));
  }, []);

  useEffect(() => {
    fetch(`${baseURL}/Ticket`).then((response) => response.json()).then((data) => setOffices(data));
  }, []);

  const postTicks = (element) => {
    axios.post(`${baseURL}/Ticket`, {
      OfficeId: idSel,
      CanalAtencion: Math.floor(Math.random()*2),
      userId:Math.floor(Math.random() * (15 - 27 + 1) + 15),
      state: 1,
      createdTime: now.toISOString(),

    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }  


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
            onChange={(e) =>getIdSel(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {offices.map((office) => (<option value={office.id}>{office.place}</option>))}
          </select>
          <button
            onClick= {postTicks}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
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
          ></input>
          <div
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          ></div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            for="user_avatar"
          >
            prueba
          </label>
        </div>
      </header>
    </div>
  );
}

export default App;

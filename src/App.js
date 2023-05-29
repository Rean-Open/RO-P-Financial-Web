import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layouts/layout';
import { Outlet } from 'react-router-dom'

import { storageKeys } from "./constants/storage";
import * as Storage from "./utils/storage";

let user = Storage.getJson(storageKeys.USER)


function App() {
  return (
    <div>
      <Layout user={user}>
        <Outlet user={user} />
      </Layout>
    </div>
  );
}

export default App;
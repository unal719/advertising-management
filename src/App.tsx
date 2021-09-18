import { observer } from 'mobx-react-lite';
import React from 'react';
import EmployeesList from './components/EmployeesList';

function App() {


  return (
    <div className="main-wrapper">
      <EmployeesList />
    </div>
  );
}

export default observer(App);

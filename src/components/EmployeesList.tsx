import { Button, Table } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useContext } from 'react';
import { Employee, EmployeeFormType } from '../models/EmployeeModel';
import { RooteStoreContext } from '../store/rootStore';
import { getColumnsConfig } from '../utils/EmployeeColumnsConfig';
import EmployeeForm from './EmployeeForm';


const EmployeesList = () => {

  const { employeeStore, officeStore, publisherStore } = useContext(RooteStoreContext);
  const [editedEmployeeData, setEditedEmployeeData] = useState<Employee>();
  const [formType, setFormType] = useState<EmployeeFormType>(EmployeeFormType.None);



  useEffect(() => {
    employeeStore.fetchEmployees();
    officeStore.fetchOffices();
    publisherStore.fetchPublishers();
  })

  const handleDelete = (record: Employee) => {
    employeeStore.deleteEmployeeRecord(record.id)
  }

  const handleEdit = (record: Employee) => {
    setEditedEmployeeData(record);
    setFormType(EmployeeFormType.EditForm);
    employeeStore.setEmployeeFormModalStatus(true);
  }


  const handleAddNewEmployee = () => {
    const newEmployee = {} as Employee;
    setEditedEmployeeData(newEmployee);
    setFormType(EmployeeFormType.NewForm);
    employeeStore.setEmployeeFormModalStatus(true);
  }

  const columns = getColumnsConfig({ handleEdit, handleDelete })

  return (

    <div className="list-container">
      <Button style={{ width: "200px", marginBottom: "4px" }} type="primary" onClick={handleAddNewEmployee}>
        Add Employee
      </Button>
      <Table style={{ width: "100%" }} columns={columns} rowKey="id" dataSource={toJS(employeeStore.employess)}
        pagination={employeeStore.employess.length < 11 ? false : {}} />
      <EmployeeForm employee={editedEmployeeData} formType={formType} />
    </div>
  );

}

export default observer(EmployeesList);
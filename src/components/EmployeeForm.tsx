import Modal from 'antd/lib/modal/Modal';
import { observer } from 'mobx-react-lite';
import { Form, Input, Button, Select } from 'antd';
import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Employee, EmployeeFormModel, EmployeeFormType } from '../models/EmployeeModel';
import { Office } from '../models/OfficeModel';
import { Publisher } from '../models/PublisherModel';
import { RooteStoreContext } from '../store/rootStore';

interface EmployeeFormProps {
  employee?: Employee,
  formType: EmployeeFormType
}



const EmployeeForm: FunctionComponent<EmployeeFormProps> = ({ employee, formType }: EmployeeFormProps) => {
  const { employeeStore, officeStore, publisherStore } = useContext(RooteStoreContext);
  const [form] = Form.useForm()
  useEffect(() => {
    if (EmployeeFormType.None) return
    publisherStore.selectedPublisherId = -1;
    officeStore.selectedOfficeId = -1;
    form.resetFields()
  })

  const onSubmit = (values: EmployeeFormModel) => {

    switch (formType) {
      case EmployeeFormType.NewForm:
        employeeStore.addNewEmployee(values)
        break;
      case EmployeeFormType.EditForm:
        employeeStore.updateEmployee(values)
        break;
      default:
        return;
    }
    employeeStore.setEmployeeFormModalStatus(false)
  };

  const onSubmitError = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal forceRender title={`${formType === EmployeeFormType.NewForm ? "Add New Employee" : "Edit Employee"}`} visible={employeeStore.employeeFormModalStatus} footer={null} closable={false}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={formType === EmployeeFormType.EditForm ? { ...employee, ...{ officeId: employee?.office?.id, publisherId: employee?.publisher?.id } } : undefined}
          onFinish={onSubmit}
          onFinishFailed={onSubmitError}
          autoComplete="off"
        >


          {formType === EmployeeFormType.EditForm && <Form.Item
            label="Id"
            name="id"

          >
            <Input disabled={true} />
          </Form.Item>}

          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
              { max: 20, message: 'First name must be maximum 20 characters.' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
              { max: 20, message: 'Last name must be maximum 20 characters.' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Office"
            name="officeId"
            rules={[
              {
                required: true,
                message: 'Please select office!',
              },
            ]}
            initialValue={formType === EmployeeFormType.NewForm ? officeStore?.offices[0]?.id : undefined}
          >
            <Select>
              {officeStore.offices.map((office: Office) => {
                return <Select.Option key={office.id} value={office.id}> {office.name} </Select.Option>
              })}

            </Select>
          </Form.Item>

          <Form.Item label="Publisher" name="publisherId">
            <Select >
              <Select.Option key="-1" value="undefined" > &nbsp; </Select.Option>
              {publisherStore.publishers.map((publisher: Publisher, index: number) => {
                return <Select.Option key={publisher.id} value={publisher.id}> {publisher.name} </Select.Option>
              })}
            </Select>
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Button style={{ marginRight: "8px" }} type="primary" htmlType="submit">
              {formType === EmployeeFormType.NewForm ? "Save" : "Update"}
            </Button>

            <Button htmlType="button" onClick={() => employeeStore.setEmployeeFormModalStatus(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div >
  );
}

export default observer(EmployeeForm);
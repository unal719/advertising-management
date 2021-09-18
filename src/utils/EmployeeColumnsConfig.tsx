import { Button } from "antd";


type ColumnConfigType = {
  handleEdit: Function,
  handleDelete: Function
}

export const getColumnsConfig = ({
  handleEdit,
  handleDelete
}: ColumnConfigType) => {


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a: any, b: any) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a: any, b: any) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: 'Office',
      key: 'office',
      dataIndex: 'office',
      render: (office: any) => office.name,
      sorter: (a: any, b: any) => a.office?.name.localeCompare(b.office?.name)

    },
    {
      title: 'Publisher',
      key: 'publisher',
      dataIndex: 'publisher',
      render: (publisher: any) => publisher?.name
    },
    {
      title: 'Edit',
      dataIndex: '',
      key: 'x',
      render: (record: any) => {
        return (
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        )
      },
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      render: (record: any) => {
        return (
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        )
      },
    },
  ];

  return columns

}
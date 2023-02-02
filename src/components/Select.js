import React from 'react'
import Select from 'react-select'

const options = [
    {
        "_id": "63d958594d35127273abf5db",
        "name": "Teste2",
        "cpf": "133333",
        "createdAt": "2023-01-31T18:05:13.853Z",
        "updatedAt": "2023-01-31T18:05:13.853Z",
        "__v": 0
      },  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MyComponent = () => (
  <Select options={options} />
)

export default MyComponent;
// import React, { useState } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
// import axios from 'axios';

// const addUser = async (user) => {
//   const { data } = await axios.post('https://jsonplaceholder.typicode.com/users', user);
//   return data;
// };

// const AddUser= () => {
//   const [name, setName] = useState('');
//   const queryClient = useQueryClient();
//   const mutation = useMutation(addUser, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('users');
//     }
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate({ name });
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         value={name} 
//         onChange={(e) => setName(e.target.value)} 
//         placeholder="Enter user name"
//       />
//       <button type="submit">Add User</button>
//     </form>
//   );
// };

// export default AddUser;


import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const addUser = async (user) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/users', user);
  return data;
};

const AddUser = () => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const mutation = useMutation(addUser, {
    onSuccess: (newUser) => {
      // Manually update the cache
      queryClient.setQueryData('users', (oldData) => {
        return [...oldData, newUser];
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter user name"
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;

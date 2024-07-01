import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const fetchUserDetails = async (userId) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return data;
};

const updateUser = async (user) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
  return data;
};

const deleteUser = async (userId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
};

const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: user, error, isLoading } = useQuery(['user', userId], () => fetchUserDetails(userId));
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId]);
      queryClient.invalidateQueries('users'); // Invalidate the users list 
    }
  });
  const mutationDelete = useMutation(() => deleteUser(userId), {
    onSuccess: () => {
      queryClient.invalidateQueries('users'); // Invalidate the users list
      navigate('/'); // Navigate back to the users list
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleUpdate = (e) => {
    e.preventDefault();
    mutationUpdate.mutate({ id: user.id, name });
  };

  const handleDelete = () => {
    mutationDelete.mutate();
  };

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>

      <form onSubmit={handleUpdate}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter new name"
        />
        <button type="submit">Update User</button>
      </form>
      
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default UserDetailsPage;

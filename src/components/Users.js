import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const fetchUsers = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

const UserList = () => {
  const { data: users, error, isLoading } = useQuery({
    queryKey: 'users',
    queryFn: fetchUsers
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - <Link to={`/user/${user.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

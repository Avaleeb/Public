import React, { createContext, useState } from 'react';

export const Context = createContext({});

// TODO FIX THIS TO SHOW DETIALS WHENEVER YOU CLICK
export const Provider = () => {
  // Use State to keep the values
  const [detailsOpen, setDetailsOpen] = useState(initialUsers);
  const [details, setSelectedUser] = useState(initialSelectedUsers);

  const addNewUser = (userName) => {
    const newUser = { id: new Date().getTime().toString(), name: userName };
    setUsers(users.concat([newUser]));
  };

  // Make the context object:
  const usersContext = {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    addNewUser,
  };

  // pass the value in provider and return
  return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  users: PropTypes.array,
  selectedUser: PropTypes.object,
};

Provider.defaultProps = {
  users: [],
  selectedUser: {},
};

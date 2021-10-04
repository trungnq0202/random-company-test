export const findUpdatedUser = (oldUsers, newUsers) => {
  let updatedUsers = [];

  for (let i = 0; i < newUsers.length; ++i) {
    const oldUser = oldUsers[i];
    const newUser = newUsers[i];
    if (
      newUser.username !== oldUser.username ||
      newUser.email !== oldUser.email ||
      newUser.birthdate !== oldUser.birthdate
    )
      updatedUsers.push(newUser);
  }

  return updatedUsers;
};

export const combineOldAndUpdatedUsers = (oldUsers, newUsers) => {
  let finalUsers = [...oldUsers];
  for (let i = 0; i < oldUsers.length; ++i) {
    for (let j = 0; j < newUsers.length; ++j) {
      const oldUser = oldUsers[i];
      const newUser = newUsers[j];
      if (oldUser._id !== newUser._id) continue;
      if (
        newUser.username !== oldUser.username ||
        newUser.email !== oldUser.email ||
        newUser.birthdate !== oldUser.birthdate
      )
        finalUsers[i] = newUsers[j];
      break;
    }
  }

  console.log("concac");
  console.log(oldUsers);
  console.log("cailoz");
  console.log(newUsers);
  console.log("baby");
  console.log(finalUsers);

  return finalUsers;
};

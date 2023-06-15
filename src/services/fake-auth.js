import fakeUsers from 'assets/data/fake-users.json';
import _ from 'lodash';

export async function fakeLoginEndpoint({ email, phone, password }) {
  const username = email ?? phone;

  console.log(username);

  if (!(username && password)) {
    throw new Error('Missing credentials');
  }

  const foundUser = _.find(
    fakeUsers,
    (user) =>
      (user.email === username || user.phone === username) &&
      user.password === password
  );

  console.log(foundUser);

  if (foundUser) {
    return {
      accessToken: 'fake-token',
      user: foundUser,
      roles: ['user'],
    };
  } else {
    throw new Error('User not found');
  }
}

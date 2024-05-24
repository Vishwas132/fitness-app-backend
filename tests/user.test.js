const userService = require('../services/user');

describe('Register Service', () => {
  it('should create a new user', async () => {
    const result = await userService.register({
      email: 'test@example.com',
      password: 'testPassword',
      firstName: 'testFirstName',
      lastName: 'testLastName'
    });
    expect(result.email).toEqual('test@example.com');
    expect(result.password).not.toBeNull();
    expect(result.firstName).toEqual('testFirstName');
    expect(result.lastName).toEqual('testLastName');
  });
}, 10000);

// TODO : Add more test cases



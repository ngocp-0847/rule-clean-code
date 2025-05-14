// Example test file following best practices

import { UserService, fetchData } from '../src/good-practices';

describe('UserService', () => {
  // C069 - Test name reflects the condition being tested
  it('should return null when finding user with non-positive ID', () => {
    // Arrange
    const service = new UserService();
    
    // Act
    const result = service.findUser(-1);
    
    // Assert - C076 one assertion per test
    expect(result).toBeNull();
  });

  // C069 - Test name reflects the condition being tested
  it('should throw error when validating user without name', () => {
    // Arrange
    const service = new UserService();
    const invalidUser = { id: 1, name: '', age: 30 };
    
    // Act & Assert - C076 one behavior
    expect(() => service.validateUser(invalidUser)).toThrow('User name is required');
  });
});

// C075 - Test class name reflects module being tested
describe('fetchData', () => {
  // C069 - Test name reflects what's being tested
  it('should return a string value', () => {
    // Arrange & Act
    const result = fetchData();
    
    // Assert - C076 one assertion
    expect(typeof result).toBe('string');
  });
});
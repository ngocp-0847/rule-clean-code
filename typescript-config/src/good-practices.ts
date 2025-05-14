// Example file with good practices following ESLint rules

// Clear variable names (C003)
const userName = "John";

// Boolean variable with proper prefix (C044)
const isActive = true;

// Properly named function (C006)
function fetchData(): string {
  return "some data";
}

// Interface with I prefix (T002)
interface IUserData {
  id: number;
  name: string;
  age: number;
}

// Proper class structure
class UserService {
  private users: IUserData[] = [];

  // No logic in constructor, just initialization (C017)
  constructor() {
    // Empty constructor or just simple initialization
  }

  // Initialize as a separate method (C017 solution)
  public initialize(): void {
    this.fetchInitialUsers();
  }

  private fetchInitialUsers(): void {
    // API call logic moved outside of constructor
    try {
      console.log("Fetching users properly...");
    } catch (error) {
      // Properly log errors (C028, C065)
      console.error("Failed to fetch users", error);
    }
  }

  // Using guard clauses instead of nested ifs (C027)
  findUser(id: number): IUserData | null {
    if (id <= 0) {
      return null;
    }
    
    if (this.users.length === 0) {
      return null;
    }
    
    return this.users.find(user => user.id === id) || null;
  }

  // No redundant comment (C013)
  addUser(user: IUserData): void {
    this.users.push(user);
  }

  // Specific error message (C018)
  validateUser(user: IUserData): boolean {
    if (!user.name) {
      throw new Error("User name is required");
    }
    return true;
  }

  // Proper error handling in catch (C028, C065)
  removeUser(id: number): void {
    try {
      const index = this.users.findIndex(user => user.id === id);
      if (index === -1) {
        throw new Error(`User with ID ${id} not found`);
      }
      this.users.splice(index, 1);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  }
}

// Proper error handling with logging (C065)
function safeProcessData(data: string): object | null {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to parse JSON data:", error);
    return null;
  }
}

// Simple types instead of nested unions (T010)
type SimpleStringOrNumber = string | number;
type SimpleObjectArray = object[];

export { UserService, safeProcessData, fetchData };
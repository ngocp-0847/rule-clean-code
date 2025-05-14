// Example file with multiple ESLint rule violations

// C003 - Unclear variable name with arbitrary abbreviation
let usr = "John";

// C044 - Boolean variable not starting with is/has/should
let active = true;

// C001 - Function longer than 50 lines (stub)
function veryLongFunctionadsdsdsds(): void {
  // Function body would be long...
  console.log("This would be a very long function");
}

// C077 - Constructor with complex logic
class UserManager {
  private users: any[] = [];

  // C017 - Logic in constructor
  constructor() {
    console.log("Initializing UserManager");
    // Complex initialization logic would go here
    this.fetchInitialUsers();
  }

  // T007 - Function in constructor (conceptually)
  private fetchInitialUsers(): void {
    // API call or other complex logic
    console.log("Fetching users...");
  }

  // C027 - Nested if instead of guard clause
  findUser(id: number): any {
    if (id > 0) {
      if (this.users.length > 0) {
        if (this.users.some(u => u.id === id)) {
          return this.users.find(u => u.id === id);
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  // C013 - Comment describing what code does
  // Add a user to the list
  addUser(user: any): void {
    this.users.push(user);
  }

  // C018 - Generic error without specific message
  validateUser(user: any): boolean {
    if (!user.name) {
      throw new Error();
    }
    return true;
  }

  // C028 - Empty catch block
  removeUser(id: number): void {
    try {
      const index = this.users.findIndex(u => u.id === id);
      this.users.splice(index, 1);
    } catch (error) {
      // Empty catch - not handling or logging error
    }
  }
}

// T002 - Interface without I prefix
interface UserData {
  id: number;
  name: string;
  age: number;
}

// C065 - Catch without proper error handling
function processData(data: string): void {
  try {
    const parsed = JSON.parse(data);
    console.log(parsed);
  } catch (error) {
    // Not logging or rethrowing, just suppressing
    return;
  }
}

// C006 - Function name not a verb/verb-noun
function data(): string {
  return "some data";
}

// T010 - Nested union type
type ComplexType = string | number | (boolean | object)[];

export { UserManager, processData, data, veryLongFunctionadsdsdsds };
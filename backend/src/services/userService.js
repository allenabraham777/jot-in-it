import { UserRepository } from "repository";
import { formatData, throwError, generateToken } from "utils";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser({ name, email, password, pic }) {
    try {
      const userExists = await this.repository.findUserByEmail(email);
      if (userExists) {
        throwError(null, "User already exists", 400);
      }
      const user = await this.repository.createUser(name, email, password, pic);
      if (!user) throwError(null, "User not created!", 500);
      const { email: _email, name: _name, _id, pic } = user;
      const token = generateToken(_id);
      return formatData({ email: _email, name: _name, _id, pic, token });
    } catch (error) {
      throw error;
    }
  }

  async loginUser({ email, password }) {
    try {
      const user = await this.repository.findUserByEmail(email);
      if (!user || !(await user.matchPassword(password))) {
        throwError(null, "Please check your email and password", 403);
      }
      const { email: _email, name: _name, _id, pic } = user;
      const token = generateToken(_id);
      return formatData({ email: _email, name: _name, _id, pic, token });
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(keyword, _id) {
    try {
      const users = await this.repository.findUserWithKeyword(keyword, _id);
      return formatData(users);
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;

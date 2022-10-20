import { User } from "../models";

class UserRepository {
  constructor() {
    this.model = User;
  }

  findUserByEmail(email) {
    return this.model.findOne({ email }).select("-__v -createdAt -updatedAt");
  }

  createUser(name, email, password, pic) {
    return this.model.create({ name, email, password, pic });
  }
}

export default UserRepository;

import { User } from "models";

class UserRepository {
  constructor() {
    this.model = User;
  }

  findUserByEmail(email) {
    return this.model.findOne({ email }).select("-__v -createdAt -updatedAt");
  }

  createUser(name, email, password, pic) {
    const payload = { name, email, password };

    if (pic) {
      payload.pic = pic;
    }

    return this.model.create(payload);
  }

  findUserWithKeyword(keyword = null, exclude = null) {
    const query = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};
    const excludeQuery = exclude ? { _id: { $ne: exclude } } : {};
    return this.model
      .find(query)
      .find(excludeQuery)
      .select("-password -createdAt -updatedAt -__v");
  }
}

export default UserRepository;

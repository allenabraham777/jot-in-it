import { throwError } from "utils";

const formatData = (data, message = "Data Not found!") => {
  if (data) {
    return { data };
  } else {
    throwError(null, message, 500);
  }
};

export default formatData;

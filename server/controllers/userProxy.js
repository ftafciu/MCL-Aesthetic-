const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  passwordVerifier,
  passwordHasher,
} = require("../utils/security-ground");

const token_issue = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, name: user.name, surname: user.surname },
    process.env.JWT_KEY,
    { expiresIn: 900 }
  );
  const refreshToken = jwt.sign(
    { id: user._id, name: user.name, surname: user.surname },
    process.env.JWT_KEY,
    { expiresIn: "3h" }
  );
  return { accessToken: accessToken, refreshToken: refreshToken };
};

const tokenChecker = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return { result: true, payload: decoded };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { result: false, code: 2 };
    } else {
      return { result: false, code: 3 };
    }
  }
};

const tokenRefresher = (refreshToken) => {
  console.log("Refreshing token");
  const checkToken = tokenChecker(refreshToken);
  if (checkToken.result) {
    return {
      result: true,
      content: jwt.sign(
        {
          id: checkToken.payload.id,
          name: checkToken.payload.name,
          surname: checkToken.payload.surname,
        },
        process.env.JWT_KEY,
        {
          expiresIn: 900,
        }
      ),
    };
  } else if (checkToken.code === 2) {
    return { result: false, content: "Token expired" };
  } else {
    return { result: false, content: "Token is invalid" };
  }
};

const retrieve_id = (req) => {
  const access_token = req.cookies.tokenCookie.accessToken;
  const decoded = jwt.verify(access_token, process.env.JWT_KEY);
  return decoded.id;
};

const authorize = (req, res, action) => {
  const tokens = req.cookies ? req.cookies.tokenCookie : undefined;
  if (tokens) {
    const checkAccess = tokenChecker(tokens.accessToken);
    if (checkAccess.result) {
      action();
    } else {
      const refreshAccess = tokenRefresher(tokens.refreshToken);
      if (refreshAccess.result) {
        res.cookie(
          "tokenCookie",
          {
            accessToken: refreshAccess.content,
            refreshToken: tokens.refreshToken,
          },
          {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
          }
        );
        action();
      } else {
        res.status(401).json(refreshAccess.content);
      }
    }
  } else {
    res.status(401).json("No token presented");
  }
};

async function createUser(req, res) {
  try {
    const { gmail, password, role, name, surname, phone } = req.body;
    const exists = await User.find({ gmail: gmail });
    if (exists.length) {
      throw new Error("This user already exist!");
    }
    const newUser = new User({
      gmail: gmail,
      password: password,
      role: role,
      name: name,
      phone: phone,
      surname: surname,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const verify_credentials = async (gmail, password) => {
  const user = await User.findOne({ gmail: gmail });
  if (user) {
    if (passwordVerifier(user.password, password))
      return { code: 1, user: user };
    else return { code: 3, user: {} };
  } else {
    return { code: 2, user: {} };
  }
};

const login_process = async (gmail, password) => {
  const result = await verify_credentials(gmail, password);
  if (result.code === 1) {
    if (result.user.role !== "client")
      return { message: "Unauthorized", token_obj: {} };
    const token_obj = token_issue(result.user);
    return { message: "Successs", token_obj: token_obj };
  } else if (result.code === 2) {
    return { message: "User does not exist!", token_obj: {} };
  } else if (result.code === 3) {
    return { message: "Invalid password!", token_obj: {} };
  }
};

const login_admin = async (gmail, password) => {
  const result = await verify_credentials(gmail, password);
  if (result.code === 1) {
    if (result.user.role !== "admin")
      return { message: "Not admin!", token_obj: {} };
    const token_obj = token_issue(result.user);
    return { message: "Successs", token_obj: token_obj };
  } else if (result.code === 2) {
    return { message: "User does not exist!", token_obj: {} };
  } else if (result.code === 3) {
    return { message: "Invalid password!", token_obj: {} };
  }
};

async function getUserByUsername(gmail) {
  const user = await User.find({ gmail: gmail });
  return user;
}

async function logOut(res) {
  res.cookie("tokenCookie", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json("Logging out");
}

async function deleteUser(userId) {
  const user = await User.findById(userId);
  await User.deleteOne();
}

async function editUser(userId, newInfo) {
  const response = { result: true, message: "Edited successfully!" };
  try {
    await User.findOneAndUpdate({ _id: userId }, { ...newInfo });
  } catch (err) {
    response.result = false;
    response.message = "Unable to edit due to an error!";
  }
  return response;
}

async function changePassword(userId, newPassword, oldPassword) {
  const user = await User.findById(userId);
  const response = { result: true, message: "Edited successfully!" };
  if (user) {
    if (passwordVerifier(user.password, oldPassword)) {
      if (newPassword !== oldPassword) {
        try {
          await User.findOneAndUpdate(
            { _id: userId },
            { password: passwordHasher(newPassword) }
          );
        } catch (err) {
          response["result"] = false;
          response["message"] = "Unable to update due to an error!";
        }
      } else {
        response["result"] = false;
        response["message"] = "New password same with old password";
      }
    } else {
      response["result"] = false;
      response["message"] = "Wrong password entered";
    }
  } else {
    response["result"] = false;
    response["message"] = "User does not exist!";
  }
  return response;
}

const serveMyInfo = async (req, res) => {
  try {
    const user = await User.findById(retrieve_id(req));
    if (!user) throw new Error("User does not exist!");
    res.status(200).json({
      gmail: user.gmail,
      name: user.name,
      surname: user.surname,
      role: user.role,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const excludedId = retrieve_id(req);
    const users = await User.find({ _id: { $ne: excludedId } })
      .select("_id name surname username status")
      .exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  logOut,
  deleteUser,
  editUser,
  changePassword,
  createUser,
  verify_credentials,
  getUserByUsername,
  login_process,
  authorize,
  serveMyInfo,
  retrieve_id,
  getUsers,
  login_admin,
};

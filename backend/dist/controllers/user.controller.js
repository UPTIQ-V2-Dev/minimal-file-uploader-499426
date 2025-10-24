import { userService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import catchAsyncWithAuth from "../utils/catchAsyncWithAuth.js";
import pick from "../utils/pick.js";
import httpStatus from 'http-status';
const createUser = catchAsyncWithAuth(async (req, res) => {
    const { email, password, name, role } = req.body;
    const user = await userService.createUser(email, password, name, role);
    res.status(httpStatus.CREATED).send(user);
});
const getUsers = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['name', 'role']);
    const options = pick(req.validatedQuery, ['sortBy', 'sortType', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});
const getUser = catchAsyncWithAuth(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await userService.getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});
const updateUser = catchAsyncWithAuth(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await userService.updateUserById(userId, req.body);
    res.send(user);
});
const deleteUser = catchAsyncWithAuth(async (req, res) => {
    const userId = parseInt(req.params.userId);
    await userService.deleteUserById(userId);
    res.status(httpStatus.NO_CONTENT).send();
});
export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};

import { Role } from '../generated/prisma/index.js';
const allRoles = {
    [Role.USER]: ['uploadFiles', 'getMCP', 'manageMCP'],
    [Role.ADMIN]: ['getUsers', 'manageUsers', 'uploadFiles', 'manageUploads', 'getMCP', 'manageMCP']
};
export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));

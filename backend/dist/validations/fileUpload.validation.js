import { FileUploadStatus } from '../generated/prisma/index.js';
import Joi from 'joi';
const initiateUpload = {
    body: Joi.object().keys({
        fileName: Joi.string().required().min(1).max(255),
        fileType: Joi.string()
            .required()
            .valid('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain', 'text/csv'),
        fileSize: Joi.number().integer().min(1).max(10485760) // 10MB max
    })
};
const completeUpload = {
    body: Joi.object().keys({
        uploadId: Joi.string().required().uuid()
    })
};
const getUpload = {
    params: Joi.object().keys({
        uploadId: Joi.string().required().uuid()
    })
};
const queryUploads = {
    query: Joi.object().keys({
        status: Joi.string().valid(...Object.values(FileUploadStatus)),
        fileName: Joi.string(),
        fileType: Joi.string(),
        sortBy: Joi.string().valid('createdAt', 'updatedAt', 'fileName', 'fileSize', 'status'),
        sortType: Joi.string().valid('asc', 'desc'),
        limit: Joi.number().integer().min(1).max(100),
        page: Joi.number().integer().min(1)
    })
};
const deleteUpload = {
    params: Joi.object().keys({
        uploadId: Joi.string().required().uuid()
    })
};
export default {
    initiateUpload,
    completeUpload,
    getUpload,
    queryUploads,
    deleteUpload
};

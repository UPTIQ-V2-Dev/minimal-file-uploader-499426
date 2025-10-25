import { FileUploadStatus } from '../generated/prisma/index.js';
import Joi from 'joi';

const initiateUpload = {
    body: Joi.object().keys({
        fileName: Joi.string().required().min(1).max(255),
        fileType: Joi.string()
            .required()
            .valid('image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'),
        fileSize: Joi.number().integer().min(1).max(5242880) // 5MB max
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
        sortBy: Joi.string().valid('createdAt', 'fileName'),
        limit: Joi.number().integer().min(1).max(50),
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

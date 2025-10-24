import { fileUploadService } from '../services/index.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const initiateUpload = catchAsyncWithAuth(async (req, res) => {
    const { fileName, fileType, fileSize } = req.body;
    const userId = req.user.id;

    const result = await fileUploadService.initiateUpload(fileName, fileType, fileSize, userId);
    res.status(httpStatus.OK).send(result);
});

const completeUpload = catchAsyncWithAuth(async (req, res) => {
    const { uploadId } = req.body;
    const userId = req.user.id;

    const result = await fileUploadService.completeUpload(uploadId, userId);
    res.status(httpStatus.OK).send(result);
});

const getUpload = catchAsyncWithAuth(async (req, res) => {
    const { uploadId } = req.params;
    const userId = req.user.id;

    const upload = await fileUploadService.getUploadById(uploadId, userId);
    if (!upload) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Upload not found' });
    }

    res.status(httpStatus.OK).send(upload);
});

const getUploads = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['status', 'fileName', 'fileType']);
    const options = pick(req.validatedQuery, ['sortBy', 'sortType', 'limit', 'page']);
    const userId = req.user.id;

    const result = await fileUploadService.queryUploads(filter, options, userId);
    res.status(httpStatus.OK).send(result);
});

const deleteUpload = catchAsyncWithAuth(async (req, res) => {
    const { uploadId } = req.params;
    const userId = req.user.id;

    await fileUploadService.deleteUpload(uploadId, userId);
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    initiateUpload,
    completeUpload,
    getUpload,
    getUploads,
    deleteUpload
};

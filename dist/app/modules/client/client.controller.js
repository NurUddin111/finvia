"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const httpStatusCodes_1 = require("../../utils/httpStatusCodes");
const client_service_1 = require("./client.service");
const pickQuery_1 = require("../../utils/pickQuery");
const constants_1 = require("../../interfaces/constants");
const addClient = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const payload = req.body;
    const business = await client_service_1.ClientServices.addClient(userId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.CREATED,
        message: "Client added successfully",
        data: business,
    });
});
const getAllClients = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = req.user;
    const userId = user.userId;
    const query = (0, pickQuery_1.pickQuery)(req.query, constants_1.QueryFields);
    const clients = await client_service_1.ClientServices.getAllClients(userId, query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "All Clients details retrieved successfully",
        data: clients,
    });
});
const getSingleClient = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const id = req.params.id;
    const business = await client_service_1.ClientServices.getSingleClient(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Client details retrieved successfully",
        data: business,
    });
});
const getMyClient = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const clientId = req.params.id;
    const result = await client_service_1.ClientServices.getMyClient(userId, clientId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Your Client Details Retrieved Successfully",
        data: result.data,
    });
});
const getClietnsStats = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const result = await client_service_1.ClientServices.getClientsStats(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Your Clients Stats Retrieved Successfully",
        data: result,
    });
});
const updateClient = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const clientId = req.params.id;
    const payload = req.body;
    const verifiedToken = req.user;
    const client = await client_service_1.ClientServices.updateClient(clientId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Client details updated successfully",
        data: client,
    });
});
const updateClientStatus = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const userId = decodedToken.userId;
    const client = await client_service_1.ClientServices.updateClientStatus(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Client status updated successfully",
        data: client,
    });
});
const deleteClient = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const decodedToken = req.user;
    const clientId = req.params.id;
    await client_service_1.ClientServices.deleteClient(clientId, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: httpStatusCodes_1.HttpStatusCodes.OK,
        message: "Client deleted successfully",
        data: null,
    });
});
exports.ClientController = {
    addClient,
    getAllClients,
    getSingleClient,
    getMyClient,
    getClietnsStats,
    updateClient,
    updateClientStatus,
    deleteClient,
};

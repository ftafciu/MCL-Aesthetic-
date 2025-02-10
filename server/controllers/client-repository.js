const Client = require("../models/client");
const { differenceInYears } = require("date-fns");

function calculateAge(birthDate) {
  if (birthDate) return differenceInYears(new Date(), new Date(birthDate));
  return 0;
}

const createClient = async (clientInfo) => {
  try {
    const possibleExisting = await Client.find({
      phoneNumber: clientInfo.phoneNumber,
    });
    if (possibleExisting.length) {
      throw new Error("A client with this phone number already exists!");
    }
    const newClient = new Client({
      ...clientInfo,
      age: calculateAge(clientInfo.birthday),
    });
    await newClient.save();
    return { result: true, message: "New client created successfully!" };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

const editClient = async (clientId, newClientInfo) => {
  try {
    if (newClientInfo.phoneNumber) {
      const possibleExisting = await Client.find({
        phoneNumber: newClientInfo.phoneNumber,
      });
      if (
        possibleExisting.length &&
        possibleExisting[0]._id.toString() !== clientId
      ) {
        throw new Error("A client with this phone number already exists!");
      }
    }
    const editedClient = await Client.findByIdAndUpdate(clientId, {
      ...newClientInfo,
      age: calculateAge(newClientInfo.birthday),
    });
    if (!editedClient) {
      throw new Error("The user does not exist!");
    }
    return { result: true, message: "The client was edited successfully!" };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

const getClients = async () => {
  try {
    const clients = await Client.find({});
    return { result: true, clients: clients };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

const filterClients = async (filter) => {
  try {
    const clients = await Client.find({ ...filter });
    return { result: true, clients: clients };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

const deleteClient = async (clientId) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(clientId);
    if (!deletedClient) {
      throw new Error("The client does not exist!");
    }
    return { result: true, message: "Client was deleted successfully!" };
  } catch (error) {
    return { result: false, message: error.message };
  }
};

module.exports = {
  createClient,
  editClient,
  getClients,
  filterClients,
  deleteClient,
};

// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

interface Connection {
  //   clientPromise: MongoClient;
  isConnected: mongoose.ConnectionStates;
}

let connection: Connection = {
  //   clientPromise: mongoose.connection?.getClient(),
  isConnected: mongoose.ConnectionStates?.disconnected,
};

export const connectToDb = async (): Promise<void> => {
  try {
    if (connection.isConnected === mongoose.ConnectionStates.connected) {
      console.log("Using existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI!);

    connection = {
      //   clientPromise: db.connection.getClient(),
      isConnected: db.connections[0].readyState,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

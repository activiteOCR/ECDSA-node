# Key pair and address to use to test this repo without any modification.
private key: 145167f84ba42acd8877eac8bddc8075fc1e95f5003c5eaf671fb6117d2eb4ec
public key: 026fa12536061012d3347bd7b8a06aa012527671c44a48f66e782f2b561ee8ecc3 
address: 1ba78a7c37f945c31aa5e11d9edb27ce931d5e33

private key: 23f479fdd56a046ec6049af9c919387c450729c6dae4a17f7df7de57e6895d5b
public key: 03233771e00be8c775d8161d45a9bc3edee717cddf13e710d3ee95e9ab419757b5
address: 8646863f9362148049bfa34cfe309a9bc87e9dbe

private key: 24b0715560a432592b6f735f2d9489aab67898034ed1b8c9400a68d7e20d93db
public key: 02a8a97561747196b69ea4b75468fd43e005feafb4996449eeb3e8fcdd9b492c84
address: a4f5e60367e9cb6389dc64de470cf1c08049eff5

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

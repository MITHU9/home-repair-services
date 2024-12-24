require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://home-repair-service-by-mithu9.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9oblt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //await client.connect();

    // Create a new database and collection
    const serviceCollection = client
      .db("homeRepairStore")
      .collection("services");

    const bookedServiceCollection = client
      .db("homeRepairStore")
      .collection("bookedServices");

    //auth related APIs
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({
          success: true,
        });
    });

    //verify token
    const verifyToken = (req, res, next) => {
      const token = req.cookies?.token;
      if (!token) {
        return res
          .status(401)
          .send({ message: "Access Denied! unauthorized user" });
      }
      try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
      } catch (error) {
        res.status(400).send({ message: "Invalid Token" });
      }
    };

    //clear cookie on logout
    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    //Service related APIs

    // Get all services
    app.get("/all-services", async (req, res) => {
      //console.log(req.query);
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;
      const cursor = serviceCollection
        .find({})
        .skip((page - 1) * limit)
        .limit(limit);
      const services = await cursor.toArray();
      res.send(services);
    });

    //get product count for pagination
    app.get("/service-count", async (req, res) => {
      const count = await serviceCollection.estimatedDocumentCount();
      res.send({ count });
    });

    //get popular services
    app.get("/popular-services", async (req, res) => {
      const cursor = serviceCollection.find({}).limit(6);
      const services = await cursor.toArray();
      res.send(services);
    });

    // get services of a specific user by email
    app.get("/my-services", verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { providerEmail: email };

      if (req.user.email !== email) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();

      res.send(services);
    });

    // Get a single service
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    // Add a new service
    app.post("/add-service", async (req, res) => {
      const service = req.body;
      const result = await serviceCollection.insertOne(service);
      res.send(result);
    });

    // Update a service
    app.put("/update-service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedService = req.body;
      const options = { upsert: true };

      const updatedDoc = {
        $set: {
          imageUrl: updatedService.imageUrl,
          serviceName: updatedService.serviceName,
          price: updatedService.price,
          serviceArea: updatedService.serviceArea,
          description: updatedService.description,
        },
      };

      const result = await serviceCollection.updateOne(
        query,
        updatedDoc,
        options
      );

      res.send(result);
    });

    // Delete a service
    app.delete("/delete-service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);

      res.send(result);
    });

    // create booked services
    app.post("/book-service", async (req, res) => {
      const service = req.body;
      const result = await bookedServiceCollection.insertOne(service);
      res.send(result);
    });

    // get booked services by email
    app.get("/booked-services", verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email };
      if (req.user.email !== email) {
        return res.status(403).send({ message: "Forbidden access" });
      }
      const cursor = bookedServiceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    // get services by search query with service name
    app.get("/search-services/:query", async (req, res) => {
      const query = req.params.query;
      const cursor = serviceCollection.find({
        serviceName: { $regex: query, $options: "i" },
      });
      const services = await cursor.toArray();
      res.send(services);
    });

    // get services by email from booked services
    app.get("/service-to-do", verifyToken, async (req, res) => {
      const email = req.query.email;
      const query = { providerEmail: email };

      if (req.user.email !== email) {
        return res.status(403).send({ message: "Forbidden access" });
      }

      const cursor = bookedServiceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    // update service status
    app.patch("/update-status/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const { updatedStatus } = req.body;

      const updatedDoc = {
        $set: {
          serviceStatus: updatedStatus,
        },
      };

      const result = await bookedServiceCollection.updateOne(query, updatedDoc);

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

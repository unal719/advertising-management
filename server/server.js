const express = require("express");
const fs = require('fs')
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const port = 5000;

let employees = [
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "office": {
      "id": 3,
      "name": "Vienna"
    },
    "publisher": null
  },
  {
    "id": 2,
    "first_name": "Max",
    "last_name": "Mustermann",
    "office": {
      "id": 4,
      "name": "Warsaw"
    },
    "publisher": null
  },
  {
    "id": 3,
    "first_name": "Jane",
    "last_name": "Doe",
    "office": {
      "id": 5,
      "name": "Madrid"
    },
    "publisher": {
      "id": 4,
      "name": "ES Publisher"
    }
  },
  {
    "id": 4,
    "first_name": "Erika",
    "last_name": "Mustermann",
    "office": {
      "id": 3,
      "name": "Vienna"
    },
    "publisher": {
      "id": 4,
      "name": "AT Publisher"
    }
  }
]

let publishers = [
  {
    "id": 1,
    "name": "DE Publisher"
  },
  {
    "id": 2,
    "name": "AT Publisher"
  },
  {
    "id": 3,
    "name": "PL Publisher"
  },
  {
    "id": 4,
    "name": "ES Publisher"
  },
  {
    "id": 5,
    "name": "UK Publisher"
  },
  {
    "id": 6,
    "name": "NL Publisher"
  }
]

let offices = [
  {
    "id": 1,
    "name": "Berlin"
  },
  {
    "id": 2,
    "name": "Düsseldorf"
  },
  {
    "id": 3,
    "name": "Vienna"
  },
  {
    "id": 4,
    "name": "Warsaw"
  },
  {
    "id": 5,
    "name": "Madrid"
  },
  {
    "id": 6,
    "name": "London"
  },
  {
    "id": 7,
    "name": "Amsterdam"
  }
]

app.get("/api/employees", (req, res) => {
  setTimeout(() => {
    res.send({ status: "OK", data: employees });
  }, 250);
});

app.get("/api/publishers", (req, res) => {
  setTimeout(() => {
    res.send({ status: "OK", data: publishers });
  }, 250);
});

app.get("/api/offices", (req, res) => {
  setTimeout(() => {
    res.send({ status: "OK", data: offices });
  }, 250);
});

app.get("/api", (req, res) => {
  res.send({ status: "OK", message: `Project is runn'n on port=${port}` });
});


app.listen(port, () =>
  console.log(`Project ICE server listening on port ${port}!`)
);

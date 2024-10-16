const http = require('http');
const fs = require('fs');

const port = 8000;

const server = http.createServer((req, res) => {
  let filename = "";
  
  switch (req.url) {
    case "/":
      filename = "./docs/Home.html";
      break;
    case "/Home":
      filename = "./docs/Home.html";
      break;
    case "/About":
      filename = "./docs/About.html";
      break;
    case "/Product":
      filename = "./docs/Product.html";
      break;
    case "/Contact":
      filename = "./docs/Contact.html";
      break;
    default:
      filename = "./docs/404.html"; 
      break;
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      console.error(err);
    }
    res.write(data);
    res.end();
  });
});

server.listen(port, () => {
  console.log(`Server running ${port}`);
});

import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import addRoutes, { RouteHandler, routes } from "./helpers/RouteHandler";

addRoutes("GET", "/", (req, res) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Hello From node js with typescript...",
      path: req.url,
    }),
  );
});

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);
    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "route Not found",
          path,
        }),
      );
    }

    // if (req.url == "/" && req.method == "GET") {
    //   res.writeHead(200, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Hello From node js with typescript...",
    //       path: req.url,
    //     }),
    //   );
    // }
    if (req.url == "/api" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Health Status OK",
          path: "/api",
        }),
      );
    }

    if (req.url == "/api/users" && req.method == "POST") {
      // const user = {
      //   name: "sdasd",
      //   id: 1,
      // };
      // res.writeHead(200, { "content-type": "application/json" });
      // res.end(JSON.stringify(user));

      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const parsedBody = JSON.parse(body);
          console.log(parsedBody);
          res.end(JSON.stringify(parsedBody));
        } catch (error: any) {
          console.log(error?.message);
        }
      });
    }
  },
);

server.listen(config.port, () => {
  console.log(`The server is listening on ${config.port}`);
});

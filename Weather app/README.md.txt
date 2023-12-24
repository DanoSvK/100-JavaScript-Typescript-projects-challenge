The project employs ES6 modules which only work via HTTP(s). For this project to run properly you need one of these options:
    1. Live Server (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), a VS Code extension that adds a right-click option to run your pages with a local server.
    2. Node static server (https://www.npmjs.com/package/static-server#getting-started), a simple http server to serve static resource files from a local directory.
    3. Node live server (https://www.npmjs.com/package/live-server/v/0.8.0) is easy to install and use:
        a/ npm install -g live-server // Install globally via npm
        b/ live-server                // Run in the html's directory
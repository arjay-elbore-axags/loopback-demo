let configs = {
  "files": [
    { 
      "include": "./**/*.js", 
      "ignore": [
          "./**/*.route.js",
          "./models/**/*.js",
          "./models/**/*.json"
        ] 
    }
  ],
  "rootDir": __dirname
};

export { configs }
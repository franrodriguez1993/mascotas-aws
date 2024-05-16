module.exports = {
  apps : [{
    script: 'dist/main.js',
    name: "mascotasApp",
    exec_mode:"fork", //cluster o fork
    instances:1, //número de instancias (copias)
    watch: true,
    increment_var: 'PORT',
    env: {
      "PORT": 3000,
      "NODE_ENV": "development" 
    }
  }]
};

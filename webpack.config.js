 var webpack = require('webpack');  
 var path = require('path');  
 var fs = require('fs');  
 var nodeModules = {};    
 // note the path.resolve(__dirname, ...) part  
 // without it, eslint-import-resolver-webpack fails  
 // since eslint might be invoked with different cwd  
 fs.readdirSync(path.resolve(__dirname, 'node_modules'))      
   .filter(x => ['.bin'].indexOf(x) === -1)      
   .forEach(mod => { 
      nodeModules[mod] = `commonjs ${mod}`;      
   });    
   // es5 style alternative  
   // fs.readdirSync(path.resolve(__dirname, 'node_modules'))  
   //     .filter(function(x) {  
   //         return ['.bin'].indexOf(x) === -1;  
   //     })  
   //     .forEach(function(mod) {  
   //         nodeModules[mod] = 'commonjs ' + mod;      
   //     });    
   
   module.exports =        
      {          
         // The configuration for the server-side rendering          
         name: 'server',          
         target: 'node',          
         entry: './src/index.js',          
         output: {              
            path: path.resolve(__dirname, 'bin'),              
            filename: 'index.js'          
         },          
         externals: nodeModules,          
         module: {              
            rules: [                  
               {                      
                  test: /\.(js|jsx)$/i,                      
                  loader: 'babel-loader',                  
               },                  
               {                      
                  test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,                      type: 'asset',                  
               },              
            ],          
         },          
         plugins: []      
      };
[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# image-processing-ts
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Usage
Start the project with `npm run dev` command.
After starting, open the http://localhost:3000/ URL in your browser.
On the welcome page, you can test the generated services via API Gateway and check the nodes & services.

## Project Idea

I wanted to try out Moleculer and build something for fun, and image processing seemed a good idea. So this is a rough service that takes an image URL, width, height and a flag base64 as parameters and returns the image either as binary data or as a base64.

Since my knowledge of Moleculer is very limited, I chose to follow the directions provided by the framework in which I started from the base project and just created the new getter service and deleted the services I didn't need.

The getter service is a simple service that receives the necessary parameters, validates them, fetches the image and applies the necessary resizing to the image that ended up downloading and returns the image to the user.

Things I would like to improve in due time and a better understanding of the Moleculer framework:
- Validation of parameters in the API service instead of the getter service;
- Use a Molecular module instead of the Axios package for HTTP requests;
- Add unit tests for parameter validation;
- Extract default values to proper variables, for easy maintainability;
- Enable more operations on the image instead of just allowing the resize;
- Replace the default UI with a custom UI; Also, I'm not a proficient Vue developer and would rather opt for ReactJS or Svelte;

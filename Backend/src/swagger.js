import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IOO AirBnb API",
      version: "1.0.0",
      description: "Documentación de la API de autenticación, usuarios, propiedades y reservas",
    },
    servers: [
      {
        url: process.env.API_URL, // ajusta al puerto de tu backend
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token", // coincide con el nombre de tu cookie httpOnly
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  // Rutas donde swagger-jsdoc va a buscar los comentarios @openapi
  apis: ["./src/routes/*.js"], // ajusta la ruta según tu estructura de carpetas
};

export const swaggerSpec = swaggerJSDoc(options);
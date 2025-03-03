const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body

  let repository = {
    id:uuid(),
    title,
    url,
    techs,
    likes: 0
 }
  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params
  const { title, url, techs,likes } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository ID Not Found"})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository ID Not Found"})
  }

repositories.splice(repositoryIndex,1)

  return response.status(204).json({message: "Item excluído com sucesso"})
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const { title, url, techs,likes } = request.body


  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository ID Not Found"})
  }

repositories[repositoryIndex].likes++

  return response.json(repositories[repositoryIndex])
});

module.exports = app;

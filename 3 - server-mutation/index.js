const { ApolloServer, gql } = require('apollo-server')
const Sequelize = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize(
  `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@eYOUR-HOST:5432/${
    process.env.DB
  }`,
  {
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  }
)

const Framework = sequelize.define('frameworks', {
  name: {
    type: Sequelize.STRING
  },
  git: {
    type: Sequelize.STRING
  }
})

const typeDefs = gql`
  type Framework {
    id: String
    name: String
    git: String
  }

  type Query {
    frameworks: [Framework]
  }

`

const resolvers = {
  Query: {
    frameworks: async () => {
      try {
        const frameworks = await Framework.findAll()

        return frameworks
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
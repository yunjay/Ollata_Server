const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    scooternames: (root, args, context, queryInfo) => {
      return context.db.query.scooters({}, queryInfo);
    }
  },
  Mutation: {
    scooter: (root, args, context, queryInfo) => {
      return context.db.mutation.createScooter(
        {
          data: {
            type: args.type,
            name: args.name
          }
        },
        queryInfo
      );
    }
  }
};


const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/steve12146/Ollata/dev',
      secret: 'testsecret',
      debug: true
    })
  })
});

server.start(() => console.log(`Server address: http://localhost:4000`));

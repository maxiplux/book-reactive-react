module.exports = {
  tweets: {
    maxTweetSize: 140
  },
  mongodb: {
    development: {
      connectionString: "mongodb://twitter:1234@localhost:27017/Twitter?authSource=Twitter"
    },
    production: {
      connectionString: "mongodb://twitter:1234@localhost:27017/Twitter?authSource=Twitter"
    }
  },
  jwt: {
    secret: "#$%EGt2eT##$EG%Y$Y&U&/IETRH45W$%whth$Y$%YGRT"
  }
}

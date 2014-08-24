library(twitteR)

download.file(url="http://curl.haxx.se/ca/cacert.pem", destfile = "/cacert.pem")


my.key <- 'HvMJDVAHiBP1uGpVt2c0Q'
my.secret <- 'Jwlqespuwd6YqUU7wSHSxZV4kbwLDjedT1uPUTfaFlA'
cred <- OAuthFactory$new(consumerKey=my.key, consumerSecret=my.secret, requestURL='https://api.twitter.com/oauth/request_token', accessURL='https://api.twitter.com/oauth/access_token', authURL='https://api.twitter.com/oauth/authorize')
cred$handshake(cainfo="/cacert.pem")
save(cred, file="twitter authentication.Rdata")
registerTwitterOAuth(cred)


PGi <- userTimeline("PGi", n=3200, cainfo="/cacert.pem")
PGi.df <- do.call(rbind, lapply(PGi, as.data.frame))
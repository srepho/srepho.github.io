library(dplyr)
library(ggplot2)
library(caret)
library(ggmap)

SFPD$Date<-as.Date(SFPD$Date, format="%m/%d/%Y")

SFPD$DT <- paste(SFPD$Date, SFPD$Time, sep=" ")

SFPD$DT<-as.POSIXct(SFPD$DT, format="%Y-%M-%d %H:%M", tz="America/Los_Angeles")

#Total:

sf<-qmap("San Francisco", zoom = 13, maptype= "hybrid")
sf+geom_point(aes(x=X, y=Y, color=Category), data=SFPD)

#Time Series

SFTS <- SFPD %>%
  group_by(DT) %>%
  summarise(
    Total=n()
  )

ggplot(SFTS, aes(x=DT, y=Total)) + geom_line() + scale_x_datetime()

#Weekday

#Friday and Saturday Evenings

#Weekend

SYD<-qmap("Sydney", zoom = 11, maptype= "hybrid")
SYD + geom_point(aes(x=US$lon, y=US$lat))

SYD<-get_googlemap('Sydney', markers=US, scale=2)
ggmap(SYD)
library(dplyr)
library(ggplot2)
library(caret)
library(ggmap)

SFPD$Date<-as.Date(SFPD$Date, format="%M/%d/%Y")

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

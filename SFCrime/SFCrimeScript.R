library(dplyr)
library(ggplot2)
library(caret)
library(ggmap)


sf<-qmap("San Francisco", zoom = 13, maptype= "satellite")
sf+geom_point(aes(x=X, y=Y), data=SFPD)

SFPD$Date<-as.Date(SFPD$Date, format="%M/%d/%Y")
head(foo)

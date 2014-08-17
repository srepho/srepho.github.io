library(plyr)
library(dplyr)
library(reshape2)
library(stringr)
library(ggplot2)
library(caret)

asx300<-read.csv("asx300.csv", header=T)
asx300<-asx300[301:1,]
asx300$Date<-as.Date(asx300$Date, format = "%d/%m/%Y")
ggplot(asx300, aes(x=Date, y=Adj.Close)) + geom_line() + scale_x_date()
ggplot(asx300, aes(x=Date, y=Return)) + geom_line() + scale_x_date()



library(forecast)
basic.model<-forecast(asx300$Adj.Close[301:21], h=20)
plot(basic.model)
lines(asx300$Adj.Close[301:1])


library(ForeCA)
Omega(asx300$Return)



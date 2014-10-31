library(stringr)
library(plyr)
library(dplyr)
library(caret)

train<-traindata
test<-testdata

train$Made.Donation.in.March.2007<-as.factor(train$Made.Donation.in.March.2007)

colnames(train)<-c("ID", "MonLastDon", "NumberofDonations", "TotalDonations", "MonFirstDon", "Donated")

colnames(test)<-c("ID", "MonLastDon", "NumberofDonations", "TotalDonations", "MonFirstDon")

library(ggplot2)
ggplot(train, aes(x=Donated)) + geom_histogram()
ggplot(train, aes(x=MonLastDon)) + geom_density()
ggplot(train, aes(x=NumberofDonations)) + geom_density()
ggplot(train, aes(x=TotalDonations)) + geom_density()
ggplot(train, aes(x=MonFirstDon)) + geom_density()
)

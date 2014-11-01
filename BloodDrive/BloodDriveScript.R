library(stringr)
library(plyr)
library(dplyr)
library(caret)

train<-traindata
test<-testdata

train$Made.Donation.in.March.2007<-as.factor(train$Made.Donation.in.March.2007)

colnames(train)<-c("ID", "MonLastDon", "NumberofDonations", "TotalDonations", "MonFirstDon", "Donated")

train$Donated<-as.factor(train$Donated)

colnames(test)<-c("ID", "MonLastDon", "NumberofDonations", "TotalDonations", "MonFirstDon")

library(ggplot2)
ggplot(train, aes(x=Donated)) + geom_histogram()
ggplot(train, aes(x=MonLastDon)) + geom_density()
ggplot(train, aes(x=NumberofDonations)) + geom_density()
ggplot(train, aes(x=TotalDonations)) + geom_density()
ggplot(train, aes(x=MonFirstDon)) + geom_density()

train$Donated<-NULL
preProcValues <- preProcess(train, method = c("center", "scale"))
train <- predict(preProcValues, train)
test <- predict(preProcValues, test)

train$Donated<-traindata$Made.Donation.in.March.2007
train$Donated<-as.factor(train$Donated)

set.seed(998)
inTraining <- createDataPartition(train$Donated, p = 0.80, list = FALSE)
training <- train[inTraining, ]
testing <- train[-inTraining, ]

fitControl <- trainControl(## 10-fold CV
  method = "repeatedcv",
  number = 10,
  ## repeated ten times
  repeats = 10,
  classProbs=TRUE)

svmmodel<-train(Donated~., method="svmLinear", trControl = fitControl, data=train, metric="Kappa")
psvmmodel<-train(Donated~., method="svmPoly", trControl = fitControl, data=train, metric="Kappa")
rsvmmodel<-train(Donated~., method="svmRadial", trControl = fitControl, data=train, metric="Kappa")
rfmodel<-train(Donated~., method="rf", trControl = fitControl, data=train, metric="Kappa")


svmpred<-predict(svmmodel, newdata=testing)
psvpred<-predict(psvmmodel, newdata=testing)
rsvpred<-predict(rsvmmodel, newdata=testing)
rfpred<-predict(rfmodel, newdata=testing)

confusionMatrix(data=svmpred, reference = testing$Donated)


svmmodel<-train(Donated~., method="svmLinear", trControl = fitControl, data=train, metric="Kappa")
psvmmodel<-train(Donated~., method="svmPoly", trControl = fitControl, data=train, metric="Kappa")
rsvmmodel<-train(Donated~., method="svmRadial", trControl = fitControl, data=train, metric="Kappa")
rfmodel<-train(Donated~., method="rf", trControl = fitControl, data=train, metric="Kappa")


svmpredictions<-predict(svmmodel, newdata=test, type="prob")
psvpredictions<-predict(psvmmodel, newdata=test, type="prob")
rsvpredictions<-predict(rsvmmodel, newdata=test)
rfpredictions<-predict(rfmodel, newdata=test)



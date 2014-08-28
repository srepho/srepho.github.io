library(plyr)
library(dplyr)
library(dplyr)
library(ggplot2)
library(caret)


predictors<-select(training, SOC, pH, Ca, P, Sand)
train<-select(training, -(PIDN))
train<-select(training, -(Ca:Sand))
test<-select(sorted_test, -(PIDN))

dtrain<-select(train, Depth)
train<-select(train, -(Depth))
dtest<-select(test, Depth)
test<-select(test, -(Depth))
#Plotting

ggplot(predictors, aes(x=SOC)) + geom_histogram()
ggplot(predictors, aes(x=pH)) + geom_histogram()
ggplot(predictors, aes(x=Ca)) + geom_histogram()
ggplot(predictors, aes(x=P)) + geom_histogram()
ggplot(predictors, aes(x=Sand)) + geom_histogram()


#Remove NZV and correlations

nzv <- nearZeroVar(train)
#Nothing!


foo<-cor(train)

highlyCorDescr <- findCorrelation(train)
filteredDescr <- filteredDescr[, -highlyCorDescr]
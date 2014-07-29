library(plyr)
library(dplyr)
library(stringr)
library(ggplot2)
library(reshape2)
library(caret)


set.seed(12)
trainIndex <- caret::createDataPartition(churn$Churn., p = .75, list = FALSE, times = 1)
churnTrain <- churn[ trainIndex,]
churnTest <- churn[-trainIndex, ]


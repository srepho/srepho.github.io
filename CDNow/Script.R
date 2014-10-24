library(eha)
library(tm)
library(Biograph)
library(lubridate)
library(qdap)
library(COUNT)
library(plyr)
library(dplyr)
library(ggplot2)
library(reshape2)
library(stringr)
library(forecast)
library(caret)
library(BTYD)
library(msm)
library(mvna)
library(survival)
library(muhaz)
library(tsintermittent)
library(TSclust)
library(hflights)
library(useful)
library(NbClust)
library(GGally)
library(mixAK)
library(bayesm)

CDNOW <- CDNOW_master

colnames(CDNOW) <- c("Client", "Date", "NoPurchased", "Spent")


CDNOW$Date<-as.Date.character(CDNOW$Date, format = "%Y%m%d")
summary(CDNOW)

train<-filter(CDNOW, Date<"1997-09-30")

Grouped <- CDNOW %>%
  group_by()

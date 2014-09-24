




foo <- select(train, Soil_Type1:Soil_Type40)



i<-1
x<-1
while(i<41){
  if(foo[x,i]==0 | x>15121){
    x<-x+1
  } else {
    train$SoilType[x]<-SN$Soil[i]
    x<-1
    i<-i+1
  }
}

i<-1
while(i<41){
foo[,i]<-foo[,i]*i
i<-i+1
}
library(dplyr)
library(ggplot2)
library(caret)

library(RgoogleMaps)
center = c(-122.4,37.77)
center = c(37.77, -122.4)
zoom <- 5 
terrmap <- GetMap(center=center, zoom=zoom, maptype= "satellite", destfile = "terrain1.png")
plot(terrmap)


BrooklynMap <- GetMap(center="San Francisco", zoom=13)


baylor <- "baylor university"
qmap(baylor, zoom = 14)

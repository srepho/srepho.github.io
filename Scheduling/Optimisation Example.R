library(linprog)

ROI <- c(0.09, 0.14, 0.10, 0.05)

bVect <- c(1000, 0, 0, -200, -80, -60, 220, 0, 1300)

AMatrix <- rbind(
  c(1,1,1,1), # TOTAL
  c(0.6,-0.4,-0.4,0.6), # SEO + AdWords > 60%
  c(-0.2,-0.2,-0.2,0.8), # FB < 20%
  c(-1,0,0,0), # Min TV
  c(0,0,0,-1), # Min FB
  c(0,-1,0,0), # Min SEO
  c(0,1,0,0), # Max SEO
  c(0,-3,1,0), # Adwords <= 3 SEO
  c(2.5,2.1,0.9,3.0) # Campaign reach
)

solveLP(ROI, bVect, AMatrix, TRUE)





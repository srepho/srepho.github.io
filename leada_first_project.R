library(dplyr)


ZC <- delivery_data %>%
  mutate(
    Less_Than_60=ifelse(purchase_price<60.01, 1, 0),
    Btw_60_120=ifelse(purchase_price>60.01 & purchase_price<120, 1, 0),
    Above_120=ifelse(purchase_price>119.99, 1, 0)) %>%
  group_by(pickup_zipcode) %>%
  summarise(
    Count=n(),
    Less_Than_60=sum(Less_Than_60),
    Btw_60_120=sum(Btw_60_120),
    Above_120=sum(Above_120)
    ) %>%
  filter(Count>199)

ZC1 <- delivery_data %>%
  mutate(
    Less_Than_60=ifelse(purchase_price<60.01, 1, 0),
    Btw_60_120=ifelse(purchase_price>60.01 & purchase_price<120, 1, 0),
    Above_120=ifelse(purchase_price>120, 1, 0)) %>%
  group_by(pickup_zipcode) %>%
  summarise(
    Count=n(),
    Less_Than_60=sum(Less_Than_60),
    Btw_60_120=sum(Btw_60_120),
    Above_120=sum(Above_120)
  ) %>%
  filter(Count>199)
  
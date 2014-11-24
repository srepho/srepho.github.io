## Really Chapter 2
typeof()
length()
attributes()
length()
attributes()



## Atomic Vectors:

# Logical

logie<-c(T, T, F)

# Integer: using L gets intergers

fin<-c(1L, 5L, 7L)

# Double (numeric)

dob <- c(1.5, 2.7)

# Character


c(1, c(2, 4))  #becomes flat


## Lists
# mixture of elements

foo<-list(1:3, c("a"))


# can contain lists of lists

boo<-list(1:3, list(4:6, list(1:3)))

#unlist to convert back to vector

## Attributes
y<-(1:10)
attr(y, "green")<-"moo"
attr(y, "blue")<-"test"
str(y)
str(attributes(y))


## Names: 3 ways to create:
# 1

x<-c(a = 1, b = 2, c = 3)

# 2

x <- 1:3
names(x) <- c("name1", "name2", "name3")

# 3

x <- setNames(1:3, c("a", "b", "c"))


#####  Questions:
#1 Why does this not show comment? structure(1:5, comment = "my attribute")
structure(1:5, comment = "my attribute")
attr(x, "comment") <- "my attribute"

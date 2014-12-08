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

##### Questions:
#1 What are the six types of atomic vector? How does a list differ from an atomic vector?

#2 What makes is.vector() and is.numeric() fundamentally different to is.list() and is.character()?

#3 Test your knowledge of vector coercion rules by predicting the output of the following uses of c():

c(1, FALSE)
c("a", 1)
c(list(1), "a")
c(TRUE, 1L)

#4 Why do you need to use unlist() to convert a list to an atomic vector? Why doesn't as.vector() work?

#5 Why is 1 == "1" true? Why is -1 < FALSE true? Why is "one" < 2 false?

#6 Why is the default missing value, NA, a logical vector? What's special about logical vectors? 
# (Hint: think about c(FALSE, NA_character_).)

#####  Questions:
#1 Why does this not show comment? structure(1:5, comment = "my attribute")
structure(1:5, comment = "my attribute")
attr(x, "comment") <- "my attribute"

#Answer: comment attribute is not printed by default
# Ex
foo<-structure(1:5, comment = "my attribute")
foo # doesn't print
comment(foo) #still accessable

#2 What happens to a factor when you modify its levels? 
f1 <- factor(letters)
levels(f1) <-rev(levels(f1))
#Answer: modifying order of the levels modifies the order of the attached variable in the same way

#3 What does this code do? How do f2 and f3 differ from f1?
f2 <- rev(factor(letters))
f3 <- factor(letters, levels = rev(letters))




### Chapter 4

# The first functions to learn
?
str

# Important operators and assignment
%in%, match
=, <-, <<-
  $, [, [[, head, tail, subset
with
assign, get
          
          # Comparison 
          all.equal, identical
          !=, ==, >, >=, <, <=
            is.na, complete.cases
          is.finite
          
          # Basic math
          *, +, -, /, ^, %%, %/%
            abs, sign
          acos, asin, atan, atan2
          sin, cos, tan
          ceiling, floor, round, trunc, signif
          exp, log, log10, log2, sqrt
          
          max, min, prod, sum
          cummax, cummin, cumprod, cumsum, diff
          pmax, pmin
          range
          mean, median, cor, sd, var
          rle
          
          # Functions to do with functions
          function
          missing
          on.exit
          return, invisible
          
          # Logical & sets 
          &, |, !, xor
          all, any
          intersect, union, setdiff, setequal
          which
          
          # Vectors and matrices
          c, matrix
          # automatic coercion rules character > numeric > logical
          length, dim, ncol, nrow
          cbind, rbind
          names, colnames, rownames
          t
          diag
          sweep
          as.matrix, data.matrix
          
          # Making vectors 
          c
          rep, rep_len
          seq, seq_len, seq_along
          rev
          sample
          choose, factorial, combn
          (is/as).(character/numeric/logical/...)
          
          # Lists & data.frames 
          list, unlist
          data.frame, as.data.frame
          split
          expand.grid
          
          # Control flow 
          if, &&, || (short circuiting)
          for, while
          next, break
          switch
          ifelse
          
          # Apply & friends
          lapply, sapply, vapply
          apply
          tapply
          replicate
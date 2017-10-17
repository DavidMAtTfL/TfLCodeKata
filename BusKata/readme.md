Part 1
-------------------

your task is to write a program for calculating a customers total bill when travelling by bus.

When someone taps on a bus reader, it charges them £1.50, if they tap a bus reader of the same route
as the next tap, they do not get charged again. 

The program should ask for an input value, which is the bus route id, it will then calculate the total
cost and print it to the console.

sample console output:

\>Please enter a route number  
\19  
*>Total Cost: £1.50  
*>Please enter a route number  
*4  
*>Total Cost: £3.00
*>Please enter a route number
*4
*>Total Cost: £3.00
*>Please enter a route number

Part 2
-------------------

extend your program so that it can calculate a fare for multiple cards, using a card id 

sample console output:

*>Please enter a card Id
*>100000000
*>Please enter a route number
*19
*>Card Id: 100000000, Total Cost: £1.50
*>Please enter a card Id
*>200000000
*>Please enter a route number
*4
*>Card Id: 100000000, Total Cost: £1.50
*>Card Id: 200000000, Total Cost: £1.50
*>Please enter a card Id
*>100000000
*>Please enter a route number
*4
*>Card Id: 100000000, Total Cost: £3.00
*>Card Id: 200000000, Total Cost: £1.50
*>Please enter a route number

Part 3
-------------------

change your program so that you can run it with a file as an input parameter, containing a 
list of card ids and route numbers. The program should then write a new file, with a list of 
card numbers and balances.

input file format:

100000000, 19
200000000, 4
100000000, 4

output file format:

100000000, £3.00
200000000, £1.50


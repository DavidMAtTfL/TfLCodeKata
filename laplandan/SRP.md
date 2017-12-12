Santa's Route Planner (SRP)
---------------------------

Santa Claus has a lot of presents to deliver every Christmas. 

In order to be able to deliver presents to all the nice people in Laplandan, he will need to figure out the shortest distance between them, along with a few pub stops to keep the mulled wine levels high.

He already has a map over here: http://assets.londonist.com/uploads/2014/12/xmas2014.jpg

However, he has decided to recruit YOU to build him an app so he doesn't have to do all those hard calculations.

## Challenge

Given a set of two stations within Laplandan, you must find the shortest route (in terms of stops) between the two points.

### Example

Input data:

````
Holly Park, Treegent's Park
````

Expected output:

````
[
    {
        line: "Santaral Line",
        from: "Holly Park",
        to: "Boxing Day Circus",
        stops: 6
    },
    {
        line: "Cakerloo Line",
        from: "Boxing Day Circus",
        to: "Treegent's Park",
        stops: 1 
    }
]
````

The data for all the lines is available in the ./sleighmap folder. 


## Bonus

Sleigh interchanges are tough - especially when you're juggling a bottle of port and a bag of presents.

For bonus points, ensure the journey returned also has the least amount of interchanges for that amount of stops

### Example

Christmassy Lane to Charing Frost should only go along the Santaral and North Pole line, without taking the Pick-a-Holly line in the middle.

## Extra Bonus

Given that it takes 3 minutes to get between each stop and it takes 5 minutes to switch between lines, also return the amount of time taken to get between two places

### Example

Input data:

````
Holly Park, Treegent's Park
````

Expected output:

````
journeyHistory: [
    {
        line: "Santaral Line",
        from: "Holly Park",
        to: "Boxing Day Circus",
        stops: 6
    },
    {
        line: "Cakerloo Line",
        from: "Boxing Day Circus",
        to: "Treegent's Park",
        stops: 1 
    }
],
time: 26
````
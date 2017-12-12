Mince Pie Allocation Engine (MPAE)
----------------------------------

ElfTP have been working very hard to provide a good fares and ticketing service for the sleigh lines across Laplandan.

All fares are to be paid in mince pies and follow the following rules:

- There is a base charge of total Distance in Stops (not counting out of sleigh interchanges or BoatyMcBoatfice rides), divided by 2, rounded down to the nearest mince pie.

- The base charge for BoatyMcBoatFace is 8 Mince pies, independent of distance.

- Use of Out of Sleigh Interchanges is free

- Every lump of coal on the person's account adds the cost of an extra mince pie per line used (not counting out of sleigh interchanges).

- There is a daily cap of 30 mince pies, minus the amount of candy canes in their account

- Anyone with "Elf" in their name travels for free

Provide a system that, when given a person's account information (with lumps of coal and or candy canes) and their journey history, will return the cost of their journey (in mince pies).

### Example

Naughty or Nice account input:

````
{
  name: "Bob Cratchit",
  lumpsOfCoal: 2,
  candyCanes: 5
}
````

Journey History input:

````
[
    {
        line: "Santaral Line",
        from: "Holyborn",
        to: "Frank-incense",
        stops: 3
    },
    {
        line: "Out Of Sleigh Interchange",
        from: "Frank-incense",
        to: "Ornament",
        stops: 1
    },
    {
        line: "Arctic Circle Line",
        from: "Ornament",
        to: "Blackfirs",
        stops: 3
    },
    {
        line: "BoatyMcBoatface",
        from: "Blackfirs",
        to: "Winterloo",
        stops: 2
    }
]
````

Expected Output:

````
{
  costInMincePies: 17
}
````
(total distance(6) / 2 = 3) + (Boaty McBoatface Ride(8)) + (lines used(3) x lumps of coal(2))

Not affected by the daily cap which would come to 25 Mince Pies

No "Elf in name"


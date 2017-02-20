TrainLoop
--------------------------------------------

You have been tasked to help work on the latest train signalling system.

Your train line is currently quite simple, only has uni-directional traffic flow and looks like this:

--1----2-->------3---->-----
|                          4
|                          |
9                          |
|                          5
----8----7-----<---6---<----

Your society has not had funding in the arts sector for decades, so interesting station names are no longer common, and numbers are used to distinguish them instead.


As an MVP, you need to create a system for controlling the progress of trains between stations:


You must have a central system (CS) from which you can add trains to the system and send commands to the trains to move between the stations (with some sort of command, e.g. move from station 3 to station 4). 

Each of the "trains" must be a seperate service and must be able to communicate back to the central system if they have crashed into another train or if another train has crashed into them.

All the stations only have one platform currently, so if a second train arrives at a station, or attempts to go past that station when a train is already there, these trains will crash.

Estimated time: 1hr

Bonus:

If a train that is 1 station ahead of other trains has not moved for over a minute, all trains that are stuck in the traffic (on consecutive stations behind that train) should print a message telling customers that there has been a signal failure and that hopefully the trains will shortly continue running smoothly.

Cycle Hire App
-------------------------------------------
![alt tag](cyclehire.png)
 
 
 Your task is to develop a mobile app for Santander cycle hire. The requirements for the app are the following.




AS AN app user
I WANT to be able to see all of the cycle stations in the area
SO THAT I can locate my nearest one
 
AS AN app user
I WANT to be able to view detailed information about a cycle stations, such as the number of bikes and number of empty docks.
SO THAT I know if a bike or dock is available.
 
App Frameworks
 
You can use whichever app framework you like, but we would recommend using React Native or Xamarin.
 
There is a simple getting started tutorial for React Native here : http://facebook.github.io/react-native/releases/0.25/docs/tutorial.html
 
And one for Xamarin here : https://developer.xamarin.com/guides/android/getting_started/hello,android/hello,android_quickstart/
 
It would be great if you could come to the session with the tools needed to start your app already installed.
 
The project should consist of a frontend app and a backend API. You can either develop your own API, or one will be provided in the session. Alternatively you could just copy and paste the sample json below, and use that in place of an API.
 
API
 
The API should return a list of docking station objects, which include a name, location coordinates, an integer representing the number of bikes, and an integer representing the number of empty docks.
 
{
DockingStations:
[
{
Name: "London Eye",
Latitude: 51.5033,
Longitude: 0.1195,
Bikes: 4,
Docks: 4
},
{
Name: "St James' Park",
Latitude: 51.4996,
Longitude: 0.1333,
Bikes: 2,
Docks: 6
}
]
}

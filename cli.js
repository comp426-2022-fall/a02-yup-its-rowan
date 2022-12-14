#!/usr/bin/env node

import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';


var args = minimist(process.argv.slice(2));

if (args.h){ // \n'd the stuff because i hate readability and also because it makes more sense than multiple consolelogs
    console.log ("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n-h            Show this help message and exit.\n-n, -s        Latitude: N positive; S negative.\n-e, -w        Longitude: E positive; W negative.\n-z            Time zone: uses tz.guess() from moment-timezone by default.\n-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n-j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0); //its done its job already, get outa here
}



var timezone = moment.tz.guess(); //not guest, its guess

if (args.z){
    timezone = args.z;

}    

var latitude = 0; //initialize JIC its freaky deaky
var longitude = 0;
if (args.n && args.s){
    console.log("You can't have both N&S"); 
    process.exit(1);
} else {
    if (args.n != null){
        latitude = args.n; //negatives and positives such as in the help message
    } else {
        latitude = -args.s;
    }
}

if (args.e && args.w){
    console.log("You can't have both E&W");
    process.exit(1);
} else {
    if (args.e != null){
        longitude = args.e;
    } else {
        longitude = -args.w;
    }
}

//let response = "https://api.open"


//ok this is latitude = ${latitude} and longitude = ${longitude} for the variable names cuz im cool like that
//then we 
const actualResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=precipitation_hours`);

const actualJson = await(actualResponse).json();

if(args.j){
    console.log(actualJson);
    process.exit(0);
}

var days = 1; //default to 1
if (args.d != null){
    days = args.d;
}

var printText = "";

if (actualJson.daily.precipitation_hours[days] > 0){
    printText += "You probably will need your galoshes ";
} else {
    printText += "You won't need your galoshes ";
}

if (days == 0) {
    printText += "today.";
} else if (days > 1) {
    printText += "in " + days + " days.";
} else {
    printText += "tomorrow.";
}

console.log (printText);
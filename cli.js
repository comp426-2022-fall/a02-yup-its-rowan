#!/usr/bin/env node

import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';


const args = minimist(process.argv.slice(2));

if (args.h){ // \n'd the stuff because i hate readability and also because it makes more sense than multiple consolelogs
    console.log ("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n-h            Show this help message and exit.\n-n, -s        Latitude: N positive; S negative.\n-e, -w        Longitude: E positive; W negative.\n-z            Time zone: uses tz.guess() from moment-timezone by default.\n-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n-j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0); //its done its job already, get outa here
}

const timezone = moment.tz.guess(); //not guest, its guess

var latitude = 0; //initialize JIC its freaky deaky
var longitude = 0;
latitude = args.n || -args.s; //negatives and positives such as in the help message
longitude = args.e || -args.w;

//let response = "https://api.open"


//ok this is latitude = ${latitude} and longitude = ${longitude} for the variable names cuz im cool like that
//then we 
const actualResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=precipitation_hours`);

const actualJson = await(actualResponse).json();

const days = 1; //default to 1
if (args.d){
    days = args.d;
}

if (actualJson.daily.precipitation_hours[days] > 0){
    console.log ("You probably will need your galoshes ");
} else {
    console.log ("You won't need your galoshes ");
}

if (days == 0) {
    console.log("today.")
  } else if (days > 1) {
    console.log("in " + days + " days.")
  } else {
    console.log("tomorrow.")
  }


import Divider from "@mui/material/Divider";
import PrayerCard from "./PrayerCard";
import Grid from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
import { useEffect, useState } from "react";
moment.locale("ar");
export default function MainContent() {
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");
  const [theTimings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Maghrib: "18:03",
    Isha: "19:33",
  });
  const [nextPrayerIndex , setNextPrayerIndex] = useState(0)
  const [prayerCountDown , setPrayerCountDown] = useState(0)

  const cities = [
    {
      diplayName: "القاهرة",
      apiName: "Cairo",
    },
    {
      diplayName: "الاسكندرية",
      apiName: "Alexandria",
    },
    {
      diplayName: "الغردقة",
      apiName: "Hurghada",
    },
  ];
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getTimings = async () => {
    try {
      const response = await axios.get(
        "https://api.aladhan.com/v1/timingsByCity?country=EG&city=" + city
      );
      const timings = response.data.data.timings;
      setTimings(timings);
      setToday(moment().format("MMM Do YYYY | h:mm"));
    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
  };

  useEffect(() => {
    if (city) {
      getTimings();
    }
  }, [city]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountDown();
    }, 1000);
    return () => clearInterval(interval);
  }, [theTimings]);

  function setupCountDown() {
    let momentNow = moment();
    let prayerIndex ;
    if(
      momentNow.isAfter(moment(theTimings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(theTimings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1 ;
      

    } else if (
      momentNow.isAfter(moment(theTimings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(theTimings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2 ;
    } else if (
      momentNow.isAfter(moment(theTimings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(theTimings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3 ;
    } else if (
      momentNow.isAfter(moment(theTimings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(theTimings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4 ;
    } else {
      prayerIndex = 0 ;
    }
    setNextPrayerIndex(prayerIndex)

    let nextPrayerObj = prayersArray[prayerIndex];
    let nextPrayerTime = theTimings[nextPrayerObj.key];
    let remainingTime = moment(nextPrayerTime,"hh:mm").diff(momentNow)
    if(remainingTime < 0){
      const midnightDiff = moment("23:59:59","hh:mm:ss").diff(momentNow)
      const fajrDiff = moment(nextPrayerTime,"hh:mm").diff(moment("00:00:00","hh:mm:ss"))
      const totalDiff = midnightDiff + fajrDiff ;
      remainingTime = totalDiff
    }
    let durationRemainingTime = moment.duration(remainingTime);
    setPrayerCountDown(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`)
  }

  return (
    <>
      <Grid container style={{ margin: "0 70px" }}>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>
              {city === "Cairo"
                ? "القاهرة"
                : city === "Alexandria"
                ? "الأسكندرية"
                : city === "Hurghada"
                ? "الغردقة"
                : "حدد المدينة"}{" "}
              {/*Default case*/}
            </h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقي حتي صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{prayerCountDown}</h1>
          </div>
        </Grid>
      </Grid>
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      {/* Prayers Cards Start */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PrayerCard
          prayer={"الفجر"}
          image={"9a07baa7-b49b-4f6b-99fb-2d2b908800c2"}
          time={theTimings.Fajr}
        />
        <PrayerCard
          prayer={"الظهر"}
          image={"9a07bb45-6a42-4145-b6aa-2470408a2921"}
          time={theTimings.Dhuhr}
        />
        <PrayerCard
          prayer={"العصر"}
          image={"9a07bb90-1edc-410f-a29a-d260a7751acf"}
          time={theTimings.Asr}
        />
        <PrayerCard
          prayer={"المغرب"}
          image={"9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"}
          time={theTimings.Maghrib}
        />
        <PrayerCard
          prayer={"العشاء"}
          image={"9a07bc25-1200-4873-8743-1c370e9eff4d"}
          time={theTimings.Isha}
        />
      </div>
      {/* Prayers Cards End */}
      {/* Select City Start*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel
            id="demo-controlled-open-select-label"
            style={{ color: "white" }}
          >
            المحافظة
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            style={{
              color: "white",
              border: "1px solid white",
              width: "250px",
            }}
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={city}
            label="Age"
            onChange={handleChange}
          >
            {cities.map((city) => (
              <MenuItem key={city.apiName} value={city.apiName}>
                {city.diplayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Select City End*/}
    </>
  );
}
import PropTypes from 'prop-types';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "../PrayerCard.css"; 

const PrayerCard = ({ prayer, image, time = "----" }) => {
  return (
    <Card className="prayer-card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={"https://wepik.com/api/image/ai/" + image} 
          alt={`${prayer} image`}
        />
        <CardContent>
          <h3 style={{ margin: "0", fontWeight: "500" }}>صلاة {prayer}</h3>
          <h1 style={{ margin: "5px" }}>{time}</h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// PropTypes validation
PrayerCard.propTypes = {
  prayer: PropTypes.string.isRequired, 
  image: PropTypes.string.isRequired, 
  time: PropTypes.string 
};

export default PrayerCard;

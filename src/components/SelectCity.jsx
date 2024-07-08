import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCity() {
  const [city, setCity] = React.useState('');
  const [open, setOpen] = React.useState(false);
  
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label" style={{color:"white"}}>المحافظة</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          style={{color:"white" ,border:"1px solid white", width:"250px"}}
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={city}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>القاهرة</MenuItem>
          <MenuItem value={20}>الأسكندرية</MenuItem>
          <MenuItem value={30}>الغردقة</MenuItem>
          <MenuItem value={40}>الشرقية</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
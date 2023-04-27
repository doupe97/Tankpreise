import '../../styles/FilterConfigurator.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';

const Input = styled(MuiInput)`width: 42px;`;

const FilterConfigurator = (props) => {

    const options = ['Alle', 'Diesel', 'Super E5', 'Super E10'];
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [radius, setRadius] = React.useState(10);

    const handleClick = () => {
      console.info(`You clicked ${options[selectedIndex]}`);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
      props.callBack(options[index], radius);
    };
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };

    const handleSliderChange = (event, newValue) => {
        setRadius(newValue);
        props.callBack(options[selectedIndex], newValue);
    };

    const handleInputChange = (event) => {
        var newRadius = event.target.value === '' ? '' : Number(event.target.value);
        setRadius(newRadius);
        props.callBack(options[selectedIndex], newRadius);
    };

    const handleBlur = () => {
        if (radius < 0) {
            setRadius(0);
        } else if (radius > 25) {
            setRadius(25);
        }
    };

    return (
        <React.Fragment>
            <p className="headline-filter">In welchem Umkreis suchen Sie?</p>
            <Box sx={{ width: 250 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            value={typeof radius === 'number' ? radius : 0}
                            onChange={handleSliderChange}
                            min={0}
                            max={25}
                            step={1}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={radius}
                            size="small"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 25,
                                type: 'number'
                            }}
                        /> km
                    </Grid>
                </Grid>
            </Box>
            <p className="headline-filter">An welchem Kraftstoff sind Sie interessiert?</p>
            <ButtonGroup variant="contained" ref={anchorRef}>
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button size="small" onClick={handleToggle}>
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                    <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                        {options.map((option, index) => (
                            <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                            >
                            {option}
                            </MenuItem>
                        ))}
                        </MenuList>
                    </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}

export default FilterConfigurator;
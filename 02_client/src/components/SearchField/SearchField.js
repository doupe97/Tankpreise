import TextField from '@mui/material/TextField';

const SearchField = (props) => {
    return (
        <TextField
            id={props.fieldId}
            label={props.label}
            value={props.value}
            fullWidth={true}
            onChange={(event) => (props.onChange(event.target.value))}
            autoComplete='on' />
    );
}

export default SearchField;
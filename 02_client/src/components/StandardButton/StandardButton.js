import Button from '@mui/material/Button/Button';

const StandardButton = (props) => {
    return (
        <div>
            <Button
                variant='outlined'
                form={props.form}
                type={props.type}
                style={props.style}
                onClick={() => (props.onClick())}>{props.buttonName}</Button>
        </div>
    )
}

export default StandardButton;
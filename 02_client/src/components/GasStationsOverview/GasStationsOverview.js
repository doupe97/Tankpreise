import GasStation from '../GasStation/GasStation';
import '../../styles/GasStationsOverview.css'

const GasStationsOverview = (props) => {

    if (props.data !== undefined && props.data.length > 0) {
        return (
            <div>
                {props.data.map(gasStation => {
                    return (
                    <GasStation
                        key={gasStation.id}
                        id={gasStation.id}
                        brand={gasStation.brand}
                        street={gasStation.street}
                        houseNumber={gasStation.houseNumber}
                        postCode={gasStation.postCode}
                        place={gasStation.place}
                        dist={ (gasStation.dist == undefined) ? "" : gasStation.dist }
                        isOpen={gasStation.isOpen}
                        diesel={gasStation.diesel}
                        e5={gasStation.e5}
                        e10={gasStation.e10}
                    />
                    );
                })}
            </div>
        );
    } else {

        const noGasStationImage = `${process.env.PUBLIC_URL}/assets/noGasStation.svg`;

        return (
            <div className="emptyMessage">
                <p>Keine Tankenstellen verfügbar...</p>
                <img src={noGasStationImage} alt="no gas station available"></img>
            </div>
        );
    }
    
}

export default GasStationsOverview;
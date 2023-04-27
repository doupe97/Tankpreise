import PriceCard from '../PriceCard/PriceCard';
import '../../styles/GasStation.css';

const GasStation = ({
  id,
  brand,
  street,
  houseNumber,
  postCode,
  place,
  dist,
  isOpen,
  diesel,
  e5,
  e10
}) => {

  const currency = "€";
  const distanceUnit = "km";
  const emptyValue = "---";

  const address = `${street} ${houseNumber}, ${postCode} ${place}`;
  const labDiesel = (diesel !== "") ? `${(Math.round(diesel * 100) / 100).toFixed(2)} ${currency}` : emptyValue;
  const labSuperE5 = (e5 !== "") ? `${(Math.round(e5 * 100) / 100).toFixed(2)} ${currency}` : emptyValue;
  const labSuperE10 = (e10 !== "") ? `${(Math.round(e10 * 100) / 100).toFixed(2)} ${currency}` : emptyValue;
  const distance = (dist !== "") ? `${dist} ${distanceUnit}` : "";

  const openState = isOpen ? 
    `${process.env.PUBLIC_URL}/assets/open.svg` :
    `${process.env.PUBLIC_URL}/assets/close.svg`;
  
  const brandLogo = () => {
    switch(brand.trim().toLowerCase()) {
      case 'aral':
        return `${process.env.PUBLIC_URL}/assets/aral.svg`;
      case 'shell':
        return `${process.env.PUBLIC_URL}/assets/shell.svg`;
      case 'esso':
        return `${process.env.PUBLIC_URL}/assets/esso.svg`;
      case 'bft':
        return `${process.env.PUBLIC_URL}/assets/bft.svg`;
      case 'totalenergies':
        return `${process.env.PUBLIC_URL}/assets/total.svg`;
      case 'total':
        return `${process.env.PUBLIC_URL}/assets/total.svg`;
      case 'jet':
        return `${process.env.PUBLIC_URL}/assets/jet.svg`;
      case 'sb-tank scherer':
        return `${process.env.PUBLIC_URL}/assets/sbtank.svg`;
      case 'ed':
        return `${process.env.PUBLIC_URL}/assets/ed.svg`;
      case 'mundorf tank':
        return `${process.env.PUBLIC_URL}/assets/mundorf_tank.svg`;
      case 'star':
        return `${process.env.PUBLIC_URL}/assets/star.svg`;
      default:
        return `${process.env.PUBLIC_URL}/assets/gasstation.svg`;
    }
  }
  
  const cardInfo = [brand, address, labDiesel, labSuperE5, labSuperE10, brandLogo(), distance, openState, id];

  return (
    <div className='container'>
      <PriceCard data={cardInfo}></PriceCard>
    </div>
  );
};

export default GasStation;
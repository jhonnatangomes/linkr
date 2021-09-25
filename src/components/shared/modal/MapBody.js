import styled from "styled-components";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const MapBody = ({ CloseButton, username, position }) => {

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
        iconUrl: require('leaflet/dist/images/marker-icon.png').default,
        shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
    });

    const treatBigNames = (name) => {
        if (name.length <= 20) {
            return name;
        }

        if (name.indexOf(' ') >= 0) {
            return name.split(' ')[0];
        }

        return name.substring(0, 20);
    }

    return (
        <ModalContent>
            <Header>
                <ModalTitle>
                    <span>{treatBigNames(username)}</span>
                    <span>'s location</span>
                </ModalTitle>
                <CloseButton/>
            </Header>
            <Map center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} />
            </Map>
        </ModalContent>
    );
}

const ModalContent = styled.div`
    max-width: 790px;
    max-height: 354px;
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;

    &> div {
        justify-content: space-between;
        width: 90%;
    }
`;

const ModalTitle = styled.div`
    font-family: Oswald;
    font-style: normal;
    font-weight: bold;
    font-size: 38px;
    line-height: 1.1em;
    color: #FFFFFF;
    width: 90%;
    display: flex;

    & span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
        max-width: 70%;
    }

    @media (max-width: 700px) {
        font-size: 22px;;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const Map = styled(MapContainer)`
    width: 100%;
    height: 100%;
    max-width: 713px;
    max-height: 240px;
`;

export default MapBody;
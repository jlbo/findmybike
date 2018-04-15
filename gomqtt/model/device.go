package model

type DeviceType string

const (
	DeviceTypeThermo DeviceType = "thermo"
	DeviceTypeGPS    DeviceType = "gps"
)

type Device struct {
	DevID   string     `json:"devId"`
	DevType DeviceType `json:"devType`
}

func (r Device) GenURI() string {
	return "/device/" + string(r.DevType) + "/" + r.DevID
}

type URIResponse struct {
	URI string
}

// {
//     "channel": 0,
//     "datarate": 0,
//     "devEui": "00250C0100001114",
//     "freq": 902.3,
//     "gwEui": "00250C000100004D",
//     "joinId": 0,
//     "pdu": "02300F1900",
//     "port": 1,
//     "rssi": -123,
//     "seqno": 14,
//     "snr": -9,
//     "txtime": "2017-11-01T15:48:43.769Z"
// }

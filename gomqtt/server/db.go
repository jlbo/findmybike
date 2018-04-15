package server

import (
	"strconv"

	influx "github.com/influxdata/influxdb/client"
)

func (s *server) queryGPSDataPts(limit int) ([]influx.Result, error) {

	q := influx.Query{
		Database: dbName,
		Command:  `SELECT "lat","long" FROM gps LIMIT ` + strconv.Itoa(limit),
	}

	resp, err := s.db.Query(q)
	if err != nil {
		return nil, err
	}

	return resp.Results, nil
}

func (s *server) insertGPSPoint(tags map[string]string, fields map[string]interface{}) error {
	pt := influx.Point{
		Measurement: "gps",
		Tags:        tags,
		Fields:      fields,
	}

	bpt := influx.BatchPoints{
		Database: dbName,
		Points:   []influx.Point{pt},
	}

	_, err := s.db.Write(bpt)
	if err != nil {
		return err
	}

	return nil
}

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { deleteCar, getAllCars } from '../redux/actions/carsActions';
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
const { RangePicker } = DatePicker;
function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-center mt-2">Admin Panel</h1>
            <button className="btn1">
              <a href="/addcar">ADD CAR</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading === true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car flex w-[300px] flex-col items-center justify-between hover:scale-101 transition duration-300 ease-in shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-[rgba(0,_0,_0,_0.3)_0px_20px_40px] gap-0 p-2 py-3 rounded-xl ml-10 mb- mt-5 ">
              <div>
                  <p className="text-gray-700 font-semibold text-lg text-left truncate w-60 mt-10">
                    {car.name}
                  </p>
                </div>
                <div className="h-[100px]">
                  <img
                    src={car.image}
                    alt="carimage"
                    className="h-100 w-100"
                  />
                </div>

                <div className="car-content d-flex align-items-center justify-content-between">
                  <div className="text-left pl-3 py-5 px-3 ">
                    
                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                  </div>

                  <div className="mr-4">
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className="mr-3"
                        style={{ color: 'blue', cursor: 'pointer' }}
                      />
                    </Link>

                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={() => {
                        dispatch(deleteCar({ carid: car._id }));
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{ color: 'red', cursor: 'pointer' }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;

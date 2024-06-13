import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/common/TableComponent/TableComponent';
import './Booking.style.css';
import SearchComponent from '../../components/common/SearchComponent/SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../store/actions/booking.action';
import LoaderComponent from '../../components/common/LoaderComponent/LoaderComponent';
import { useNavigate } from 'react-router-dom';
import { splitDateTime } from '../../utils';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FilterModal from '../../components/common/FilterModal/FilterModal';
import { Button } from '@mui/material';

const Booking = () => {

  const selectedCities = useSelector((state) => state.dashboard.selectedCities);
  const selectedServices = useSelector((state) => state.dashboard.selectedServices);
  const selectedStatus = useSelector((state) => state.dashboard.selectedStatus);
  const selectedPartners = useSelector((state) => state.dashboard.selectedPartners);
  console.log("asdfghyju ________>>>>>>>>>",selectedPartners)
  console.log("------------>>>>>>>>>",selectedStatus)
  // const [searchText, setSearchText] = useState('');
  // const [searchType, setSearchType] = useState('phoneNumber');
  const [searchBtnPressed, setSearchBtnPressed] = useState(false);
  // const [selectedCities, setSelectedCities] = useState([]);
  // const [selectedServices, setSelectedServices] = useState([]);
  // const [selectedStatus, setSelectedStatus] = useState([]);
  const [filterString, setFilterString] = useState('');
  const { searchText, searchType } = useSelector((state) => state.dashboard);
//  console.log("Hi bros its testingf-________>>>>>>>>>",searchText, searchBtnPressed)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let bookingList = useSelector((state) => state.booking.bookingList?.bookings);
  const isLoading = useSelector((state) => state.booking?.isLoading)
  let pageCount = useSelector((state) => state.booking.bookingList?.totalPages);
  let totalBooking = useSelector(
    (state) => state.booking.bookingList?.totalRecords,
  );
  bookingList = bookingList?.map((data) => {
    const formattedDate = splitDateTime(data.appointmentAt);
    const bookingDate=splitDateTime(data?.bookingAt)

    let mappedCity = data.city;
    if (['Ghaziabad', 'Greater Noida'].includes(data.city)) {
      mappedCity = 'Noida';
    } else if (['Panchkula', 'Mohali'].includes(data.city)) {
      mappedCity = 'Chandigarh';
    } else if (data.city === 'Faridabad') {
      mappedCity = 'Gurgaon';
    }
    else if (['Delhi', "New Delhi"].includes(data.city)){
      mappedCity = "Delhi";
      }

    return {
      'Service Id': data?.sessionSchedulesId,
      sessionId: data.sessionId ? data.sessionId : null,
      'Client Name': data.name ? data.name : '',
      'Client Id': data?.clientId,
      Gender: data?.gender,
      'Phone Number': data.phoneNumber,
       City: data.city ? data.city : '',
      // MappedCity: mappedCity,
      'Service Name': data.productName ? data.productName : '',
      'Service Date': formattedDate.date,
      'Service Time': formattedDate.time,
      Address: data.formattedAddress ? data.formattedAddress : '',
      'Total (Rs.)': data.total ? `${data.total}` : '',
      Count: data.count ? data.count : '',
      'Service Status': data.status ? data.status : '',
      'Partner Name': data.partnerName ? data.partnerName : 'Not Assigned',
      map: data.map ? data.map : "",
      "Start Time": data.startTime ? data.startTime : "",
      "End Time": data.endTime ? data.endTime : "",
      "Comment": data.comment ? data.comment : "",
      "Caller Name": data.callerName ? data.callerName : "-",
      "Caller Phone": data.callerPhone ? data.callerPhone : "-",
      "Booking Date":bookingDate?.date,
      "Booking Time":data?.bookingTime
    };
  });

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const storedStartDate =
    sessionStorage.getItem('bookingStartDate') || today.toISOString().split('T')[0];
  const storedEndDate =
    sessionStorage.getItem('bookingEndDate') || tomorrow.toISOString().split('T')[0];
  const storedPage = sessionStorage.getItem('bookingPage') || '1';
  const [page, setPage] = useState(storedPage);
  const handlePageChange = (event, value) => {
    setPage(value.toString());
  };

  const [startDate, setStartDate] = useState(storedStartDate);
  const [endDate, setEndDate] = useState(storedEndDate);

  const handleDateChange = (event) => {
    if (event.target.name === 'startDate') {
      setStartDate(event.target.value);
    } else if (event.target.name === 'endDate') {
      setEndDate(event.target.value);
    }
  };

  const handleBookingDetail = (details) => {
    console.log(details);
    navigate(`/booking-details/${details['Service Id']}`);
  };

  const stringifiedUser = localStorage.getItem('userData');
  const userData = stringifiedUser ? JSON.parse(stringifiedUser) : null;
  const concentrixUser =
    userData && userData.user && userData.user.concentrixUser
      ? userData.user.concentrixUser
      : false;

  const clearSpecificSessionData = () => {
    sessionStorage.removeItem('bookingStartDate');
    sessionStorage.removeItem('bookingEndDate');
    sessionStorage.removeItem('bookingPage');
  };

  useEffect(() => {
    window.addEventListener('beforeunload', clearSpecificSessionData);
    return () => {
      window.removeEventListener('beforeunload', clearSpecificSessionData);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('bookingStartDate', startDate);
    sessionStorage.setItem('bookingEndDate', endDate);
    sessionStorage.setItem('bookingPage', page);

    //URLSearchParams start 
    const params = new URLSearchParams();
    if (startDate) {
      params.set('startDate', startDate);
    }
    if (endDate) {
      params.set('endDate', endDate);
    }
    const queryString = params.toString();
    const url = window.location.origin + window.location.pathname + '?' + queryString;
    window.history.replaceState({}, '', url);
    //URLSearchParams end

    const obj = {
      startDate: startDate,
      endDate: endDate,
      page: page,
    };

    if (searchText.length > 0) {
      obj.searchText = searchText;
      obj.searchType = searchType;
    }

    if (selectedCities.length > 0) {
      let cityFilter = '';
      for (let i = 0; i < selectedCities.length; i++) {
        if (i == selectedCities.length - 1) {
          cityFilter += `'${selectedCities[i].title}'`;
        } else {
          cityFilter += `'${selectedCities[i].title}',`;
        }
      }

      obj.cityFilter = cityFilter;
    }

    if (selectedServices.length > 0) {
      let serviceFilter = '';
      for (let i = 0; i < selectedServices.length; i++) {
        if (i == selectedServices.length - 1) {
          serviceFilter += `'${selectedServices[i].title}'`;
        } else {
          serviceFilter += `'${selectedServices[i].title}',`;
        }
      }

      obj.serviceFilter = serviceFilter;
    }

    if (selectedStatus.length > 0) {
      let statusFilter = '';
      for (let i = 0; i < selectedStatus.length; i++) {
        if (i == selectedStatus.length - 1) {
          statusFilter += `'${selectedStatus[i].title}'`;
        } else {
          statusFilter += `'${selectedStatus[i].title}',`;
        }
      }

      obj.statusFilter = statusFilter;
    }

    if(selectedPartners.length>0){
      let partnerFiletr='';
      for(let partner=0;partner<selectedPartners.length;partner++){
        if(partner == selectedPartners.length-1){
         partnerFiletr += `'${selectedPartners[partner].name}'`;
        }else{
          partnerFiletr += `'${selectedPartners[partner].name}'`;
        }
      }
      obj.partnerFiletr = partnerFiletr;
    }

    dispatch(fetchBookings(obj));
  }, [
    dispatch,
    startDate,
    endDate,
    page,
    searchBtnPressed,
    // searchText,
    // searchType,
    selectedCities,
    selectedServices,
    selectedStatus,
    selectedPartners
    // searchText.trim().length===0
  ]);

  useEffect(() => {
    let demoFilterString = '';
    for (let i = 0; i < selectedCities.length; i++) {
      demoFilterString += `${selectedCities[i].title},`;
    }

    for (let i = 0; i < selectedServices.length; i++) {
      demoFilterString += `${selectedServices[i].title},`;
    }

    for (let i = 0; i < selectedStatus.length; i++) {
      demoFilterString += `${selectedStatus[i].title},`;
    }
    for (let i = 0; i < selectedPartners.length; i++) {
      demoFilterString += `${selectedPartners[i].name},`;
    }

    setFilterString(demoFilterString);
  }, [selectedCities, selectedServices, selectedStatus,selectedPartners]);

  return (
    <div>
      <h3>All Bookings</h3>
      <div className="container">
        <div>
          <SearchComponent
            searchText={searchText}
            searchType={searchType}
            // setSearchText={setSearchText}
            // setSearchType={setSearchType}
            setSearchBtnPressed={setSearchBtnPressed}
            searchBtnPressed={searchBtnPressed}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
        <div>
          <FilterModal
            // setSelectedCities={setSelectedCities}
            // setSelectedServices={setSelectedServices}
            // setSelectedStatus={setSelectedStatus}

            setSelectedCities
            setSelectedServices
            setSelectedStatus
            selectedPartners
          />
        </div>

        <div className="date-rage">
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
          />
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
            // min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            min={new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          />
        </div>
      </div>
      {bookingList?.length > 0 ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {filterString.length > 0 ? (
                <>
                  <p style={{ fontSize: '12px', color: 'blue' }}>
                    {filterString.length > 0 ? (
                      `Filters: ${filterString}`
                    ) : (
                      <></>
                    )}
                  </p>
                  <Button onClick={() => window.location.reload()}>
                    Remove Filters
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>

            <h4
              style={{
                textAlign: 'right',
                marginBottom: '7px',
                padding: '5px',
              }}
            >
              Total no. of bookings for the selected date: {totalBooking}
            </h4>
          </div>

          <TableComponent
            data={bookingList}
            hiddenFields={[
              'orderId',
              'addressType',
              'addressPlaceId',
              'productSessionId',
              'isConsent',
              'productImage',
              'sessionId',
              'orderDetailId',
              'productId',
              'addressCompoundCode',
              'addressArea',
              'userId',
              'appointmentAt',
            ]}
            viewBookingButton={'view'}
            bookingDetails={handleBookingDetail}
          />
          <div className="incentiv-pagination" style={{ marginTop: '1rem' }}>
            <Stack spacing={3}>
              <Pagination
                count={pageCount}
                color="primary"
                onChange={handlePageChange}
                defaultPage={parseInt(page)}
              />
            </Stack>
          </div>
        </>
      ) : (
        (!isLoading && <p className='centered-text'>No Data found, please try reducing the filters and try again!</p>)
        // <LoaderComponent />
      )}
      {isLoading && <LoaderComponent />}
    </div>
  );
};

export default Booking;

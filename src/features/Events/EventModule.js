// EventModule.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Toast } from 'primereact/toast';
import EventForm from './components/EventForm';
import EventsList from './components/EventsList';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from 'primereact/button';
import { addCompanyEvent, fetchCompanyEvents } from '../../services/api';

const EventModule = ({ companyId }) => {
    const [eventDetails, setEventDetails] = useState({
        eventType: '',
        inclusions: [],
        allowed: [],
        notAllowed: [],
        petFriendly: false,
        coupleFriendly: false,
        indoor: false,
        startDate: new Date(),
        endDate: new Date() + 1,
        price: null,
        numberOfDays: 1,
        description: '',
        itinerary: [''],
        address: '',
        nearby: '',
        city: '',
        state: '',
        country: '',
        googleMapLink: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [events, setEvents] = useState([]);
    const toast = useRef(null);
    const { isDarkMode } = useTheme();

    const fetchEvents = useCallback(async () => {
        try {
            const data = await fetchCompanyEvents(companyId);
            setEvents(data);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch events' });
        }
    }, [companyId]);
    

    useEffect(() => {
        if (companyId) {
            fetchEvents();
        }
    }, [companyId, fetchEvents]);

    const handleAddEvent = async () => {
        try {
            await addCompanyEvent(companyId, eventDetails);
            fetchEvents();
            clearForm();
            setShowForm(false);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Event added successfully' });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add event' });
        }
    };

    const clearForm = () => {
        setEventDetails({
            eventType: '',
            inclusions: [],
            allowed: [],
            notAllowed: [],
            petFriendly: false,
            coupleFriendly: false,
            indoor: false,
            startDate: new Date(),
            endDate: new Date() + 1,
            price: null,
            numberOfDays: null,
            description: '',
            itinerary: [''],
            address: '',
            nearby: '',
            city: '',
            state: '',
            country: '',
            googleMapLink: ''
        });
    };

    const handleNumberOfDaysChange = (e) => {
        const numberOfDays = parseInt(e.target.value, 10);
        setEventDetails(prevState => ({
            ...prevState,
            numberOfDays,
            isEndDateRequired: numberOfDays > 1,
            endDate: numberOfDays > 1 ? prevState.endDate : null
        }));
    };

    const handleStartDateChange = (e) => {
        setEventDetails({ ...eventDetails, startDate: e.target.value });
    };

    const handleEndDateChange = (e) => {
        setEventDetails({ ...eventDetails, endDate: e.target.value });
    };

    const handleItineraryChange = (index, e) => {
        const newItinerary = [...eventDetails.itinerary];
        newItinerary[index] = e.target.value;
        setEventDetails({ ...eventDetails, itinerary: newItinerary });
    };

    const handleRemoveItinerary = (index) => {
        const newItinerary = eventDetails.itinerary.filter((_, i) => i !== index);
        setEventDetails({ ...eventDetails, itinerary: newItinerary });
    };

    const handleAddItinerary = () => {
        setEventDetails(prevState => ({
            ...prevState,
            itinerary: [...prevState.itinerary, '']
        }));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    };

    return (
        <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <Toast ref={toast} />
            <div className="flex justify-between text-sm">
                <Button
                    label={showForm ? "Back to List" : "Add Event"}
                    icon={showForm ? "pi pi-arrow-left" : "pi pi-plus"}
                    onClick={() => setShowForm(!showForm)}
                    className="p-button-primary"
                />
            </div>
            {showForm ? (
                <EventForm
                    eventDetails={eventDetails}
                    setEventDetails={setEventDetails}
                    handleAddEvent={handleAddEvent}
                    handleCancel={() => setShowForm(false)}
                    handleNumberOfDaysChange={handleNumberOfDaysChange}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                    handleItineraryChange={handleItineraryChange}
                    handleRemoveItinerary={handleRemoveItinerary}
                    handleAddItinerary={handleAddItinerary}
                    clearForm={clearForm}
                />
            ) : (
                events.length > 0 && <EventsList
                    events={events}
                    formatDate={formatDate}
                    formatPrice={formatPrice}
                />
            )}
        </div>
    );
};

export default EventModule;

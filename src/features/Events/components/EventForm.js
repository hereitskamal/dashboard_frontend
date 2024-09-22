import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { EventTypeDropdown, InclusionsDropdown, AllowedItemsDropdown, NotAllowedItemsDropdown } from '../../../utils/CustomDropdowns';
import { Divider } from 'primereact/divider';

const EventForm = ({
    eventDetails,
    setEventDetails,
    handleAddEvent,
    handleCancel,
    handleNumberOfDaysChange,
    handleStartDateChange,
    handleItineraryChange,
    handleRemoveItinerary,
    handleAddItinerary,
    clearForm
}) => (
    <div className="p-6 rounded-lg mt-6">
        <h2 className="text-2xl font-semibold mb-6">Add New Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Type */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <EventTypeDropdown
                    id="eventType"
                    value={eventDetails.eventType}
                    onChange={(e) => setEventDetails({ ...eventDetails, eventType: e.value })}
                    className="w-full"
                />
            </div>

            {/* Inclusions */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Inclusions</label>
                <InclusionsDropdown
                    id="inclusions"
                    value={eventDetails.inclusions}
                    onChange={(e) => setEventDetails({ ...eventDetails, inclusions: e.value })}
                    className="w-full"
                />
            </div>

            {/* Allowed Items */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed</label>
                <AllowedItemsDropdown
                    id="allowed"
                    value={eventDetails.allowed}
                    onChange={(e) => setEventDetails({ ...eventDetails, allowed: e.value })}
                    className="w-full"
                />
            </div>

            {/* Not Allowed Items */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Not Allowed</label>
                <NotAllowedItemsDropdown
                    id="notAllowed"
                    value={eventDetails.notAllowed}
                    onChange={(e) => setEventDetails({ ...eventDetails, notAllowed: e.value })}
                    className="w-full"
                />
            </div>

            {/* Pet Friendly */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet Friendly?</label>
                <Checkbox
                    type="checkbox"
                    checked={eventDetails.petFriendly}
                    onChange={(e) => setEventDetails({ ...eventDetails, petFriendly: e.target.checked })}
                    className="p-checkbox p-component"
                />
            </div>

            {/* Couple Friendly */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Couple Friendly?</label>
                <Checkbox
                    type="checkbox"
                    checked={eventDetails.coupleFriendly}
                    onChange={(e) => setEventDetails({ ...eventDetails, coupleFriendly: e.target.checked })}
                    className="p-checkbox p-component"
                />
            </div>

            {/* Indoor */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Indoor?</label>
                <Checkbox
                    type="checkbox"
                    checked={eventDetails.indoor}
                    onChange={(e) => setEventDetails({ ...eventDetails, indoor: e.target.checked })}
                    className="p-checkbox p-component"
                />
            </div>

            {/* Start Date */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <InputText
                    type="date"
                    value={eventDetails.startDate}
                    onChange={handleStartDateChange}
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* End Date */}
            {eventDetails.isEndDateRequired && (
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <InputText
                        type="date"
                        value={eventDetails.endDate}
                        onChange={(e) => setEventDetails({ ...eventDetails, endDate: e.target.value })}
                        className="w-full border-gray-300 rounded-lg p-2"
                    />
                </div>
            )}

            {/* Number of Days */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days</label>
                <InputText
                    type="number"
                    value={eventDetails.numberOfDays}
                    onChange={handleNumberOfDaysChange}
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Price */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <InputText
                    type="number"
                    value={eventDetails.price}
                    onChange={(e) => setEventDetails({ ...eventDetails, price: e.target.value })}
                    placeholder="Enter price"
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Description */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <InputText
                    type="text"
                    value={eventDetails.description}
                    onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                    placeholder="Enter description"
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Itinerary */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Itinerary</label>
                {eventDetails.itinerary.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <InputText
                            type="text"
                            value={item}
                            onChange={(e) => handleItineraryChange(index, e)}
                            placeholder="Enter itinerary item"
                            className="w-full border-gray-300 rounded-lg p-2 mr-2"
                        />
                        <Button
                            icon="pi pi-times"
                            onClick={() => handleRemoveItinerary(index)}
                            className="p-button-danger p-button-rounded"
                        />
                    </div>
                ))}
                <Button
                    label="Add Itinerary Item"
                    icon="pi pi-plus"
                    onClick={handleAddItinerary}
                    className="p-button-success mt-2"
                />
            </div>
            <Divider />
            {/* Address */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <InputText
                    type="text"
                    value={eventDetails.address}
                    onChange={(e) => setEventDetails({ ...eventDetails, address: e.target.value })}
                    placeholder="Enter event address"
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Nearby */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nearby</label>
                <InputText
                    type="text"
                    value={eventDetails.nearby}
                    onChange={(e) => setEventDetails({ ...eventDetails, nearby: e.target.value })}
                    placeholder="Enter nearby landmarks"
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* City */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <InputText
                    type="text"
                    value={eventDetails.city}
                    onChange={(e) => setEventDetails({ ...eventDetails, city: e.target.value })}
                    placeholder="Enter city"
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* State */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <InputText
                    type="text"
                    value={eventDetails.state}
                    onChange={(e) => setEventDetails({ ...eventDetails, state: e.target.value })}
                    placeholder="Enter state"
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Country */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <InputText
                    type="text"
                    value={eventDetails.country}
                    onChange={(e) => setEventDetails({ ...eventDetails, country: e.target.value })}
                    placeholder="Enter country"
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>

            {/* Google Maps Link */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Link</label>
                <InputText
                    type="text"
                    value={eventDetails.googleMapLink}
                    onChange={(e) => setEventDetails({ ...eventDetails, googleMapLink: e.target.value })}
                    placeholder="Enter Google Maps link"
                    className="w-full border-gray-300 rounded-lg p-2"
                />
            </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
            <Button
                label="Clear"
                icon="pi pi-refresh"
                onClick={clearForm}
                className="p-button-secondary"
            />
            <Button
                label="Add Event"
                icon="pi pi-check"
                onClick={handleAddEvent}
                className="p-button-success"
            />
            <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={handleCancel}
                className="p-button-danger"
            />
        </div>
    </div>
);

export default EventForm;

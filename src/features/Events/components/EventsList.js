// src/components/EventsList.js
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EventDetailModal from './EventDetailModal'; // Import the modal component

const EventsList = ({ events, formatDate, formatPrice }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleRowClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    return (
        <div className="p-6 rounded-lg mt-6">
            <h2 className="text-2xl font-semibold mb-6">Events List</h2>
            <DataTable
                value={events}
                className="p-datatable-striped"
                onRowClick={(e) => handleRowClick(e.data)}
            >
                <Column field="eventType" header="Event Type" />
                {/* <Column field="inclusions" header="Inclusions" />
                <Column field="allowed" header="Allowed" />
                <Column field="notAllowed" header="Not Allowed" />
                <Column field="petFriendly" header="Pet Friendly" body={(rowData) => (rowData.petFriendly ? 'Yes' : 'No')} /> */}
                <Column field="coupleFriendly" header="Couple Friendly" body={(rowData) => (rowData.coupleFriendly ? 'Yes' : 'No')} />
                <Column field="indoor" header="Indoor" body={(rowData) => (rowData.indoor ? 'Yes' : 'No')} />
                <Column field="startDate" header="Start Date" body={(rowData) => formatDate(rowData.startDate)} />
                <Column field="endDate" header="End Date" body={(rowData) => formatDate(rowData.endDate)} />
                <Column field="price" header="Price" body={(rowData) => formatPrice(rowData.price)} />
                {/* <Column field="address" header="Address" /> */}
                <Column field="googleMapLink" header="Google Maps Link" body={(rowData) => <a href={rowData.googleMapLink} target="_blank" rel="noopener noreferrer">View on Map</a>} />
            </DataTable>

            {showModal && (
                <EventDetailModal
                    event={selectedEvent}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default EventsList;

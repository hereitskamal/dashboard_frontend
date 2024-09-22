// src/components/EventDetailModal.js
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';

const EventDetailModal = ({ event, onClose }) => {
    if (!event) return null;

    return (
        <Dialog
            header="Event Details"
            visible={true}
            style={{ width: '90vw', maxWidth: '800px' }}
            onHide={onClose}
            footer={
                <div className="flex justify-end space-x-2">
                    <Button label="Close" icon="pi pi-times" onClick={onClose} className="p-button-secondary" />
                </div>
            }
            className="p-dialog p-component"
        >
            <Card className="p-card p-component">
                <div className="lg:flex">
                    {/* Image Section */}
                    <div className="lg:w-1/3">
                        <Image
                            src={event.image || '/default-image.jpg'}
                            alt="Event Image"
                            width="100%"
                            height="auto"
                            className="h-48 lg:h-auto"
                        />
                    </div>
                    {/* Content Section */}
                    <div className="lg:w-2/3 p-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.eventType}</h2>
                        <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                        <div className="flex items-center mb-4">
                            <svg className="fill-current text-gray-500 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            <p className="text-gray-600">Members only</p>
                        </div>
                        <div className="text-gray-800 font-bold text-lg mb-2">Event Date Range</div>
                        <p className="text-gray-600 text-base">From: {new Date(event.startDate).toLocaleDateString()} To: {new Date(event.endDate).toLocaleDateString()}</p>
                        <p className="text-gray-600 text-base mt-2">Price: ${event.price}</p>
                        <p className="text-gray-600 text-base mt-2">Address: {event.address}</p>
                        <div className="flex items-center mt-4">
                            <Image
                                src={event.creatorImage || '/default-avatar.png'}
                                alt="Avatar of Creator"
                                width="48"
                                height="48"
                                className="rounded-full mr-4"
                            />
                            <div className="text-sm">
                                <p className="text-gray-900 leading-none">Event Creator: {event.creatorName}</p>
                                <p className="text-gray-600">Date Added: {new Date(event.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Itinerary</h3>
                            <ul className="list-disc list-inside pl-4">
                                {event.itinerary.map((item, index) => (
                                    <li key={index} className="text-gray-700">{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Location</h3>
                            <a
                                href={event.googleMapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View on Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        </Dialog>
    );
};

export default EventDetailModal;

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../styles/RoomCard.css';

const RoomCard = ({ room }) => {
    console.log(room)
    return (
        <div className="room-card">
            {room.properties?.video_url?.med ? (
                <video
                    width="100%"
                    height="200"
                    controls
                    src={room.properties.video_url.med}
                    poster={room.images && room.images[0]}
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                room?.properties?.room_images?.map((img, index) => (
                    <LazyLoadImage
                        key={index}
                        src={img.image_urls[0]}
                        alt={room.name}
                        effect="blur"
                        className="room-image"
                    />
                ))
            )}

            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <p><strong>Price:</strong> ${room.price}</p>
        </div>
    );
};

export default RoomCard;

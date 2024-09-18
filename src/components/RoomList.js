import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import RoomCard from './RoomCard';
import '../styles/RoomList.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchMoreData();
    }, []);

    const fetchMoreData = async () => {
        try {
            const res = await axios.get('/data.json');

            const newRooms = res.data.rooms_by_serial_no[0].rooms.slice((page - 1) * 10, page * 10);

            setRooms([...rooms, ...newRooms]);

            if (newRooms.length === 0) {
                setHasMore(false);
            } else {
                setPage(page + 1);
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <InfiniteScroll
            dataLength={rooms.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>End of room list</p>}
        >
            <div className="room-list">
                {rooms.map((room, index) => (
                    <RoomCard key={index} room={room} />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default RoomList;

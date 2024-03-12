import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../../common/modal';
import { generateRandomRoomId, socket } from '../../../servics';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  flagForRoom: boolean
}

const MainHeader: React.FC<HeaderProps> = ({ flagForRoom }) => {
  const imageUrl = require('../../assets/hiteshilogo.png');
  const navigate = useNavigate();

  const [createUserData, setCreateUserData] = useState({
    roomId: "",
    roomName: ""
  });

  const [joinUserData, setJoinUserData] = useState({
    roomId: "",
    roomName: ""
  });

  const [joinedUser, setJoinedUser] = useState<boolean>(false);
  const [roomCreated, setRoomCreated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [joinShowModal, setjoinShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (flagForRoom == false) {
      let id = localStorage.getItem("roomID");
      console.log("localstorge id is ", id);
    }
    console.log('Effect is running');
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('success', (e) => {
      console.log("roomId:", e)
      localStorage.setItem("roomID", e.roomId);
    });

    socket.on('error', (e) => {
      console.log("error:", e)
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const onchangeHandle = (e: any) => {
    setJoinedUser(false);
    setCreateUserData((inputValue) => {
      return {
        ...inputValue, [e.target.name]: e.target.value
      };
    })
    setJoinUserData((inputValue) => {
      return {
        ...inputValue, [e.target.name]: e.target.value
      };
    })
  }

  const onCreateRoomClickHandle = useCallback(() => {
    console.log("Room create with", createUserData);
    socket.emit('createRoom', createUserData);
    setShowModal(false);
    setRoomCreated(true);
    localStorage.setItem("roomID", createUserData.roomId);
    navigate('/createroom');
  }, [createUserData])


  const onJoinRoomClickHandle = () => {
    console.log('Room Joined kjsdhfkdsafdsaj;l', joinUserData);
    socket.emit('joinRoom', joinUserData);
    setjoinShowModal(false);
    setJoinedUser(true);
    navigate('/createroom');
  }

  const createRoom = () => {
    setRoomCreated(false);
    setShowModal(true);
    const id = generateRandomRoomId();
    setCreateUserData(prevData => ({
      ...prevData,
      roomId: id,
    }));
  };

  const joinRoom = (e: any) => {
    setjoinShowModal(true);
  };

  return (
    <header className="bg-slate-50 flex items-center justify-between  h-[80px] border-b-2 border-gray-300">
      <div className="flex items-center pl-20">
        <img
          className="w-40 h-15"
          width="75"
          src={imageUrl}
          alt="Flipkart"
          title="Flipkart"
        />
      </div>
      {(roomCreated) ? <p>Your Roomid is: {createUserData.roomId}</p> : <span></span>}
      {(joinedUser) ? <p>User Joined: {joinUserData.roomId}</p> : <span></span>}
      {(flagForRoom == true) ? <div>
        <button
          className="bg-blue-500 text-white px-4 py-3 rounded-full mr-6"
          onClick={createRoom}>
          Create Room
        </button>
        <button
          className="bg-green-500 text-white px-4 py-3 rounded-full mr-6"
          onClick={joinRoom}>
          Join Room
        </button>
      </div> : <span></span>}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          config={{
            header: "Create your room",
            buttonName: "Create",
            onButtonClick: onCreateRoomClickHandle,
          }}>
          <div className="relative p-2 flex-auto w-80 ">
            <input
              type="text"
              name="roomName"
              required={true}
              onChange={(e) => onchangeHandle(e)}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your name"
            />
            <input
              type="text"
              name="roomId"
              disabled={true}
              value={createUserData.roomId}
              onChange={(e) => onchangeHandle(e)}
              className="w-full px-2 py-2 border border-gray-300 rounded"
              placeholder="Enter room no"
            />
          </div>
        </Modal>
      )}
      {joinShowModal && (
        <Modal
          showModal={joinShowModal}
          setShowModal={setjoinShowModal}
          config={{
            header: "Join room",
            buttonName: "Join",
            onButtonClick: onJoinRoomClickHandle,
          }}>
          <div className="relative p-2 flex-auto w-80 ">
            <input
              type="text"
              name='roomName'
              required={true}
              onChange={(e) => onchangeHandle(e)}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your name"
            />
            <input
              type="text"
              name='roomId'
              onChange={(e) => onchangeHandle(e)}
              className="w-full px-2 py-2 border border-gray-300 rounded"
              placeholder="Enter room id"
            />
          </div>
        </Modal>
      )}
    </header>
  );
};

export default MainHeader;

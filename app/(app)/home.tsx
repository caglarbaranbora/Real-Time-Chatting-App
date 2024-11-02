import { View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "@/components/ChatList";
import Loading from "@/components/Loading";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "@/firebaseConfig";

const Home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) getUsers();
  }, []);

  const getUsers = async () => {
    //fethc users
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };

  return (
    <View className=" flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex-1 items-center " style={{ top: hp(30) }}>
          <Loading size={hp(10)} />
        </View>
      )}
    </View>
  );
};

export default Home;

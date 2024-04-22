import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import createAxiosInstance from "@/axiosConfig";
import { useRouter } from "next/router";

// Define a type for a single working hour
type WorkingHour = {
  day: string;
  openTime: string;
  closeTime: string;
};

const WorkingHoursPage = () => {
    const router = useRouter();
    const axiosInstance = createAxiosInstance(router);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]); // Specify the type for workingHours state
  const fetchWorkingHours = useCallback( async() => {
    console.log(`=====><-======`)
    try {
        const session: any | Session = await getSession();

        const currentUser = session?.user;
        if (!session) {
            // Handle the case when the session is not available
            console.error("Session not found");
            return;
          }
        console.log(`===>${currentUser.id}`);
      const response = await axiosInstance.get(`/working-hours/${currentUser.id}`);
      setWorkingHours(response.data.workingHours);
    } catch (error) {
      console.error("Error fetching working hours:", error);
    }
  }, []);
  useEffect(() => {
    // Fetch working hours when the component mounts
    fetchWorkingHours();
  }, [fetchWorkingHours]);



  const handleUpdateWorkingHours = async () => {
    try {
        const session: any | Session = await getSession();
        const currentUser = session?.user;
        if (!session) {
            // Handle the case when the session is not available
            console.error("Session not found");
            return;
          }
        console.log(`===>${currentUser.id}`);
       // Replace with the actual user ID
      await axiosInstance.put(`/working-hours/${currentUser.id}`, { workingHours });
      alert("Working hours updated successfully");
    } catch (error) {
      console.error("Error updating working hours:", error);
    }
  };

  const handleInputChange = (day: string, field: string, value: string) => {
    const updatedWorkingHours = workingHours.map(item => {
      if (item.day === day) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setWorkingHours(updatedWorkingHours);
  };

  return (
    <div>
      <h1>Working Hours</h1>
      {workingHours.map((item, index) => (
        <div key={index}>
          <p>{item.day}</p>
          <input
            type="text"
            value={item.openTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(item.day, "openTime", e.target.value)}
          />
          <input
            type="text"
            value={item.closeTime}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(item.day, "closeTime", e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleUpdateWorkingHours}>Update Working Hours</button>
    </div>
  );
};

export default WorkingHoursPage;

import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import createAxiosInstance from "@/axiosConfig";
import { Nav } from "@/components/menuComponents/nav";
import Sidebar from "@/components/sidebar";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { Paper, TableRow, TableBody, Table } from "@material-ui/core";

// Define a type for a single working hour
type WorkingHour = {
  day: string;
  openTime: string;
  closeTime: string;
};

const WorkingHoursPage = () => {
  const router = useRouter();
  const axiosInstance = createAxiosInstance(router);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);

  const fetchWorkingHours = useCallback(async () => {
    try {
      const session: any | Session = await getSession();
      const currentUser = session?.user;
      if (!session) {
        console.error("Session not found");
        return;
      }
      const response = await axiosInstance.get(
        `/working-hours/${currentUser.id}`
      );
      setWorkingHours(response.data.workingHours);
    } catch (error) {
      console.error("Error fetching working hours:", error);
    }
  }, []);

  useEffect(() => {
    fetchWorkingHours();
  }, [fetchWorkingHours]);

  const handleUpdateWorkingHours = async () => {
    try {
      const session: any | Session = await getSession();
      const currentUser = session?.user;
      if (!session) {
        console.error("Session not found");
        return;
      }
      await axiosInstance.put(`/working-hours/${currentUser.id}`, {
        workingHours,
      });
      alert("Working hours updated successfully");
    } catch (error) {
      console.error("Error updating working hours:", error);
    }
  };

  const handleInputChange = (day: string, field: string, value: string) => {
    const updatedWorkingHours = workingHours.map((item) => {
      if (item.day === day) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setWorkingHours(updatedWorkingHours);
  };

  const convertTo24HourFormat = (timeString: string): string => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }
    return `${hours}:${minutes}`;
  };

  return (
    <div className="bg-gray-100">
      <Nav text="Working-Hours" />
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-[100%] h-screen flex flex-col items-center justify-center">
          <TableContainer
            component={Paper}
            style={{ width: "90%", height: "85%", borderRadius: "20px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h1 className="text-black">DAY</h1>
                  </TableCell>
                  <TableCell>
                    <h2 className="text-black flex items-center justify-center">
                      Opening Time
                    </h2>
                  </TableCell>
                  <TableCell>
                    <h2 className="text-black flex items-center justify-center ">
                      Closing Time
                    </h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workingHours.map((item, index) => (
                  <TableRow key={index} >
                    <TableCell component="th" scope="row" style={{border: "none"}}>
                      <h3 className="font-sans">{item.day}</h3>
                    </TableCell>
                    <TableCell align="right" style={{border: "none"}}>
                      <input
                        type="time"
                        value={convertTo24HourFormat(item.openTime)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            item.day,
                            "openTime",
                            e.target.value
                          )
                        }
                        className="w-[80%]"
                      />
                    </TableCell>
                    <TableCell align="right" style={{border: "none"}}>
                      <input
  
                        type="time"
                        value={convertTo24HourFormat(item.closeTime)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            item.day,
                            "closeTime",
                            e.target.value
                          )
                        }
                        className="w-[80%]"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <button
            onClick={handleUpdateWorkingHours}
            className="bg-[#DD2F6E] text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 mt-4 cursor-pointer"
          >
            Update Working Hours
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursPage;

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

export default function Attendance() {

  const [logs, setLogs] =
    useState([]);

  const fetchLogs = async () => {

    try {

      const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/attendance`
);
      

      setLogs(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchLogs();

  }, []);

  return (

    <div className="p-8 text-white">

      <h1 className="text-5xl font-bold mb-8">
        Attendance Logs
      </h1>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="text-left p-5">
                Student
              </th>

              <th className="text-left p-5">
                Time
              </th>

              <th className="text-left p-5">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {logs.map((log, index) => (

              <tr
                key={index}
                className="border-t border-zinc-800"
              >

                <td className="p-5">
                  {log.name}
                </td>

                <td className="p-5">
                  {log.time}
                </td>

                <td className="p-5">

                  <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">

                    {log.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
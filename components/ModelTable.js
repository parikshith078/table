import { useState, useEffect } from "react";

import Link from "next/link";

const VALUES = {
  CSE3A: [
    ["EC105L", "CS207tut", "MA201tut", "MA201L", "t"],
    ["EC105L", "CS202l", "MA201L", "CS202L"],
    ["CS202L", "CS202l", "L", "L"],
    ["CS201L", "CS207l/EC105l", "CS207L", "CS202tut"],
    ["CS201L", "CS207l/EC105l", "CS207L", "HS206L"],
  ],
  CSE3B: [
    ["MA201L", "MA201tut", "CS202tut", "CS202L", "t"],
    ["EC105L", "CS207l/EC105l", "EC105L", "L"],
    ["MA201L", "CS207l/EC105l", "HS206L", "L"],
    ["HS206L", "CS202l", "CS202L", "L"],
    ["CS201L", "CS202l", "CS201L", "t"],
  ],
  CSE5A: [
    ["CS304tut", "CS304L", "CS303L", "ElectiveTut"],
    ["CS303l", "ElectiveL", "CS309L", "CS303tut"],
    ["L", "BasketL", "CS309L", "BasketTut"],
    ["CS309tut", "BasketL", "CS304L", "L"],
    ["CS303l", "ElectiveL", "CS303L", "t"],
  ],
  CSE5B: [
    ["CS303l", "L", "CS304L", "ElectiveTut"],
    ["CS304tut", "ElectiveL", "CS303L", "CS309tut"],
    ["CS304L", "BasketL", "CS303L", "BasketTut"],
    ["CS303l", "BasketL", "CS309L", "L"],
    ["t", "ElectiveL", "CS309L", "CS303tut"],
  ],
};

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THRUSDAY", "FRIDAY"];

export default function ModelTable({ userId }) {
  const [fetchValue, setFetch] = useState(VALUES);

  const [loading, setLoading] = useState(true);

  async function fetchData() {
    await fetch("/api/data/" + userId)
      .then((res) =>
        res.json().then((data) => {
          // console.log("working");
          console.log("data", data);

          setFetch({
            CSE3A: data["CSE3A"],
            CSE3B: data["CSE3B"],
            CSE5A: data["CSE5A"],
            CSE5B: data["CSE5B"],
            CSESEM7: data["CSESEM7"],
            DSSEM3: data["DSSEM3"],
            DDSEM5: data["DDSEM5"],
            ECESEC3: data["ECESEC3"],
            ECESEM5: data["ECESEM5"],
            ECESEM7: data["ECESEM7"],
          });
          // console.log(fetchValue);
          setLoading(false);
        })
      )
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <h1 className="text-center text-2xl py-24">loading....</h1>
      ) : (
        <div>
          <TableTemptlet
            currentSection={fetchValue.CSE3A}
            heading="SEM 3 CSE Section A:"
          />
          <TableTemptlet
            currentSection={fetchValue.CSE3B}
            heading="SEM 3 CSE Section B:"
          />
          <TableTemptlet
            currentSection={fetchValue.DSSEM3}
            heading="SEM 3 DSA:"
          />
          <TableTemptlet
            currentSection={fetchValue.ECESEC3}
            heading="SEM 3 ECE:"
          />
          <TableTemptlet
            currentSection={fetchValue.CSE5A}
            heading="SEM 5 CSE Section A:"
          />
          <TableTemptlet
            currentSection={fetchValue.CSE5B}
            heading="SEM 5 CSE Section B:"
          />
          <TableTemptlet
            currentSection={fetchValue.DDSEM5}
            heading="SEM 5 DSA:"
          />

          <TableTemptlet
            currentSection={fetchValue.ECESEM5}
            heading="SEM 5 ECE:"
          />
          <TableTemptlet
            currentSection={fetchValue.CSESEM7}
            heading="SEM 7 CSE:"
          />

          <TableTemptlet
            currentSection={fetchValue.ECESEM7}
            heading="SEM 7 ECE:"
          />
          <Link href="/sections">
            <div className="flex justify-end ">
              <button className="btn btn-square btn-secondary mr-2 w-24  bottom-10 fixed">
                Go Back
              </button>
            </div>
          </Link>
          <Link href="/teacher-table">
            <div className="flex justify-end ">
              <button className="btn btn-square btn-secondary mr-2 w-24  bottom-28 fixed">
                Teachers timetable
              </button>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

const TableTemptlet = ({ currentSection, heading }) => {
  return (
    <div className="card w-[70%]  mx-auto my-4 shadow-lg">
      <h1 className="text-center text-2xl mt-2 text-secondary">{heading}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-[95%] mx-auto my-4">
          <thead className="z-0">
            <tr>
              <th>DAY | TIME</th>
              <th>9 - 10:30</th>
              <th>10:45 - 12:45</th>
              <th>1:45 - 3:15</th>
              <th>3:30: - 4:30</th>
            </tr>
          </thead>
          <tbody>
            {currentSection.map((val, ind) => {
              console.log("valtop", val);
              return (
                <tr key={ind}>
                  <th className="text-xs">{DAYS[ind]}</th>

                  {val.map((lec, i) => {
                    console.log("lec", lec);
                    return <th key={i}>{lec}</th>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

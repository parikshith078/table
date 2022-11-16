import { useState, useEffect } from "react";

import Link from "next/link";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THRUSDAY", "FRIDAY"];

export default function ModelTable({ userId }) {
  const [fetchValue, setFetch] = useState();

  const [loading, setLoading] = useState(true);

  async function fetchData() {
    await fetch("/api/data/" + userId)
      .then((res) =>
        res.json().then((data) => {
          // console.log("working");
          console.log("data", data["teachers"]);

          setFetch({
            ...data["teachers"],
          });

          // console.log(fetchValue);
          setLoading(false);
        })
      )
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchData();
    console.log("vallus", fetchValue);
  }, []);

  return (
    <>
      {loading ? (
        <h1 className="text-center text-2xl py-24">loading....</h1>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center p-10">
            Teachers TimeTable
          </h1>

          {Object.entries(fetchValue).map(([key, value]) => (
            <TableTemptlet
              key={key}
              currentSection={value}
              heading={key}
            ></TableTemptlet>
          ))}

          <Link href="/sections">
            <div className="flex justify-end ">
              <button className="btn btn-square btn-secondary mr-2 w-24  bottom-10 fixed">
                Go Back
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
              <th>For SEM 7:</th>
              <th>8:30 - 10</th>
              <th>10:15 - 11:45</th>
              <th>11:45 - 1:15</th>
              <th>2:15 - 3:15</th>
              <th>3:15 - 4:45</th>
              <th>4:45 - 5:45</th>
            </tr>
            <tr>
              <th>For SEM 5:</th>
              <th>8:30 - 10</th>
              <th>10:15 - 11:45</th>
              <th>11:45 - 12:15</th>
              <th>1:45 - 3:15</th>
              <th>3:15 - 4:15</th>
              <th></th>
            </tr>
            <tr>
              <th>For SEM 3:</th>
              <th>9 - 10:30</th>
              <th>10:45 - 11:45</th>
              <th>11:45 - 12:45</th>
              <th>1:45 - 3:15</th>
              <th>3:15: - 4:15</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentSection.map((val, ind) => {
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

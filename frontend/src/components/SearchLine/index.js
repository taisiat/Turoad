import { RiSearch2Line } from "react-icons/ri";
import "./SearchLine.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchLine = ({
  searchPageFromDate,
  setSearchPageFromDate,
  searchPageUntilDate,
  setSearchPageUntilDate,
  searchPageWhere,
  setSearchPageWhere,
}) => {
  const [where, setWhere] = useState("");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (searchPageFromDate) {
      setFrom(searchPageFromDate);
      // localStorage.removeItem("fromDate");
      //   localStorage.clear();
    }
  }, [searchPageFromDate]);

  useEffect(() => {
    if (searchPageUntilDate) {
      setUntil(searchPageUntilDate);
      // localStorage.removeItem("fromDate");
      //   localStorage.clear();
    }
  }, [searchPageUntilDate]);

  useEffect(() => {
    if (searchPageWhere) {
      setWhere(searchPageWhere);
      // localStorage.removeItem("fromDate");
      //   localStorage.clear();
    }
  }, [searchPageWhere]);

  // const handleSearchClick = () => {
  //   localStorage.setItem("fromDate", JSON.stringify(from));
  //   localStorage.setItem("untilDate", JSON.stringify(until));
  //   localStorage.setItem("where", JSON.stringify(where));
  //   history.push("/cars/");
  // };

  // const handleWhereInput = (e) => {
  //   setWhere(e.target.value);
  //   handleSearchClick();
  // };

  // const handleEndDateInput = (e) => {
  //   setUntil(e.target.value);
  //   handleSearchClick();
  // };

  // const handleStartDateInput = (e) => {
  //   setFrom(e.target.value);
  //   if (until === "") {
  //     const nextDay = new Date(e.target.value);
  //     nextDay.setDate(nextDay.getDate() + 1);
  //     setUntil(nextDay.toISOString().slice(0, 10));
  //   }
  //   handleSearchClick();
  // };
  const handleSearchClick = () => {
    // console.log("hi from handleSearchClick start");

    if (location.pathname === "/cars/") {
      console.log("hi from handleSearchClick");
      setSearchPageFromDate(from);
      console.log("fromDate", searchPageFromDate);
      setSearchPageUntilDate(until);
      console.log("untilDate", searchPageUntilDate);
      setSearchPageWhere(where);
      console.log("where", searchPageWhere);
    } else {
      localStorage.setItem("fromDate", from);
      localStorage.setItem("untilDate", until);
      localStorage.setItem("where", where);
      history.push("/cars/");
    }
  };

  const handleDateInput = (e) => {
    setFrom(e.target.value);
    if (until === "") {
      const nextDay = new Date(e.target.value);
      nextDay.setDate(nextDay.getDate() + 1);
      setUntil(nextDay.toISOString().slice(0, 10));
    }
  };

  return (
    <div id="search-line-container">
      <div id="where-container-line">
        <p>Where</p>
        <input
          className="search-input-line"
          id="where-input-searchline"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        ></input>
      </div>
      <div id="from-container-line">
        <p>From</p>
        <div id="from-input-container-line">
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="search-input-line search-date"
            value={from}
            onChange={handleDateInput}
          ></input>
          {/* <input type="time" className="search-input-line"></input> */}
        </div>
      </div>
      <div>
        <div id="until-container-line">
          <p>Until</p>
          <div id="until-input-container-line">
            <input
              type="date"
              min={from}
              // disabled={until < from}
              // className="search-input-line search-date"
              className={`search-input-line search-date${
                until < from ? " date-input-error" : ""
              }`}
              value={until}
              // value={until}
              onChange={(e) => setUntil(e.target.value)}
            ></input>
            {/* <input type="time" className="search-input-line"></input> */}
          </div>
        </div>
        {/* {until < from && (
          <p id="search-line-end-date-error">
            Trip end date must be after start date
          </p>
        )} */}
      </div>
      {until < from && (
        <div id="search-button-container-line-inactive">
          <RiSearch2Line id="search-icon" className="search-line-button" />
        </div>
      )}
      {until >= from && (
        <div id="search-button-container-line" onClick={handleSearchClick}>
          <RiSearch2Line id="search-icon" className="search-line-button" />
        </div>
      )}
    </div>
  );
};

export default SearchLine;

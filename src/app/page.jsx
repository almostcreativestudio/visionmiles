"use client";
import React, { useEffect, useState } from "react";
import numeral from "numeral";

const Home = () => {
  const [distanceType, setDistanceType] = useState("kilometer");
  const [numOfDistance, setNumOfDistance] = useState(0);
  const [costPerDistance, setCostPerDistance] = useState(null);
  const [packageType, setPackageType] = useState(0);
  const [packageName, setPackageName] = useState(null);
  const [rowWidth, setRowWidth] = useState(0);
  const [rowLength, setRowLength] = useState(0);
  const [rowDensity, setRowDensity] = useState(0);
  const [estRowPerWeek, setEstRowPerWeek] = useState(0);
  const [estAcregePerWeek, setEstAcregePerWeek] = useState(0);
  const [estHectaresPerWeek, setEstHectaresPerWeek] = useState(0);
  const [visionMilesTm, setVisionMilesTm] = useState(0);
  const [total, setTotal] = useState(0);

  const [errors, setErrors] = useState({
    numOfDistance: "",
    rowLength: "",
    rowWidth: "",
    rowDensity: "",
    packageType: "",
  });
  const resetForm = () => {
    setNumOfDistance(0);
    setCostPerDistance(null);
    setPackageName(null);
    setPackageType(0);
    setRowWidth(0);
    setRowLength(0);
    setRowDensity(0);
    setEstRowPerWeek(0);
    setEstAcregePerWeek(0);
    setEstHectaresPerWeek(0);
    setVisionMilesTm(0);
    setTotal(0);
  };
  const handleDistanceType = (e) => {
    const newDistanceType = e.target.value;

    if (newDistanceType !== distanceType) {
      setDistanceType(newDistanceType);
      resetForm();
    }
  };
  const handlePackageType = (e) => {
    setPackageName(e);
    if (e === "startter") {
      setPackageType(8);
    } else if (e === "v360") {
      setPackageType(24);
    } else if (e === "vyplus") {
      setPackageType(16);
    } else if (e === "vmanager") {
      setPackageType(12);
    }
  };

  useEffect(() => {
    if (distanceType === "kilometer") {
      if (numOfDistance >= 160 && numOfDistance <= 299) {
        setCostPerDistance(51);
      } else if (numOfDistance >= 300 && numOfDistance <= 649) {
        setCostPerDistance(41);
      } else if (numOfDistance >= 650 && numOfDistance <= 999) {
        setCostPerDistance(36);
      } else if (numOfDistance >= 1000 && numOfDistance <= 1599) {
        setCostPerDistance(33);
      } else if (numOfDistance >= 1600 && numOfDistance <= 2999) {
        setCostPerDistance(30);
      } else if (numOfDistance >= 3000 && numOfDistance <= 7999) {
        setCostPerDistance(26);
      } else if (numOfDistance >= 8000) {
        setCostPerDistance(22);
      } else {
        setCostPerDistance(0);
      }
    } else {
      if (numOfDistance >= 100 && numOfDistance <= 200) {
        setCostPerDistance(37);
      } else if (numOfDistance >= 201 && numOfDistance <= 400) {
        setCostPerDistance(30);
      } else if (numOfDistance >= 401 && numOfDistance <= 600) {
        setCostPerDistance(26);
      } else if (numOfDistance >= 601 && numOfDistance <= 999) {
        setCostPerDistance(24);
      } else if (numOfDistance >= 1000 && numOfDistance <= 1999) {
        setCostPerDistance(22);
      } else if (numOfDistance >= 2000 && numOfDistance <= 4999) {
        setCostPerDistance(19);
      } else if (numOfDistance >= 5000) {
        setCostPerDistance(15);
      } else {
        setCostPerDistance(0);
      }
    }
  }, [distanceType, numOfDistance]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate numOfDistance
    if (!numOfDistance || isNaN(numOfDistance)) {
      newErrors.numOfDistance = "Please enter a valid number";
      valid = false;
    } else {
      if (distanceType === "kilometer" && numOfDistance < 160) {
        newErrors.numOfDistance = "Please enter a minimum value of 160";
        valid = false;
      } else if (distanceType === "miles" && numOfDistance < 100) {
        newErrors.numOfDistance = "Please enter a minimum value of 100";
        valid = false;
      } else {
        newErrors.numOfDistance = "";
      }
    }

    // Validate rowLength
    if (!rowLength || isNaN(rowLength)) {
      newErrors.rowLength = "Please enter a valid number";
      valid = false;
    } else {
      newErrors.rowLength = "";
    }

    // Validate rowWidth
    if (!rowWidth || isNaN(rowWidth)) {
      newErrors.rowWidth = "Please enter a valid number";
      valid = false;
    } else {
      newErrors.rowWidth = "";
    }

    // Validate rowDensity
    if (!rowDensity || isNaN(rowDensity)) {
      newErrors.rowDensity = "Please select a row density";
      valid = false;
    } else {
      newErrors.rowDensity = "";
    }

    // Validate packageType
    if (!packageType || isNaN(packageType)) {
      newErrors.packageType = "Please select a package";
      valid = false;
    } else {
      newErrors.packageType = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (distanceType === "kilometer") {
      let rowCovered = (numOfDistance * 1000) / rowLength;
      let estRowPerWeek = rowCovered / packageType;
      let visionMilesTm = numOfDistance * costPerDistance;

      let onboarding = 2000;
      let hardware = 5000;
      let total = visionMilesTm + onboarding + hardware;

      let seasonalAcreageCoverage =
        (rowLength * rowWidth * rowDensity * rowCovered) / 4046.86;

      let estAcregePerWeek = seasonalAcreageCoverage / packageType;
      let estHectaresPerWeek = estAcregePerWeek / 2.47;

      setEstRowPerWeek(estRowPerWeek);
      setEstAcregePerWeek(estAcregePerWeek);
      setEstHectaresPerWeek(estHectaresPerWeek);
      setVisionMilesTm(visionMilesTm);
      setTotal(total);
    } else {
      let rowCovered = (numOfDistance * 5280) / rowLength;
      let estRowPerWeek = rowCovered / packageType;
      let visionMilesTm = numOfDistance * costPerDistance;

      let onboarding = 2000;
      let hardware = 5000;
      let total = visionMilesTm + onboarding + hardware;

      let seasonalAcreageCoverage =
        (rowLength * rowWidth * rowDensity * rowCovered) / 43560;

      let estAcregePerWeek = seasonalAcreageCoverage / packageType;

      setEstRowPerWeek(estRowPerWeek);
      setEstAcregePerWeek(estAcregePerWeek);

      setVisionMilesTm(visionMilesTm);
      setTotal(total);
    }
  };

  const fomatNum = (num) => {
    const n = Math.round(num);
    return numeral(n).format("0,0");
  };

  return (
    <>
      <div className="bg-gray-100 py-16 h-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-center text-gray-900 font-semibold pb-10">
            Vision Miles™ Calculator
          </h1>
          <h2 className="text-2xl text-center font-semibold">Our flexible pricing model lets you focus on the areas of your orchard you care most about.</h2>
          <br></br>
          <p className="block font-medium leading-6 text-gray-900">Configure your XV3 package based on your farm’s needs. With options that tailor the system to your tractor and ATV, and flexibility to purchase based on Vision MilesTM or acres, you can align your data collection costs with your farm’s needs.</p>
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-10 rounded-xl shadow-mdb grid grid-cols-1 gap-6 shadow-md">
              <div>
                <label className="block font-medium leading-6 text-gray-900">
                  Select KM/miles
                </label>
                <select
                  value={distanceType}
                  onChange={(e) => handleDistanceType(e)}
                  name="distanceType"
                  id="location"
                  className="mt-2 block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="kilometer">Kilometers</option>
                  <option value="miles">Miles</option>
                </select>
              </div>

              <h2 className="text-2xl font-semibold">Farm information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium leading-6 text-gray-900">
                    Average row length{" "}
                    {distanceType === "kilometer" ? "(m)" : "(ft)"}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="rowLength"
                      className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={rowLength}
                      onChange={(e) => setRowLength(e.target.value)}
                    />
                  </div>
                  {errors.rowLength && (
                    <p className="text-red-500 text-sm">{errors.rowLength}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium leading-6 text-gray-900">
                    Average row width{" "}
                    {distanceType === "kilometer" ? "(m)" : "(ft)"}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="rowWidth"
                      className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={rowWidth}
                      onChange={(e) => setRowWidth(e.target.value)}
                    />
                  </div>
                  {errors.rowWidth && (
                    <p className="text-red-500 text-sm">{errors.rowWidth}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block font-medium leading-6 text-gray-900">
                  Coverage (for example, 3 is every 3rd row)
                </label>
                <div className="mt-2">
                  <select
                    value={rowDensity}
                    onChange={(e) => setRowDensity(e.target.value)}
                    name="rowDensity"
                    id="location"
                    className="mt-2 block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Select Row Density</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  {errors.rowDensity && (
                    <p className="text-red-500 text-sm">{errors.rowDensity}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium leading-6 text-gray-900">
                    Select your season to estimate acres per week scanned to determine pricing
                  </label>
                  <select
                    value={packageName}
                    onChange={(e) => handlePackageType(e.target.value)}
                    name="distanceType"
                    id="location"
                    className="mt-2 block w-full rounded-md border-0 py-3 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Select Season</option>
                    <option value="vmanager">Half Season - Vivid Manager</option>
                    <option value="v360">Full Season - Vivid 360 Package</option>
                  </select>
                  {errors.packageType && (
                    <p className="text-red-500 text-sm">{errors.packageType}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium leading-6 text-gray-900">
                    Weeks of coverage
                  </label>
                  <div className="mt-2">
                    <input
                      // disabled
                      type="text"
                      name="weeks"
                      className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium leading-6 text-gray-900">
                    {distanceType === "kilometer"
                      ? " Number of Kilometers"
                      : " Number of Miles"}
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="numOfDistance"
                      className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder=""
                      value={numOfDistance}
                      onChange={(e) => setNumOfDistance(e.target.value)}
                    />
                  </div>
                  {errors.numOfDistance && (
                    <p className="text-red-500 text-sm">
                      {errors.numOfDistance}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium leading-6 text-gray-900">
                    {distanceType === "kilometer"
                      ? "Cost per Kilometers"
                      : "Cost per Miles"}
                  </label>
                  <div className="mt-2">
                    {/* <input
                    name="costPerDistance"
                    className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="$37"
                    disabled
                    value={costPerDistance}
                  /> */}
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name="costPerDistance"
                        id="price"
                        className="block w-full rounded-md border-0 py-3 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={costPerDistance}
                        disabled
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="price-currency"
                        >
                          {distanceType === "kilometer"
                      ? "CAD"
                      : "USD"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="rounded-md bg-indigo-600 py-3 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Calculate My Distance & Pricing
              </button>

              <div className=" space-y-2">
                {/* <h5 className="text-2xl font-light">
                Estimated area per week:{" "}
                <span className=" font-semibold">68</span>{" "}
              </h5> */}
                <h5 className="text-2xl font-light">
                  Estimated rows/week :{" "}
                  <span className="font-semibold">
                    {estRowPerWeek ? fomatNum(estRowPerWeek) : 0}
                  </span>{" "}
                </h5>
                <h5 className="text-2xl font-light">
                  Estimated acreage/week :{" "}
                  <span className=" font-semibold">
                    {estAcregePerWeek ? fomatNum(estAcregePerWeek) : 0}
                  </span>{" "}
                </h5>
                {distanceType === "kilometer" && (
                  <h5 className="text-2xl font-light">
                    Estimated hectares/week :{" "}
                    <span className=" font-semibold">
                      {estHectaresPerWeek ? fomatNum(estHectaresPerWeek) : 0}
                    </span>{" "}
                  </h5>
                )}

                <h5 className="text-2xl font-light">
                  Vision Miles™ :{" "}
                  <span className="font-semibold">
                    ${fomatNum(visionMilesTm)}
                  </span>{" "}
                </h5>
                <h5 className="text-2xl font-light">
                  Estimated mapping and onboarding:{" "}
                  <span className="font-semibold">$2,000</span>{" "}
                </h5>
                <h5 className="text-2xl font-light">
                  XV3 hardware : <span className="font-semibold">$5,000</span>{" "}
                </h5>
                <h5 className="text-2xl font-light">
                  Total package with XV3 hardware :{" "}
                  <span className="font-semibold">${fomatNum(total)}</span>
                </h5>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;

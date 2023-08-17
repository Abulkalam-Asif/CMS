import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "../components";
import { useDispatch } from "react-redux";
import { showAlert } from "../store/slices/alertSlice";

// props
// data - an array of objects to be displayed in the table
// keysToInclude - an array of arrays, each having two values, the original name of field such as "rollNo" and that name in a displayable format such as "Roll No." i.e. [["rollNo"], ["Roll No."], ...]
// noData - string or JSX to display if there is no data to display
// excludeSort - array of fields with no sort button to display

const Table = (props) => {
  const {
    data,
    keysToInclude,
    noData,
    excludeSort,
    deleteDataMutation,
    deleteButtonName,
    refetchData,
  } = props;

  const [dataToDisplay, setDataToDisplay] = useState(null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const dispatch = useDispatch();

  useEffect(() => {
    setDataToDisplay(data);
  }, [data]);

  const sortHandler = (e) => {
    const label = e.currentTarget?.name;
    const isAscending = sortDirection === "ascending";
    const sortedData = [...dataToDisplay].sort((a, b) => {
      const aValue = a[label];
      const bValue = b[label];

      // Check if the values are numeric
      const isNumeric =
        !isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue));

      if (isNumeric) {
        if (isAscending) {
          return aValue - bValue; // Ascending numerical sort
        } else {
          return bValue - aValue; // Descending numerical sort
        }
      } else {
        if (isAscending) {
          return aValue?.toString().localeCompare(bValue);
        } else {
          return bValue?.toString().localeCompare(aValue);
        }
      }
    });

    setDataToDisplay(sortedData);
    setSortDirection(isAscending ? "descending" : "ascending");
  };

  const deleteHandler = async (e) => {
    const rollNo = e?.target?.name;
    const { data: mutationData, error: mutationError } =
      await deleteDataMutation.caller(rollNo);
    if (mutationError) {
      dispatch(
        showAlert({ type: "error", message: mutationError?.data?.message })
      );
    } else {
      dispatch(showAlert({ type: "success", message: mutationData?.message }));
      // When an item has been deleted, refetch the update data
      await refetchData();
    }
  };

  return deleteDataMutation?.isLoading ? (
    <>
      <Spinner type="centralizedSpinner" />
    </>
  ) : (
    <>
      {dataToDisplay?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-left text-gray-500">
            <thead className="text-sm text-white uppercase bg-pink-700">
              <tr>
                {keysToInclude?.map((keyData, index) => {
                  const [key, label] = keyData;
                  // Check if the current key is in the excludeSort array, if not, sort button is not added for that key
                  const isExcludedFromSort = excludeSort?.includes(key);
                  return (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-4 whitespace-nowrap">
                      {label}
                      {!isExcludedFromSort && (
                        <button
                          name={key}
                          onClick={sortHandler}
                          className="px-2 ml-1 rounded transition-colors duration-200 hocus:bg-white hocus:text-pink-700">
                          <FontAwesomeIcon icon={faSort} />
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Displays all the data items */}
              {dataToDisplay?.map((dataItem, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-200"
                    } border-b`}>
                    {/* Displays all the keys/fields */}
                    {keysToInclude?.map((key) =>
                      dataItem[key[0]] ? (
                        <td key={key[0]} className="px-6 py-4">
                          {dataItem[key[0]]}
                        </td>
                      ) : (
                        <td key={key[0]} className="px-4 py-4">
                          <Button
                            content="Delete"
                            onClick={deleteHandler}
                            customAttributes={{
                              name: dataItem[deleteButtonName],
                            }}
                          />
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-12 text-center sm:flex sm:flex-col sm:gap-y-2">{noData}</div>
      )}
    </>
  );
};

export default Table;

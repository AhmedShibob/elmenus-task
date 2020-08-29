import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./components/User";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [pages, setPages] = useState({});
  const [page, setPage] = useState(1);

  const getUsersData = () => {
    const url = `https://reqres.in/api/users?page=${page}`;
    console.log(url);

    axios
      .get(url)
      .then((data) => {
        console.log(data.data);
        setUsersData(data.data.data);
        setPages(data.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextPage = (page) => {
    setPage(page);
    console.log(page);
  };

  useEffect(
    () => {
      getUsersData();
    },
    // eslint-disable-next-line
    [page]
  );

  return (
    <div className="App box-border bg-gray-300 min-h-screen">
      <div className="container mx-auto py-12 rounded ">
        <div>
          <div>
            <nav className="bg-gray-800 rounded-t">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8"
                        src="https://www.elmenus.com/public/img/logo-landing.png"
                        alt="Workflow logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <main className="bg-white shadow rounded">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">
                  Users
                </h1>

                <button
                  onClick={() => {
                    document.getElementById("myModal").showModal();
                  }}
                  className=" flex items-center justify-center px-8 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  <strong> + </strong> New User
                </button>
              </div>

              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {loader ? (
                  <div>
                    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                      <span
                        className="text-gray-800 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
                        style={{ top: "50%" }}
                      >
                        <i className="fas fa-circle-notch fa-spin fa-5x" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  User
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {usersData.map((user) => (
                                <User key={user.id} user={user} />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => nextPage(pages.page - 1)}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => nextPage(pages.page + 1)}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm leading-5 text-gray-700">
                      Showing
                      <span className="font-medium">
                        {(
                          pages.page * pages.per_page -
                          (pages.per_page - 1)
                        ).toString()}
                      </span>
                      to
                      <span className="font-medium">
                        {(pages.page * pages.per_page).toString()}
                      </span>
                      of
                      <span className="font-medium">{pages.total}</span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex shadow-sm">
                      <button
                        onClick={() => nextPage(pages.page - 1)}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                        aria-label="Previous"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {[...Array(pages.total_pages)].map((e, i) => (
                        <button
                          key={i}
                          onClick={() => nextPage(i + 1)}
                          className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                        aria-label="Next"
                        onClick={() => nextPage(pages.page + 1)}
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div>
        <dialog
          id="myModal"
          className="h-auto w-11/12 md:w-1/2 p-5  bg-white rounded-md "
        >
          <div className="flex flex-col w-full h-auto ">
            {/* Header */}
            <div className="flex w-full h-auto justify-center items-center">
              <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                Add New User
              </div>
              <div
                onClick={() => {
                  document.getElementById("myModal").close();
                }}
                className="flex w-1/12 h-auto justify-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x"
                >
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </div>
            </div>

            {/* Modal Content*/}
            <div className="flex w-full h-auto py-10 px-2 justify-center items-center rounded text-center text-gray-500">
              <div class="max-w-sm mx-auto px-6">
                <div class="relative flex flex-wrap">
                  <div class="w-full relative">
                    <div class="md:mt-6">
                      <form class="mt-8">
                        <div class="mx-auto max-w-lg ">
                          <div class="py-1">
                            <p class="px-1 text-sm text-gray-600 text-left">
                              First Name
                            </p>
                            <input
                              placeholder=""
                              type="text"
                              class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                          </div>
                          <div class="py-1">
                            <p class="px-1 text-sm text-gray-600 text-left">
                              Last Name
                            </p>
                            <input
                              placeholder=""
                              type="text"
                              class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                          </div>
                          <div class="py-1">
                            <p class="px-1 text-sm text-gray-600 text-left">
                              Avatar
                            </p>
                            <input
                              placeholder=""
                              type="file"
                              class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                          </div>
                          <div class="py-1">
                            <p class="px-1 text-sm text-gray-600 text-left">
                              Job
                            </p>
                            <input
                              placeholder=""
                              type="text"
                              class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                          </div>
                          <div class="py-1">
                            <p class="px-1 text-sm text-gray-600 text-left">
                              Street Address
                            </p>
                            <input
                              placeholder=""
                              type="text"
                              class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                          </div>
                          <div class="py-1">
                            <p class="px-1 text-sm text-gray-600 text-left">
                              Email
                            </p>
                            <input
                              placeholder=""
                              type="email"
                              class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                          </div>
                          <div class="py-1">
                            <p class="px-1 text-sm text-gray-600 text-left">
                              Password
                            </p>
                            <input
                              placeholder=""
                              type="password"
                              class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                          </div>
                          <div class="py-1">
                            <p class="px-1 text-sm text-gray-600 text-left">
                              Password Confirm
                            </p>
                            <input
                              placeholder=""
                              type="password"
                              class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                            />
                          </div>
                        </div>
                        <button
                          class="mt-3 text-lg font-semibold
            bg-gray-800 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                        >
                          Add User
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Modal Content*/}
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default App;
